'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  amount: number;
  onSuccess?: (paymentIntent: any) => void;
  onError?: (error: any) => void;
}

function CheckoutForm({ amount, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount }),
        }).then(res => res.json()).then(data => data.clientSecret),
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );

      if (error) {
        setError(error.message || 'Payment failed');
        onError?.(error);
      } else if (paymentIntent.status === 'succeeded') {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
}

export default function StripePaymentForm({ amount, onSuccess, onError }: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
}
