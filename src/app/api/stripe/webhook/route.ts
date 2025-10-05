import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

// Email receipt function
async function sendDonationReceipt(session: any) {
  const amount = session.amount_total ? session.amount_total / 100 : 0;
  const campaign = session.metadata?.campaign || 'General Fund';
  const donorName = session.metadata?.donorName || 'Valued Donor';
  const donorEmail = session.customer_email || session.metadata?.donorEmail;
  
  console.log('Session data for receipt:', {
    sessionId: session.id,
    amount,
    campaign,
    donorName,
    donorEmail,
    customerEmail: session.customer_email,
    metadata: session.metadata
  });
  
  if (!donorEmail) {
    console.log('No email address available for receipt');
    return;
  }

  try {
    // Try to send receipt via Stripe's API
    if (session.payment_intent) {
      console.log('Sending receipt via Stripe API for payment intent:', session.payment_intent);
      
      // Update the payment intent to include receipt email
      await stripe.paymentIntents.update(session.payment_intent, {
        receipt_email: donorEmail,
        metadata: {
          ...session.metadata,
          receipt_sent: 'true',
          receipt_sent_at: new Date().toISOString()
        }
      });
      
      console.log(`Receipt email sent to ${donorEmail} for $${amount} donation to ${campaign}`);
    } else {
      console.log('No payment intent found in session');
    }
  } catch (error) {
    console.error('Failed to send receipt via Stripe API:', error);
  }
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
