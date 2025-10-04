export type DonationType = 'one-time' | 'monthly';

export type DonationTier = 'supply-boost' | 'sponsor-box' | 'monthly-ally' | 'custom';

export interface DonationAmount {
  tier: DonationTier;
  amount: number;
  label: string;
  description?: string;
}

export interface DonationFormData {
  amount: number;
  type: DonationType;
  tier: DonationTier;
  email: string;
  name?: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  subscriptionId?: string;
  error?: string;
  errorCode?: string;
}
