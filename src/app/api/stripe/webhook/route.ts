import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Missing stripe signature or webhook secret' },
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
      // Handle successful payment
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
