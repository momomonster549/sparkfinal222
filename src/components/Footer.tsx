import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 sm:mt-24 border-t border-white/10 py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
          <p className="font-label tracking-widest text-sm sm:text-base">SparkCreatives Inc.</p>
          <nav className="flex flex-wrap gap-3 sm:gap-4 text-sm">
            <Link href="/" className="hover:underline touch-target">Home</Link>
            <Link href="/impactpage" className="hover:underline touch-target">Impact</Link>
            <Link href="/sms" className="hover:underline touch-target">SMS Updates</Link>
            <Link href="/privacy" className="hover:underline touch-target">Privacy</Link>
            <Link href="/terms" className="hover:underline touch-target">Terms</Link>
          </nav>
        </div>
        <p className="prose-muted mt-4 text-xs sm:text-sm leading-relaxed">
          EIN 33-4477854 · FDACS Registration CH79169.
          A copy of the official registration and financial information may be obtained from the Florida Division of Consumer Services by calling 1-800-HELP-FLA (435-7352) or at FDACS.gov. Registration does not imply endorsement, approval, or recommendation by the state.
        </p>
        <p className="prose-muted text-xs mt-2">© {new Date().getFullYear()} SparkCreatives Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
