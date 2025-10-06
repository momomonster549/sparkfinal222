"use client";
import { useState } from "react";
import { useDonation } from '@/hooks/useDonation';
import GlowButton from './GlowButton';

interface CustomAmountSectionProps {
  campaign: string;
  title?: string;
  description?: string;
  defaultAmount?: number;
}

export default function CustomAmountSection({ 
  campaign,
  title = "Custom Amount",
  description = "Choose your donation amount and make a direct impact",
  defaultAmount = 50
}: CustomAmountSectionProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    isAnonymous: false,
  });
  const [isValidAmount, setIsValidAmount] = useState(true);
  const [amountError, setAmountError] = useState('');
  
  const { handleQuickDonation, isLoading, error } = useDonation(campaign);

  // Real-time amount validation
  const validateAmount = (value: number) => {
    if (value < 1) {
      setIsValidAmount(false);
      setAmountError('Minimum donation is $1');
    } else if (value > 10000) {
      setIsValidAmount(false);
      setAmountError('Maximum donation is $10,000');
    } else {
      setIsValidAmount(true);
      setAmountError('');
    }
  };

  const handleAmountChange = (value: number) => {
    setAmount(value);
    validateAmount(value);
  };

  const handleAmountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0 && isValidAmount) {
      await handleQuickDonation(amount, donorInfo);
    }
  };

  const handlePresetAmount = (presetAmount: number) => {
    setAmount(presetAmount);
    setAmountError('');
  };

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const getImpactMessage = (amount: number) => {
    if (amount >= 1000) return "Your generous donation will provide comprehensive relief to multiple families.";
    if (amount >= 500) return "Your donation will help several families with essential supplies.";
    if (amount >= 100) return "Your donation will help a family with emergency relief supplies.";
    if (amount >= 50) return "Your donation will provide meals for a family in need.";
    if (amount >= 25) return "Your donation will help provide essential supplies.";
    return "Every dollar makes a difference in our relief efforts.";
  };

  return (
    <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
      <div className="text-center mb-6">
        <h3 className="text-white font-display2 text-xl mb-2">{title}</h3>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
      
      <form onSubmit={handleAmountSubmit} className="space-y-6">
        {/* Amount Input Section */}
        <div className="space-y-4">
          <div>
            <label htmlFor="donation-amount" className="block text-sm font-medium text-white mb-3">
              Donation Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 text-xl font-bold">$</span>
              <input
                id="donation-amount"
                name="donation-amount"
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                min="1"
                max="10000"
                step="0.01"
                className={`w-full pl-10 pr-4 py-4 bg-white/95 border-2 rounded-xl text-gray-900 font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-tamarind-orange/50 focus:border-tamarind-orange/50 focus:bg-white text-xl transition-all duration-200 ${
                  !isValidAmount ? 'border-red-400 focus:border-red-400 focus:ring-red-400/50' : 'border-white/30'
                }`}
                placeholder="Enter amount"
                style={{ color: '#1f2937' }}
              />
              {amount > 0 && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                  {formatAmount(amount)}
                </div>
              )}
            </div>
            {amountError && (
              <p className="text-red-300 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {amountError}
              </p>
            )}
          </div>

          {/* Preset Amount Buttons */}
          <div>
            <p className="text-white/70 text-sm mb-3">Quick select:</p>
            <div className="grid grid-cols-3 gap-2">
              {[25, 50, 100, 250, 500, 1000].map((presetAmount) => (
                <button
                  key={presetAmount}
                  type="button"
                  onClick={() => handlePresetAmount(presetAmount)}
                  className={`py-3 px-4 text-sm rounded-lg border transition-all duration-200 font-medium ${
                    amount === presetAmount
                      ? 'bg-tamarind-orange/20 border-tamarind-orange text-tamarind-orange scale-105'
                      : 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  ${presetAmount}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Donor Information Section */}
        <div className="space-y-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <h4 className="text-white font-medium text-sm">Donor Information (Optional)</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="donor-name" className="block text-xs font-medium text-white/80 mb-2">
                Name
              </label>
              <input
                id="donor-name"
                name="donor-name"
                type="text"
                value={donorInfo.name}
                onChange={(e) => setDonorInfo(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 bg-white/90 border border-white/20 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-tamarind-orange/50 focus:border-tamarind-orange/50 text-sm"
                placeholder="Your name"
                style={{ color: '#1f2937' }}
              />
            </div>
            
            <div>
              <label htmlFor="donor-email" className="block text-xs font-medium text-white/80 mb-2">
                Email
              </label>
              <input
                id="donor-email"
                name="donor-email"
                type="email"
                value={donorInfo.email}
                onChange={(e) => setDonorInfo(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 bg-white/90 border border-white/20 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-tamarind-orange/50 focus:border-tamarind-orange/50 text-sm"
                placeholder="your@email.com"
                style={{ color: '#1f2937' }}
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              checked={donorInfo.isAnonymous}
              onChange={(e) => setDonorInfo(prev => ({ ...prev, isAnonymous: e.target.checked }))}
              className="mr-3 w-4 h-4 text-tamarind-orange bg-white/90 border-white/20 rounded focus:ring-tamarind-orange/50"
            />
            <label htmlFor="anonymous" className="text-xs text-white/80">
              Make this donation anonymous
            </label>
          </div>
        </div>

        {/* Impact Preview */}
        {amount > 0 && isValidAmount && (
          <div className="p-4 bg-gradient-to-r from-tamarind-orange/10 to-chili-red/10 rounded-xl border border-tamarind-orange/20">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-tamarind-orange/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-tamarind-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium text-sm">
                  {formatAmount(amount)} Donation
                </p>
                <p className="text-white/70 text-xs mt-1">
                  {getImpactMessage(amount)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="text-red-200 text-sm bg-red-900/20 border border-red-500/30 p-3 rounded-lg flex items-center">
            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !isValidAmount || amount <= 0}
          className="w-full py-4 px-6 bg-tamarind-orange hover:bg-tamarind-orange/90 text-white font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(241,151,56,0.3)] hover:shadow-[0_0_30px_rgba(241,151,56,0.5)] disabled:opacity-50 disabled:cursor-not-allowed text-center"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            `Donate ${formatAmount(amount)}`
          )}
        </button>
      </form>
    </div>
  );
}
