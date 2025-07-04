import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to Supabase
    const { error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, subject, message }]);

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 });
    }

    // Send email via Resend
    try {
      await resend.emails.send({
  from: 'Contact Form <onboarding@resend.dev>', // leave this for now
  to: ['info@deadlive.co.uk'],
  replyTo: email, // <-- THIS LINE IS CRITICAL
  subject: `New Contact Message: ${subject}`,
  html: `
    <h2>New Contact Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
  `,
});

    } catch (emailError) {
      console.error('Resend email error:', emailError);
      // Do not fail the user, log the error only
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
