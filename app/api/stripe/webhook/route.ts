import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil', // or omit this if not needed
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key only in secure backend
);

export async function POST(req: NextRequest) {
  const buf = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new NextResponse('Webhook error', { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const metadata = session.metadata;

    // Save to Supabase
    const { error } = await supabase.from('bookings').insert({
      user_email: session.customer_email,
      event_id: metadata?.event_id, // you set this in metadata during checkout creation
      amount_paid: session.amount_total! / 100,
      stripe_checkout_id: session.id,
    });

    if (error) {
      console.error('Error inserting into DB:', error);
      return new NextResponse('Failed to save booking', { status: 500 });
    }
  }

  return new NextResponse('Received', { status: 200 });
}
