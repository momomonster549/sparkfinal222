'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51S9EcoDudlTzcZHdr77sD6e6AKJWHAARRfFngYLHlxq0qRMNHg1DdrLzCKl07SGATKaRaeyRBOXh6UNaFKjNcLDK00QCZHtKAH');

interface EnhancedPaymentFormProps {
  amount: number;
  campaign: string;
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: any) => void;
  showDonorInfo?: boolean;
  className?: string;
}

function CheckoutForm({ 
  amount, 
  campaign, 
  onSuccess, 
  onError, 
  showDonorInfo = false 
}: EnhancedPaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    isAnonymous: false,
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // Create payment intent
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'usd',
          metadata: {
            campaign,
            source: 'embedded-form',
            amount: amount.toString(),
            donorName: donorInfo.name,
            donorEmail: donorInfo.email,
            isAnonymous: donorInfo.isAnonymous,
          },
        }),
      });

      const { clientSecret } = await response.json();

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: donorInfo.name || undefined,
            email: donorInfo.email || undefined,
          },
        },
      });

      if (error) {
        setError(error.message || 'Payment failed');
        onError?.(error);
      } else if (paymentIntent?.status === 'succeeded') {
        onSuccess?.(paymentIntent);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showDonorInfo && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Name (Optional)
            </label>
            <input
              type="text"
              value={donorInfo.name}
              onChange={(e) => setDonorInfo(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              value={donorInfo.email}
              onChange={(e) => setDonorInfo(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              checked={donorInfo.isAnonymous}
              onChange={(e) => setDonorInfo(prev => ({ ...prev, isAnonymous: e.target.checked }))}
              className="mr-2"
            />
            <label htmlFor="anonymous" className="text-sm text-white/80">
              Make this donation anonymous
            </label>
          </div>
        </div>
      )}

      <div className="p-4 border rounded-lg bg-white">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {loading ? 'Processing...' : `Donate $${amount.toFixed(2)}`}
      </button>
    </form>
  );
}

export default function EnhancedStripePaymentForm(props: EnhancedPaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}
