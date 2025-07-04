import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// ✅ Validate environment variables
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing required environment variables for Stripe or Supabase.');
}

// ✅ Initialize Stripe & Supabase
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil', // ⚠️ Optional: check version compatibility
});

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function POST(req: NextRequest) {
  let event: Stripe.Event;

  try {
    const buf = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!sig) {
      return new NextResponse('Missing Stripe signature', { status: 400 });
    }

    event = stripe.webhooks.constructEvent(buf, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err);
    return new NextResponse('Webhook signature verification failed', { status: 400 });
  }

  // ✅ Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const metadata = session.metadata;

      const { error } = await supabase.from('bookings').insert({
        user_email: session.customer_email,
        event_id: metadata?.event_id,
        amount_paid: session.amount_total ? session.amount_total / 100 : null,
        stripe_checkout_id: session.id,
      });

      if (error) {
        console.error('❌ Failed to insert booking:', error.message);
        return new NextResponse('Database insert error', { status: 500 });
      }

      console.log('✅ Booking saved successfully.');
    } catch (err) {
      console.error('❌ Error handling session completion:', err);
      return new NextResponse('Webhook processing failed', { status: 500 });
    }
  }

  return new NextResponse('✅ Webhook received', { status: 200 });
}
