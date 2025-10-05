'use client';

import { useState } from 'react';
import { useDonation } from '@/hooks/useDonation';
import GlowButton from './GlowButton';

interface QuickDonationButtonProps {
  amount: number;
  campaign: string;
  children: React.ReactNode;
  className?: string;
}

export default function QuickDonationButton({ 
  amount, 
  campaign, 
  children, 
  className 
}: QuickDonationButtonProps) {
  const { handleQuickDonation, isLoading, error } = useDonation(campaign);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleClick = () => {
    if (!showEmailForm) {
      setShowEmailForm(true);
      return;
    }
    
    if (email.trim()) {
      handleQuickDonation(amount, { 
        name: name.trim() || undefined, 
        email: email.trim() 
      });
    } else {
      // If no email provided, proceed without donor info
      handleQuickDonation(amount);
    }
  };

  return (
    <div>
      {!showEmailForm ? (
        <GlowButton 
          onClick={handleClick}
          disabled={isLoading}
          className={`w-full text-center text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 ${className}`}
        >
          {isLoading ? 'Processing...' : children}
        </GlowButton>
      ) : (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white/10 border border-white/20 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <input
            type="email"
            placeholder="Your email for receipt"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm bg-white/10 border border-white/20 rounded text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <div className="flex space-x-2">
            <GlowButton 
              onClick={handleClick}
              disabled={isLoading}
              className="flex-1 text-center text-xs sm:text-sm px-3 py-2"
            >
              {isLoading ? 'Processing...' : `Donate $${amount}`}
            </GlowButton>
            <button
              onClick={() => setShowEmailForm(false)}
              className="px-3 py-2 text-xs sm:text-sm text-white/70 hover:text-white border border-white/20 rounded hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {error && (
        <div className="text-red-600 text-xs mt-1">
          {error}
        </div>
      )}
    </div>
  );
}
