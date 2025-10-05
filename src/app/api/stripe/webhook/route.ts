import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

// Email receipt function
async function sendDonationReceipt(session: any) {
  const amount = session.amount_total ? session.amount_total / 100 : 0;
  const campaign = session.metadata?.campaign || 'General Fund';
  const donorName = session.metadata?.donorName || 'Valued Donor';
  const donorEmail = session.customer_email || session.metadata?.donorEmail;
  
  if (!donorEmail) {
    console.log('No email address available for receipt');
    return;
  }

  // For now, we'll use Stripe's built-in email receipts
  // In production, you might want to use a service like SendGrid, Resend, or Nodemailer
  console.log(`Would send receipt email to ${donorEmail} for $${amount} donation to ${campaign}`);
  
  // TODO: Implement custom email service integration
  // This could be SendGrid, Resend, or another email service
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  // Skip webhook verification if using placeholder secret
  if (!process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET === 'whsec_test_placeholder') {
    console.log('Webhook secret not configured or using placeholder, skipping verification');
    return NextResponse.json({ received: true });
  }

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe signature' },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment successful:', session.id);
      
      // Send custom email receipt
      try {
        await sendDonationReceipt(session);
      } catch (emailError) {
        console.error('Failed to send email receipt:', emailError);
        // Don't fail the webhook if email fails
      }
      break;
      
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent succeeded:', paymentIntent.id);
      // Handle successful payment intent
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
