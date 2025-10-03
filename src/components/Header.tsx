"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GlowButton from "./GlowButton";
import ThemeToggle from "./ThemeToggle";

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
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md dark:bg-black/40 bg-white/70 border-b dark:border-white/10 border-black/10 shadow-lg" : "bg-transparent"}`}>
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-white dark:bg-white p-1.5">
            <Image
              src={LOGO_URL}
              alt="SparkCreatives Logo"
              width={40}
              height={40}
              className="object-contain w-full h-full"
            />
          </div>
          <span className="font-display1 text-2xl">SparkCreatives</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => <a key={l.href} href={l.href} className="text-sm hover:underline">{l.label}</a>)}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden md:block">
            <GlowButton href="#get-involved">Sponsor a Box</GlowButton>
          </div>
        </div>
      </div>
    </header>
  );
}
