import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent'],
    });

    // Extract the amount from the session
    const amount = session.amount_total ? session.amount_total / 100 : 0;

    return NextResponse.json({
      id: session.id,
      amount,
      currency: session.currency,
      customerEmail: session.customer_email,
      paymentStatus: session.payment_status,
      metadata: session.metadata,
    });
  } catch (error) {
    console.error('Stripe session retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}
