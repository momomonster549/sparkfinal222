"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Section from "@/components/Section";
import GlowButton from "@/components/GlowButton";

export default function SMSPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !consentGiven) return;

    setIsSubmitting(true);
    setError("");
    
    try {
      const response = await fetch('/api/sms/opt-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          consentGiven
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting SMS opt-in:", error);
      setError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
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
              ✅
            </motion.div>
            <h1 className="font-display2 text-3xl sm:text-4xl mb-4">
              You&apos;re all set!
            </h1>
            <p className="prose-muted text-lg mb-8">
              You&apos;ve successfully opted in to receive SMS updates from SparkCreatives Inc. 
              You should receive a confirmation text shortly.
            </p>
            <GlowButton href="/">
              Return to Home
            </GlowButton>
          </motion.div>
        </Section>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-6xl mb-6"
            >
              📱
            </motion.div>
            <h1 className="font-display2 text-3xl sm:text-4xl mb-4">
              Stay Connected
            </h1>
            <p className="prose-muted text-lg">
              Get real-time updates about our impact, upcoming drives, and how your support is making a difference.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="surface rounded-2xl p-6 sm:p-8"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-chili-red/10 border border-chili-red/20 rounded-lg"
              >
                <p className="text-chili-red text-sm">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-label tracking-wider uppercase mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-glow focus:border-tamarind-orange/50 transition-colors text-[#E7E9EE] placeholder:text-white/40"
                  required
                />
                <p className="text-xs prose-muted mt-2">
                  Include country code (e.g., +1 for US)
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-1 w-4 h-4 text-tamarind-orange bg-white/5 border-white/10 rounded focus:ring-tamarind-orange focus:ring-2"
                    required
                  />
                  <label htmlFor="consent" className="text-sm leading-relaxed">
                    <strong>I consent to receive SMS messages from SparkCreatives Inc.</strong> 
                    <br />
                    <span className="prose-muted text-xs">
                      By checking this box, you agree to receive text messages about our programs, 
                      impact updates, and ways to get involved. Message and data rates may apply. 
                      You can opt out at any time by replying STOP. Reply HELP for help.
                    </span>
                  </label>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="font-label tracking-wider uppercase text-sm mb-2">
                    What to expect:
                  </h3>
                  <ul className="text-sm prose-muted space-y-1">
                    <li>• Impact updates and success stories</li>
                    <li>• Upcoming donation drives and events</li>
                    <li>• Volunteer opportunities</li>
                    <li>• Emergency relief updates</li>
                  </ul>
                </div>
              </div>

              <GlowButton
                type="submit"
                disabled={!phoneNumber || !consentGiven || isSubmitting}
                className="w-full justify-center"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe to SMS Updates"}
              </GlowButton>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-xs prose-muted">
              Your privacy is important to us. We&apos;ll never share your number with third parties.
              <br />
              <a href="/privacy" className="hover:underline text-tamarind-orange">
                Read our privacy policy
              </a>
            </p>
          </motion.div>
        </motion.div>
      </Section>
    </main>
  );
}
