import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'usd', metadata = {} } = await req.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Stripe payment intent error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
