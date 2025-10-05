'use client';

import { useState } from 'react';

interface DonationOptions {
  amount: number;
  campaign: string;
  source: string;
  donorInfo?: {
    name?: string;
    email?: string;
    isAnonymous?: boolean;
  };
}

interface UseDonationReturn {
  isLoading: boolean;
  error: string | null;
  handleQuickDonation: (amount: number, donorInfo?: { name?: string; email?: string; isAnonymous?: boolean }) => Promise<void>;
  handleCustomDonation: (amount: number, donorInfo?: DonationOptions['donorInfo']) => Promise<string>;
  clearError: () => void;
}

export function useDonation(campaign: string = 'general'): UseDonationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuickDonation = async (amount: number, donorInfo?: { name?: string; email?: string; isAnonymous?: boolean }) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🚀 Creating checkout session for amount:', amount);
      
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'usd',
          metadata: {
            campaign,
            source: 'quick-donation-button',
            amount: amount.toString(),
            donorName: donorInfo?.name || '',
            donorEmail: donorInfo?.email || '',
            isAnonymous: donorInfo?.isAnonymous || false,
          },
        }),
      });

      console.log('📡 API Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      console.log('✅ Session ID received:', sessionId);
      
      // Load Stripe.js
      console.log('🔄 Loading Stripe.js...');
      const { loadStripe } = await import('@stripe/stripe-js');
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 
        'pk_test_51S9EcoDudlTzcZHdr77sD6e6AKJWHAARRfFngYLHlxq0qRMNHg1DdrLzCKl07SGATKaRaeyRBOXh6UNaFKjNcLDK00QCZHtKAH'
      );
      
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }
      
      console.log('🎯 Redirecting to Stripe Checkout...');
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        console.error('❌ Stripe redirect error:', error);
        throw new Error(error.message);
      }
      
    } catch (err) {
      console.error('❌ Donation error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomDonation = async (amount: number, donorInfo?: DonationOptions['donorInfo']) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'usd',
          metadata: {
            campaign,
            source: 'custom-donation',
            amount: amount.toString(),
            donorName: donorInfo?.name || '',
            donorEmail: donorInfo?.email || '',
            isAnonymous: donorInfo?.isAnonymous || false,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      return clientSecret;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    isLoading,
    error,
    handleQuickDonation,
    handleCustomDonation,
    clearError,
  };
}