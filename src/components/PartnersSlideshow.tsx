"use client";
import { useState, useEffect } from "react";

interface Partner {
  name: string;
  description?: string;
  category: string;
  icon?: string;
  impact?: string;
}

interface PartnersSlideshowProps {
  partners: Partner[];
  autoAdvance?: boolean;
  slideDuration?: number;
}

export default function PartnersSlideshow({ 
  partners, 
  autoAdvance = true, 
  slideDuration = 5000 
}: PartnersSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance functionality
  useEffect(() => {
    if (!autoAdvance || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % partners.length);
    }, slideDuration);

    return () => clearInterval(interval);
  }, [autoAdvance, isHovered, slideDuration, partners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % partners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + partners.length) % partners.length);
  };

  // Enhanced partner data with icons
  const enhancedPartners = partners.map((partner) => ({
    ...partner,
    icon: getPartnerIcon(partner.category)
  }));

  return (
    <div 
      className="relative w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Minimal glass container */}
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-xl">
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />

          {/* Slides container with clean transitions */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]">
            {enhancedPartners.map((partner, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 translate-x-0"
                    : index < currentSlide
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <div className="flex items-center justify-center h-full p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
                  <div className="text-center space-y-3 sm:space-y-4 md:space-y-6 max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
                    
                    {/* Responsive partner icon */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
                        {partner.icon}
                      </span>
                    </div>

                    {/* Responsive typography */}
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light text-white mb-2 sm:mb-3 md:mb-4 leading-tight px-2">
                      {partner.name}
                    </h3>
                    
                    {/* Responsive category badge */}
                    <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                      <span className="text-white/80 font-medium text-xs sm:text-sm md:text-base">
                        {partner.category}
                      </span>
                    </div>
                    
                    {/* Responsive description */}
                    {partner.description && (
                      <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-light px-2">
                        {partner.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Responsive navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-3 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 touch-target"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-3 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 touch-target"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>
      </div>

      {/* Responsive community indicator */}
      <div className="absolute -top-6 sm:-top-7 md:-top-8 left-1/2 -translate-x-1/2 text-center">
        <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <span className="text-white/80 text-xs sm:text-sm md:text-base font-medium">Community Connected</span>
        </div>
      </div>
    </div>
  );
}

// Helper function for partner icons
function getPartnerIcon(category: string): string {
  const iconMap: { [key: string]: string } = {
    "Educational Partner": "🎓",
    "School Partner": "🏫",
    "Community Support": "🤝",
    "Distribution Network": "🚚",
    "Technology Support": "💻"
  };
  return iconMap[category] || "🌟";
}
