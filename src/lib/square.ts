import { SquareClient, SquareEnvironment } from 'square';

// Lazy initialization - only create client when actually used
let _squareClient: SquareClient | null = null;

export function getSquareClient(): SquareClient {
  if (!_squareClient) {
    if (!process.env.SQUARE_ACCESS_TOKEN) {
      throw new Error('SQUARE_ACCESS_TOKEN is not defined in environment variables');
    }

    if (!process.env.SQUARE_ENVIRONMENT) {
      throw new Error('SQUARE_ENVIRONMENT is not defined in environment variables');
    }

    _squareClient = new SquareClient({
      token: process.env.SQUARE_ACCESS_TOKEN,
      environment: process.env.SQUARE_ENVIRONMENT === 'production'
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
    });
  }

  return _squareClient;
}

export function getSquareLocationId(): string {
  if (!process.env.SQUARE_LOCATION_ID) {
    throw new Error('SQUARE_LOCATION_ID is not defined in environment variables');
  }
  return process.env.SQUARE_LOCATION_ID;
}

// Helper to generate idempotency keys (prevents duplicate charges)
export function generateIdempotencyKey(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

// Helper to convert dollars to cents
export function dollarsToCents(dollars: number): bigint {
  return BigInt(Math.round(dollars * 100));
}

// Helper to convert cents to dollars
export function centsToDollars(cents: bigint): number {
  return Number(cents) / 100;
}
