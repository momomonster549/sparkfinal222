'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import GlowButton from '@/components/GlowButton';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const campaign = searchParams.get('campaign') || 'general';
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [donationAmount, setDonationAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!sessionId) {
        setLoading(false);
        setError('No session ID provided');
        return;
      }

      try {
        const response = await fetch(`/api/stripe/session?session_id=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch session details');
        }

        const data = await response.json();
        setSession(data);
        setDonationAmount(data.amount);
      } catch (err) {
        console.error('Error fetching session:', err);
        setError('Failed to load donation details');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  const getCampaignMessage = (campaign: string) => {
    switch (campaign) {
      case 'earthquake-fund':
        return {
          title: 'Thank you for supporting earthquake relief!',
          message: 'Your donation will help provide emergency supplies to families affected by the Cebu earthquake.',
          impact: 'Your generosity brings hope to families in crisis.',
          nextSteps: [
            'Emergency supplies will be distributed within 24-48 hours',
            'You\'ll receive updates on how your donation is being used',
            'Follow our progress on social media for real-time updates'
          ]
        };
      case 'emergency-fund':
        return {
          title: 'Thank you for your emergency fund donation!',
          message: 'Your contribution helps us respond quickly to families facing unexpected crises.',
          impact: 'Your support makes immediate relief possible.',
          nextSteps: [
            'Your donation is being processed for immediate deployment',
            'We\'ll send you impact reports within the next week',
            'Thank you for being part of our emergency response network'
          ]
        };
      default:
        return {
          title: 'Thank you for your donation!',
          message: 'Your generosity makes a real difference in the lives of those we serve.',
          impact: 'Together, we\'re building stronger communities.',
          nextSteps: [
            'Your donation has been processed successfully',
            'A tax-deductible receipt has been sent to your email',
            'Follow our impact stories on social media'
          ]
        };
    }
  };

  const campaignInfo = getCampaignMessage(campaign);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-tamarind-orange mx-auto mb-4"></div>
            <p className="text-lg prose-muted">Processing your payment...</p>
          </motion.div>
        </Section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-6xl mb-6"
            >
              ⚠️
            </motion.div>
            <h1 className="font-display2 text-3xl sm:text-4xl mb-4">
              Error Loading Receipt
            </h1>
            <p className="prose-muted text-lg mb-8">{error}</p>
            <GlowButton href="/">
              Return Home
            </GlowButton>
          </motion.div>
        </Section>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="text-6xl mb-6"
            >
              ✅
            </motion.div>
            <h1 className="font-display2 text-3xl sm:text-4xl mb-4">
              {campaignInfo.title}
            </h1>
            <p className="prose-muted text-lg">
              {campaignInfo.message}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="surface rounded-2xl p-6 sm:p-8 space-y-8"
          >
            {/* Donation Details */}
            {donationAmount !== null && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium">Donation Amount:</span>
                  <span className="text-3xl font-bold text-tamarind-orange">${donationAmount.toFixed(2)}</span>
                </div>
                {sessionId && (
                  <div className="text-sm prose-muted mb-2">
                    Transaction ID: {sessionId}
                  </div>
                )}
                {session?.customerEmail && (
                  <div className="text-sm prose-muted">
                    📧 Receipt sent to: {session.customerEmail}
                  </div>
                )}
                {!session?.customerEmail && (
                  <div className="text-sm text-chili-red">
                    ⚠️ No email provided - receipt not sent
                  </div>
                )}
              </div>
            )}

            {/* Impact Message */}
            <div className="bg-tamarind-orange/10 border border-tamarind-orange/20 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-tamarind-orange" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-tamarind-orange font-medium">{campaignInfo.impact}</p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="font-display2 text-xl mb-6">What happens next?</h3>
              <div className="space-y-4">
                {campaignInfo.nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-tamarind-orange text-white text-sm font-medium">
                        {index + 1}
                      </div>
                    </div>
                    <p className="ml-4 prose-muted">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10"
            >
              <GlowButton href="/" className="w-full justify-center">
                Return Home
              </GlowButton>
              <GlowButton 
                href="/impactpage" 
                className="w-full justify-center !bg-white/0"
              >
                View Impact
              </GlowButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <Section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-tamarind-orange mx-auto mb-4"></div>
            <p className="text-lg prose-muted">Loading...</p>
          </motion.div>
        </Section>
      </main>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}