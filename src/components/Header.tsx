"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import GlowButton from "./GlowButton";

const LOGO_URL = "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/Spark%20Creatives%20LOGO.PNG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9TcGFyayBDcmVhdGl2ZXMgTE9HTy5QTkciLCJpYXQiOjE3NTk1MzI1MTcsImV4cCI6MTc5MTA2ODUxN30.hkTxUWUu7AXJymRiZ87eOVP0LCxZUYZSL4dGZliEL6o";

// Main navigation links
const mainLinks = [
  { href: "/" as const, label: "Home" },
  { href: "/impactpage" as const, label: "Impact" },
  { href: "/earthquakefund" as const, label: "Earthquake Fund" },
  { href: "/emergencyfund" as const, label: "Emergency Fund" },
  { href: "/sms" as const, label: "SMS Updates" },
];

// Footer/legal links
const footerLinks = [
  { href: "/privacy" as const, label: "Privacy" },
  { href: "/terms" as const, label: "Terms" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "backdrop-blur-md bg-black/40 border-b border-white/10 shadow-lg" 
          : "bg-transparent"
      }`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-tamarind-orange focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
            aria-label="SparkCreatives Inc. - Go to homepage"
          >
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white p-1 sm:p-1.5 flex-shrink-0">
              <Image
                src={LOGO_URL}
                alt="SparkCreatives Logo"
                width={40}
                height={40}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <span className="font-display1 text-lg sm:text-xl md:text-2xl text-[#E7E9EE]">
              SparkCreatives
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" role="navigation" aria-label="Main navigation">
            {mainLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-tamarind-orange focus:outline-none focus:ring-2 focus:ring-tamarind-orange focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1 ${
                  isActive(link.href)
                    ? "text-tamarind-orange"
                    : "text-[#E7E9EE] hover:underline"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* External website link */}
            <a 
              href="https://sparkcreativesincorg.base44.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-tamarind-orange focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="Visit our main website (opens in new tab)"
            >
              <svg className="w-6 h-6 text-tamarind-orange hover:text-tamarind-orange/80 transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </a>

            {/* Donate button - hidden on mobile to save space */}
            <div className="hidden sm:block">
              <GlowButton 
                href="https://sparkcreativesincorg.base44.app/" 
                className="text-sm sm:text-base"
                aria-label="Donate to SparkCreatives Inc."
              >
                Donate
              </GlowButton>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-tamarind-orange focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg 
                className="w-6 h-6 text-[#E7E9EE]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          {/* Mobile menu */}
          <nav 
            id="mobile-menu"
            className="fixed top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 z-40 lg:hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-6 space-y-4">
              {mainLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-lg font-medium transition-colors duration-200 hover:text-tamarind-orange focus:outline-none focus:ring-2 focus:ring-tamarind-orange focus:ring-offset-2 focus:ring-offset-transparent rounded px-3 py-2 ${
                    isActive(link.href)
                      ? "text-tamarind-orange"
                      : "text-[#E7E9EE]"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile donate button */}
              <div className="pt-4 border-t border-white/10">
                <GlowButton 
                  href="https://sparkcreativesincorg.base44.app/" 
                  className="w-full justify-center text-base"
                  aria-label="Donate to SparkCreatives Inc."
                >
                  Donate Now
                </GlowButton>
              </div>

              {/* Legal links */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex gap-4 text-sm">
                  {footerLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-white/60 hover:text-tamarind-orange transition-colors focus:outline-none focus:ring-2 focus:ring-tamarind-orange focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
