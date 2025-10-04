"use client";
import { useState, useEffect } from "react";

interface Partner {
  name: string;
  description?: string;
  category: string;
}

interface PartnersSlideshowProps {
  partners: Partner[];
  autoAdvance?: boolean;
  slideDuration?: number;
}

export default function PartnersSlideshow({ 
  partners, 
  autoAdvance = true, 
  slideDuration = 4000 
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

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main slideshow container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-white/10">
        {/* Slides container */}
        <div className="relative h-64 sm:h-80">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                index === currentSlide
                  ? "opacity-100 translate-x-0 scale-100"
                  : index < currentSlide
                  ? "opacity-0 -translate-x-full scale-95"
                  : "opacity-0 translate-x-full scale-95"
              }`}
            >
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center space-y-4">
                  {/* Partner name with enhanced typography */}
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-wide">
                    {partner.name}
                  </h3>
                  
                  {/* Category badge */}
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
                    <span className="text-orange-300 font-medium text-sm uppercase tracking-wider">
                      {partner.category}
                    </span>
                  </div>
                  
                  {/* Description if available */}
                  {partner.description && (
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                      {partner.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 group"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 text-white group-hover:text-orange-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 group"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 text-white group-hover:text-orange-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {partners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-orange-400 scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        {autoAdvance && (
          <div className="absolute top-4 right-4">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              isHovered ? "bg-red-400" : "bg-green-400"
            }`} />
          </div>
        )}
      </div>

      {/* Enhanced visual effects */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-500/10 via-transparent to-red-500/10 rounded-2xl blur-xl" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/30 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}
