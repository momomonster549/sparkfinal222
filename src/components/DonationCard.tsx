"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useDonation } from '@/hooks/useDonation';

interface DonationCardProps {
  tier: string;
  price: string;
  bullets: string[];
  cta: string;
  icon: string;
  color: string;
  index: number;
  amount: number;
  campaign: string;
  description?: string;
}

export default function DonationCard({
  tier,
  price,
  bullets,
  cta,
  icon,
  color,
  index,
  amount,
  campaign,
  description,
}: DonationCardProps) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  
  const { handleQuickDonation, isLoading, error } = useDonation(campaign);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDonation = async () => {
    if (!showEmailForm) {
      setShowEmailForm(true);
      return;
    }
    
    if (email.trim()) {
      await handleQuickDonation(amount, { 
        name: name.trim() || undefined, 
        email: email.trim() 
      });
    } else {
      await handleQuickDonation(amount);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group h-full w-full"
    >
      <div 
        ref={cardRef}
        className="surface rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 flex flex-col h-full relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-tamarind-orange/20 cursor-pointer min-h-[280px] sm:min-h-[320px] md:min-h-[360px]"
      >
        {/* Subtle gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 rounded-xl sm:rounded-2xl transition-opacity duration-300`} />

        {/* Icon - Responsive sizing */}
        <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <p className="font-label tracking-wider text-tamarind-orange text-xs sm:text-sm md:text-base">
            {tier}
          </p>
          
          <h3 className="font-display2 text-xl sm:text-2xl md:text-3xl mt-1 sm:mt-2 leading-tight">
            {price}
          </h3>

          {description && (
            <p className="prose-muted text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2">
              {description}
            </p>
          )}
          
          <ul className="prose-muted mt-2 sm:mt-3 md:mt-4 space-y-1 sm:space-y-1.5 md:space-y-2 list-disc list-inside text-xs sm:text-sm md:text-base flex-1">
            {bullets.map((bullet, j) => (
              <li key={j} className="leading-relaxed">
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button - Responsive sizing */}
        <div className="mt-3 sm:mt-4 md:mt-6 relative z-10">
          {!showEmailForm ? (
            <button
              onClick={handleDonation}
              disabled={isLoading}
              className="w-full py-2.5 sm:py-3 md:py-3.5 px-4 sm:px-6 bg-tamarind-orange hover:bg-tamarind-orange/90 text-white font-medium rounded-lg sm:rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-tamarind-orange/30 text-center disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isLoading ? 'Processing...' : cta}
            </button>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 border border-white/20 rounded-md sm:rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-tamarind-orange/50 text-xs sm:text-sm transition-all duration-200"
              />
              <input
                type="email"
                placeholder="Your email for receipt"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 border border-white/20 rounded-md sm:rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-tamarind-orange/50 text-xs sm:text-sm transition-all duration-200"
              />
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={handleDonation}
                  disabled={isLoading}
                  className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 bg-tamarind-orange hover:bg-tamarind-orange/90 text-white font-medium rounded-md sm:rounded-lg text-xs sm:text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : `Donate $${amount}`}
                </button>
                <button
                  onClick={() => setShowEmailForm(false)}
                  className="py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-white/70 hover:text-white border border-white/20 rounded-md sm:rounded-lg hover:bg-white/10 transition-colors duration-200 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-400 text-xs mt-1 sm:mt-2 text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}