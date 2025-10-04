"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GlowButton from "./GlowButton";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#get-involved", label: "Get Involved" },
  { href: "#impact", label: "Impact" },
  { href: "#calendar", label: "Calendar" },
  { href: "#partners", label: "Partners" },
  { href: "#faq", label: "FAQ" },
];

const LOGO_URL = "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/Spark%20Creatives%20LOGO.PNG?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9TcGFyayBDcmVhdGl2ZXMgTE9HTy5QTkciLCJpYXQiOjE3NTk1MzI1MTcsImV4cCI6MTc5MTA2ODUxN30.hkTxUWUu7AXJymRiR87eOVP0LCxZUYZSL4dGZliEL6o";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md bg-black/40 border-b border-white/10 shadow-lg" : "bg-transparent"}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white p-1 sm:p-1.5 flex-shrink-0">
            <Image
              src={LOGO_URL}
              alt="SparkCreatives Logo"
              width={40}
              height={40}
              className="object-contain w-full h-full"
            />
          </div>
          <span className="font-display1 text-lg sm:text-xl md:text-2xl text-[#E7E9EE]">SparkCreatives</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {links.map(l => <a key={l.href} href={l.href} className="text-sm hover:underline text-[#E7E9EE] transition-colors">{l.label}</a>)}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a 
            href="https://sparkcreativesincorg.base44.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-110 transform"
            aria-label="Visit our website"
          >
            <svg className="w-6 h-6 text-tamarind-orange hover:text-tamarind-orange/80 transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </a>
          <div className="hidden sm:block">
            <GlowButton href="https://sparkcreativesincorg.base44.app/" className="text-sm sm:text-base">Sponsor a Box</GlowButton>
          </div>
        </div>
      </div>
    </header>
  );
}
