// Type definitions for Square integration
// These types help with TypeScript autocomplete and type safety

export interface SquarePaymentRequest {
  sourceId: string;
  amount: number; // Amount in cents
  currency?: string;
  customerId?: string;
  note?: string;
  referenceId?: string;
}

export interface SquarePaymentResponse {
  success: boolean;
  payment?: any;
  error?: string;
  details?: string;
}

export interface SquareCatalogItem {
  id: string;
  type: 'ITEM';
  itemData: {
    name: string;
    description?: string;
    variations?: SquareCatalogItemVariation[];
  };
}

export interface SquareCatalogItemVariation {
  id: string;
  type: 'ITEM_VARIATION';
  itemVariationData: {
    name: string;
    pricingType: 'FIXED_PRICING' | 'VARIABLE_PRICING';
    priceMoney?: {
      amount: bigint;
      currency: string;
    };
  };
}

export interface SquareCustomer {
  id?: string;
  emailAddress?: string;
  givenName?: string;
  familyName?: string;
  phoneNumber?: string;
  address?: {
    addressLine1?: string;
    addressLine2?: string;
    locality?: string;
    administrativeDistrictLevel1?: string;
    postalCode?: string;
    country?: string;
  };
}

export interface SquareOrderLineItem {
  name: string;
  quantity: string;
  basePriceMoney: {
    amount: bigint;
    currency: string;
  };
  note?: string;
}

export interface SquareOrder {
  locationId: string;
  lineItems: SquareOrderLineItem[];
  customerId?: string;
  referenceId?: string;
}

export interface SquareRefundRequest {
  paymentId: string;
  amount: number; // Amount in cents
  reason?: string;
}

export interface SquareCheckoutOptions {
  redirectUrl?: string;
  askForShippingAddress?: boolean;
  merchantSupportEmail?: string;
  acceptedPaymentMethods?: {
    applePay?: boolean;
    googlePay?: boolean;
    cashAppPay?: boolean;
    afterpayClearpay?: boolean;
  };
}

// Environment types
export type SquareEnvironment = 'sandbox' | 'production';

// Common error response
export interface SquareErrorResponse {
  success: false;
  error: string;
  details?: string;
  code?: string;
}

// Success response wrapper
export interface SquareSuccessResponse<T> {
  success: true;
  data: T;
  cursor?: string;
}

// Generic Square API response
export type SquareApiResponse<T> = SquareSuccessResponse<T> | SquareErrorResponse;

// Web Payments SDK types (for client-side)
export interface SquareWebPayments {
  payments: (applicationId: string, locationId: string) => SquarePaymentsInstance;
}

export interface SquarePaymentsInstance {
  card: () => Promise<SquareCard>;
  applePay: (options: any) => Promise<any>;
  googlePay: (options: any) => Promise<any>;
}

export interface SquareCard {
  attach: (elementId: string) => Promise<void>;
  tokenize: () => Promise<SquareTokenResult>;
  destroy: () => void;
}

export interface SquareTokenResult {
  status: 'OK' | 'INVALID' | 'ERROR';
  token?: string;
  details?: any;
  errors?: SquareTokenError[];
}

export interface SquareTokenError {
  type: string;
  field?: string;
  message: string;
}

// Declare global Square object for Web Payments SDK
declare global {
  interface Window {
    Square?: SquareWebPayments;
  }
}

// Helper type for money amounts
export type MoneyAmount = {
  amount: bigint;
  currency: string;
};

// Payment status types
export type PaymentStatus = 
  | 'APPROVED'
  | 'PENDING'
  | 'COMPLETED'
  | 'CANCELED'
  | 'FAILED';

// Order status types
export type OrderStatus =
  | 'OPEN'
  | 'COMPLETED'
  | 'CANCELED';

// Catalog object types
export type CatalogObjectType =
  | 'ITEM'
  | 'ITEM_VARIATION'
  | 'CATEGORY'
  | 'DISCOUNT'
  | 'TAX'
  | 'MODIFIER'
  | 'MODIFIER_LIST';
