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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `Donation - ${metadata.campaign || 'General Fund'}`,
              description: `Supporting ${metadata.campaign || 'our cause'}`,
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}&campaign=${metadata.campaign || 'general'}`,
      cancel_url: `${req.nextUrl.origin}/cancel?campaign=${metadata.campaign || 'general'}`,
      metadata,
      customer_creation: 'if_required',
      allow_promotion_codes: true,
      // Configure email settings for payment intent
      payment_intent_data: {
        receipt_email: metadata.donorEmail || undefined,
        metadata: {
          ...metadata,
          donation_type: 'charitable_contribution',
          tax_deductible: 'true',
        },
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
