import { NextRequest, NextResponse } from 'next/server';
import { getSquareClient, getSquareLocationId, generateIdempotencyKey, dollarsToCents } from '@/lib/square';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceId, amount, email, name } = body;

    // Validation
    if (!sourceId || !amount || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (amount < 1 || amount > 10000) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount. Must be between $1 and $10,000' },
        { status: 400 }
      );
    }

    // Create payment
    const squareClient = getSquareClient();
    const locationId = getSquareLocationId();

    const response = await squareClient.payments.create({
      sourceId,
      idempotencyKey: generateIdempotencyKey(),
      amountMoney: {
        amount: dollarsToCents(amount),
        currency: 'USD',
      },
      locationId,
      buyerEmailAddress: email,
      note: `Donation from ${name || 'Anonymous'} - SparkCreatives Inc.`,
    });

    return NextResponse.json({
      success: true,
      paymentId: response.payment?.id,
      status: response.payment?.status,
    });

  } catch (error: any) {
    console.error('Payment creation error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Payment failed',
        errorCode: error.statusCode || 'UNKNOWN_ERROR',
      },
      { status: 500 }
    );
  }
}
