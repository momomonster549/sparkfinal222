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

    // Get Square client and location
    const squareClient = getSquareClient();
    const locationId = getSquareLocationId();

    // Create customer first
    const customerResponse = await squareClient.customers.create({
      emailAddress: email,
      givenName: name?.split(' ')[0],
      familyName: name?.split(' ').slice(1).join(' '),
      idempotencyKey: generateIdempotencyKey(),
    });

    const customerId = customerResponse.customer?.id;

    if (!customerId) {
      throw new Error('Failed to create customer');
    }

    // Create subscription plan
    const planName = `Monthly Donation - $${amount}`;
    const catalogResponse = await squareClient.catalog.batchUpsert({
      idempotencyKey: generateIdempotencyKey(),
      batches: [{
        objects: [{
          type: 'SUBSCRIPTION_PLAN',
          id: `#plan-${Date.now()}`,
          subscriptionPlanData: {
            name: planName,
            phases: [
              {
                cadence: 'MONTHLY',
                recurringPriceMoney: {
                  amount: dollarsToCents(amount),
                  currency: 'USD',
                },
              },
            ],
          },
        }],
      }],
    });

    const planId = catalogResponse.objects?.[0]?.id;

    if (!planId) {
      throw new Error('Failed to create subscription plan');
    }

    // Create subscription
    const subscriptionResponse = await squareClient.subscriptions.create({
      idempotencyKey: generateIdempotencyKey(),
      locationId,
      planVariationId: planId,
      customerId: customerId,
      cardId: sourceId,
    });

    return NextResponse.json({
      success: true,
      subscriptionId: subscriptionResponse.subscription?.id,
      status: subscriptionResponse.subscription?.status,
    });

  } catch (error: any) {
    console.error('Subscription creation error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Subscription creation failed',
        errorCode: error.statusCode || 'UNKNOWN_ERROR',
      },
      { status: 500 }
    );
  }
}
