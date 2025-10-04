"use client";
import { useEffect, useRef, useState } from "react";
import { DonationType, DonationTier, DonationFormData, PaymentResult } from "@/types/donations";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAmount?: number;
  defaultTier?: DonationTier;
}

export default function DonationModal({ isOpen, onClose, defaultAmount = 25, defaultTier = 'supply-boost' }: DonationModalProps) {
  const [donationType, setDonationType] = useState<DonationType>('one-time');
  const [amount, setAmount] = useState(defaultAmount);
  const [tier, setTier] = useState<DonationTier>(defaultTier);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoadingSquare, setIsLoadingSquare] = useState(true);

  const cardContainerRef = useRef<HTMLDivElement>(null);
  const paymentFormRef = useRef<any>(null);

  // Initialize Square Web Payments SDK
  useEffect(() => {
    if (!isOpen || !cardContainerRef.current) return;

    const initializeSquare = async () => {
      try {
        setIsLoadingSquare(true);
        console.log('Initializing Square Web Payments SDK...');

        // Load Square script
        if (!(window as any).Square) {
          console.log('Loading Square SDK script...');
          const script = document.createElement('script');
          script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
          script.async = true;
          document.body.appendChild(script);

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
          });
          console.log('Square SDK script loaded!');
        }

        const Square = (window as any).Square;
        const appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
        const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

        console.log('Square credentials:', { appId, locationId });

        if (!appId || !locationId) {
          throw new Error('Missing Square credentials. Please check environment variables.');
        }

        console.log('Creating Square payments instance...');
        const payments = Square.payments(appId, locationId);

        console.log('Creating card form...');
        const card = await payments.card({
          style: {
            '.input-container': {
              borderColor: 'rgba(42, 24, 16, 0.2)',
              borderRadius: '8px',
            },
            '.input-container.is-focus': {
              borderColor: '#F19738',
            },
            '.input-container.is-error': {
              borderColor: '#DC2626',
            },
            '.message-text': {
              color: '#DC2626',
            },
            '.message-icon': {
              color: '#DC2626',
            },
            input: {
              fontSize: '16px',
              color: 'rgb(42, 24, 16)',
            },
            'input::placeholder': {
              color: 'rgba(42, 24, 16, 0.6)',
            },
          },
        });
        await card.attach(cardContainerRef.current);
        console.log('Card form attached successfully!');

        paymentFormRef.current = { card, payments };
        setIsLoadingSquare(false);
      } catch (err) {
        console.error('Failed to initialize Square:', err);
        setError('Failed to load payment form. Please refresh and try again.');
        setIsLoadingSquare(false);
      }
    };

    initializeSquare();

    return () => {
      if (paymentFormRef.current?.card) {
        paymentFormRef.current.card.destroy();
      }
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // Validate form
      if (!email || !amount) {
        throw new Error('Please fill in all required fields');
      }

      // Tokenize card
      const { card } = paymentFormRef.current;
      const tokenResult = await card.tokenize();

      if (tokenResult.status === 'OK') {
        const sourceId = tokenResult.token;

        // Create payment or subscription
        const endpoint = donationType === 'monthly'
          ? '/api/square/create-subscription'
          : '/api/square/create-payment';

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sourceId,
            amount,
            email,
            name,
          }),
        });

        const result: PaymentResult = await response.json();

        if (result.success) {
          setSuccess(true);
          setTimeout(() => {
            onClose();
            setSuccess(false);
          }, 3000);
        } else {
          throw new Error(result.error || 'Payment failed');
        }
      } else {
        throw new Error('Card tokenization failed');
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) {
    console.log('DonationModal: isOpen is false, not rendering');
    return null;
  }

  console.log('DonationModal: Rendering modal with', { amount, tier, donationType });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative bg-cream dark:bg-[#1A1B20] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 z-[10000]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2A1810] dark:text-[#E7E9EE] hover:opacity-70 transition-opacity"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-display1 text-[#2A1810] dark:text-[#E7E9EE] mb-2">Thank You!</h2>
            <p className="text-[#2A1810]/70 dark:text-[#E7E9EE]/70">
              Your {donationType === 'monthly' ? 'subscription' : 'donation'} has been processed successfully.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-display1 text-[#2A1810] dark:text-[#E7E9EE] mb-6">
              Complete Your Donation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Donation Type Toggle */}
              <div className="flex gap-2 p-1 bg-[#2A1810]/10 dark:bg-white/10 rounded-lg">
                <button
                  type="button"
                  onClick={() => setDonationType('one-time')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all ${
                    donationType === 'one-time'
                      ? 'bg-tamarind-orange text-white'
                      : 'text-[#2A1810] dark:text-[#E7E9EE] hover:bg-[#2A1810]/5 dark:hover:bg-white/5'
                  }`}
                >
                  One-Time
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType('monthly')}
                  className={`flex-1 py-2 px-4 rounded-md transition-all ${
                    donationType === 'monthly'
                      ? 'bg-tamarind-orange text-white'
                      : 'text-[#2A1810] dark:text-[#E7E9EE] hover:bg-[#2A1810]/5 dark:hover:bg-white/5'
                  }`}
                >
                  Monthly
                </button>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-[#2A1810] dark:text-[#E7E9EE] mb-2">
                  Donation Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2A1810] dark:text-[#E7E9EE]">$</span>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 bg-white dark:bg-[#0A0B10] border border-[#2A1810]/20 dark:border-white/20 rounded-lg text-[#2A1810] dark:text-[#E7E9EE] focus:outline-none focus:ring-2 focus:ring-tamarind-orange"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-[#2A1810] dark:text-[#E7E9EE] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-[#0A0B10] border border-[#2A1810]/20 dark:border-white/20 rounded-lg text-[#2A1810] dark:text-[#E7E9EE] focus:outline-none focus:ring-2 focus:ring-tamarind-orange"
                  required
                />
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-[#2A1810] dark:text-[#E7E9EE] mb-2">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-[#0A0B10] border border-[#2A1810]/20 dark:border-white/20 rounded-lg text-[#2A1810] dark:text-[#E7E9EE] focus:outline-none focus:ring-2 focus:ring-tamarind-orange"
                />
              </div>

              {/* Card Container */}
              <div>
                <label className="block text-sm font-medium text-[#2A1810] dark:text-[#E7E9EE] mb-2">
                  Card Information *
                </label>
                <div
                  ref={cardContainerRef}
                  className="p-4 bg-white dark:bg-[#0A0B10] border border-[#2A1810]/20 dark:border-white/20 rounded-lg min-h-[100px] flex items-center justify-center"
                >
                  {isLoadingSquare && (
                    <div className="text-sm text-[#2A1810]/60 dark:text-[#E7E9EE]/60">
                      Loading payment form...
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-chili-red/10 border border-chili-red/20 rounded-lg">
                  <p className="text-sm text-chili-red">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-6 bg-tamarind-orange hover:bg-tamarind-orange/90 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Donate $${amount}`}
              </button>

              <p className="text-xs text-[#2A1810]/60 dark:text-[#E7E9EE]/60 text-center">
                Secure payment processed by Square. Your donation supports SparkCreatives&apos; mission.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
