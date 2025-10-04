"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DonationType, DonationTier } from "@/types/donations";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [donationType, setDonationType] = useState<DonationType>('one-time');
  const [amount, setAmount] = useState(25);
  const [tier, setTier] = useState<DonationTier>('supply-boost');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoadingSquare, setIsLoadingSquare] = useState(true);

  const cardContainerRef = useRef<HTMLDivElement>(null);
  const paymentFormRef = useRef<any>(null);

  // Get URL parameters
  useEffect(() => {
    const urlAmount = searchParams.get('amount');
    const urlTier = searchParams.get('tier');
    const urlType = searchParams.get('type');

    if (urlAmount) setAmount(Number(urlAmount));
    if (urlTier) setTier(urlTier as DonationTier);
    if (urlType) setDonationType(urlType as DonationType);
  }, [searchParams]);

  // Initialize Square Web Payments SDK
  useEffect(() => {
    if (!cardContainerRef.current) return;

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
        let appId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
        const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

        console.log('Square credentials (raw):', { appId, locationId });
        console.log('Square SDK version:', Square);

        if (!appId) {
          throw new Error('Missing Square Application ID. Please check NEXT_PUBLIC_SQUARE_APPLICATION_ID environment variable.');
        }

        if (!locationId) {
          throw new Error('Missing Square Location ID. Please check NEXT_PUBLIC_SQUARE_LOCATION_ID environment variable.');
        }

        // For sandbox environment, use the location ID as the application ID
        // This is a Square Web Payments SDK requirement
        if (appId.startsWith('sandbox-')) {
          console.log('Using location ID for sandbox payments initialization');
          appId = locationId;
        }

        console.log('Creating Square payments instance with appId:', appId);
        // Web Payments SDK only takes application ID, NOT location ID
        const payments = await Square.payments(appId, locationId);
        console.log('Payments instance created successfully!');

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
        console.log('Card object created!');

        await card.attach(cardContainerRef.current);
        console.log('Card form attached successfully!');

        paymentFormRef.current = { card, payments };
        setIsLoadingSquare(false);
      } catch (err: any) {
        console.error('Failed to initialize Square:', err);
        console.error('Error details:', {
          message: err?.message,
          stack: err?.stack,
          name: err?.name,
          errors: err?.errors
        });
        setError(`Failed to load payment form: ${err?.message || 'Unknown error'}. Please refresh and try again.`);
        setIsLoadingSquare(false);
      }
    };

    initializeSquare();

    return () => {
      if (paymentFormRef.current?.card) {
        paymentFormRef.current.card.destroy();
      }
    };
  }, []);

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

        const result = await response.json();

        if (result.success) {
          setSuccess(true);
          setTimeout(() => {
            router.push('/?donated=true');
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

  const getTierInfo = () => {
    switch (tier) {
      case 'supply-boost':
        return { title: 'Supply Boost', description: 'Fill gaps in a kit' };
      case 'sponsor-box':
        return { title: 'Sponsor a Box', description: 'Fund a complete starter-kit' };
      case 'monthly-ally':
        return { title: 'Monthly Ally', description: 'Reliable ongoing support' };
      default:
        return { title: 'Donation', description: 'Support our mission' };
    }
  };

  const tierInfo = getTierInfo();

  if (success) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-cream dark:bg-[#0A0B10]">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-display1 text-[#2A1810] dark:text-[#E7E9EE] mb-4">Thank You!</h1>
          <p className="text-[#2A1810]/70 dark:text-[#E7E9EE]/70 mb-2">
            Your {donationType === 'monthly' ? 'subscription' : 'donation'} of ${amount} has been processed successfully.
          </p>
          <p className="text-sm text-[#2A1810]/60 dark:text-[#E7E9EE]/60">
            Redirecting you back to the homepage...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8 bg-cream dark:bg-[#0A0B10]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-display1 text-[#2A1810] dark:text-[#E7E9EE] mb-2">
            Complete Your Donation
          </h1>
          <p className="text-[#2A1810]/70 dark:text-[#E7E9EE]/70">
            {tierInfo.title} - {tierInfo.description}
          </p>
        </div>

        {/* Checkout Form */}
        <div className="bg-white dark:bg-[#1A1B20] rounded-2xl shadow-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Donation Type Toggle */}
            <div>
              <label className="block text-sm font-medium text-[#2A1810] dark:text-[#E7E9EE] mb-2">
                Donation Type
              </label>
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
                  className="w-full pl-8 pr-4 py-3 bg-cream dark:bg-[#0A0B10] border border-[#2A1810]/20 dark:border-white/20 rounded-lg text-[#2A1810] dark:text-[#E7E9EE] focus:outline-none focus:ring-2 focus:ring-tamarind-orange"
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
                className="w-full px-4 py-3 bg-cream dark:bg-[#0A0B10] border border-[#2A1810]/20 dark:border-white/20 rounded-lg text-[#2A1810] dark:text-[#E7E9EE] focus:outline-none focus:ring-2 focus:ring-tamarind-orange"
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
                className="w-full px-4 py-3 bg-cream dark:bg-[#0A0B10] border border-[#2A1810]/20 dark:border-white/20 rounded-lg text-[#2A1810] dark:text-[#E7E9EE] focus:outline-none focus:ring-2 focus:ring-tamarind-orange"
              />
            </div>

            {/* Card Container */}
            <div>
              <label className="block text-sm font-medium text-[#2A1810] dark:text-[#E7E9EE] mb-2">
                Card Information *
              </label>
              <div
                ref={cardContainerRef}
                className="p-4 bg-cream dark:bg-[#0A0B10] border border-[#2A1810]/20 dark:border-white/20 rounded-lg min-h-[120px] flex items-center justify-center"
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
              <div className="p-4 bg-chili-red/10 border border-chili-red/20 rounded-lg">
                <p className="text-sm text-chili-red">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing || isLoadingSquare}
              className="w-full py-4 px-6 bg-tamarind-orange hover:bg-tamarind-orange/90 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isProcessing ? 'Processing...' : `Donate $${amount}`}
            </button>

            <p className="text-xs text-[#2A1810]/60 dark:text-[#E7E9EE]/60 text-center">
              Secure payment processed by Square. Your donation supports SparkCreatives&apos; mission.
            </p>
          </form>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-tamarind-orange hover:underline text-sm"
          >
            ← Back to homepage
          </button>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-[#0A0B10]">
        <div className="text-[#2A1810] dark:text-[#E7E9EE]">Loading checkout...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
