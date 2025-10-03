"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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
        <Link href="#" className="font-display1 text-2xl">SparkCreatives</Link>
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
