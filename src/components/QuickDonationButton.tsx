'use client';

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

  const handleClick = () => {
    handleQuickDonation(amount);
  };

  return (
    <div>
      <GlowButton 
        onClick={handleClick}
        disabled={isLoading}
        className={`w-full text-center text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 ${className}`}
      >
        {isLoading ? 'Processing...' : children}
      </GlowButton>
      {error && (
        <div className="text-red-600 text-xs mt-1">
          {error}
        </div>
      )}
    </div>
  );
}
