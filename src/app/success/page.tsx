'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
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
            'Your donation is being processed',
            'You\'ll receive a receipt via email',
            'Follow our impact stories on social media'
          ]
        };
    }
  };

  const campaignInfo = getCampaignMessage(campaign);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Receipt</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white/20 mb-4">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{campaignInfo.title}</h1>
            <p className="text-green-100 text-lg">{campaignInfo.message}</p>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {/* Donation Details */}
            {donationAmount !== null && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Donation Amount:</span>
                  <span className="text-2xl font-bold text-gray-900">${donationAmount.toFixed(2)}</span>
                </div>
                {sessionId && (
                  <div className="mt-2 text-sm text-gray-500">
                    Transaction ID: {sessionId}
                  </div>
                )}
                {session?.customerEmail && (
                  <div className="mt-1 text-sm text-gray-500">
                    Receipt sent to: {session.customerEmail}
                  </div>
                )}
              </div>
            )}

            {/* Impact Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800">{campaignInfo.impact}</p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
              <ul className="space-y-3">
                {campaignInfo.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 text-sm font-medium">
                        {index + 1}
                      </div>
                    </div>
                    <p className="ml-3 text-sm text-gray-600">{step}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
              >
                Return Home
              </Link>
              <Link
                href="/impactpage"
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
              >
                View Impact
              </Link>
            </div>

            {/* Social Sharing */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-4">Share your impact:</p>
              <div className="flex justify-center space-x-4">
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="p-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}