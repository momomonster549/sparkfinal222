"use client";
import { motion } from "framer-motion";
import Link from 'next/link';
import Section from "@/components/Section";
import GlowButton from "@/components/GlowButton";
import Footer from "@/components/Footer";

export default function CancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-6xl mb-6"
          >
            ❌
          </motion.div>
          
          <h1 className="font-display2 text-3xl sm:text-4xl mb-4">
            Payment Cancelled
          </h1>
          
          <p className="prose-muted text-lg mb-8">
            Your payment was cancelled. No charges have been made to your account.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <GlowButton href="/" className="w-full sm:w-auto">
              Return Home
            </GlowButton>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton 
                href="/emergencyfund" 
                className="w-full sm:w-auto !bg-white/0"
              >
                Try Emergency Fund
              </GlowButton>
              <GlowButton 
                href="/earthquakefund" 
                className="w-full sm:w-auto !bg-white/0"
              >
                Try Earthquake Fund
              </GlowButton>
            </div>
          </motion.div>
        </motion.div>
      </Section>
      <Footer />
    </main>
  );
}
