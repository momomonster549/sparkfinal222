"use client";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import GlowButton from "@/components/GlowButton";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-6xl mb-6"
            >
              🔒
            </motion.div>
            <h1 className="font-display2 text-3xl sm:text-4xl mb-4">
              Privacy Policy
            </h1>
            <p className="prose-muted text-lg">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm prose-muted mt-2">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="surface rounded-2xl p-6 sm:p-8 space-y-8"
          >
            <section>
              <h2 className="font-display2 text-2xl mb-4">1. Information We Collect</h2>
              <div className="prose-muted space-y-4">
                <div>
                  <h3 className="font-label tracking-wider uppercase text-sm mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Donation history and payment information</li>
                    <li>Communication preferences</li>
                    <li>Volunteer information and interests</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-label tracking-wider uppercase text-sm mb-2">Technical Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Website usage data and analytics</li>
                    <li>Device information and IP address</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">2. How We Use Your Information</h2>
              <div className="prose-muted space-y-4">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process donations and provide tax receipts</li>
                  <li>Send updates about our programs and impact</li>
                  <li>Coordinate volunteer opportunities</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Respond to your inquiries and requests</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">3. SMS Communications</h2>
              <div className="prose-muted space-y-4">
                <p>
                  When you opt-in to receive SMS messages from SparkCreatives Inc., you consent to receive:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Impact updates and success stories</li>
                  <li>Upcoming donation drives and events</li>
                  <li>Volunteer opportunities</li>
                  <li>Emergency relief updates</li>
                </ul>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Message and data rates may apply.</strong> You can opt out at any time by replying STOP. 
                    Reply HELP for help. We will never share your phone number with third parties.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">4. Information Sharing</h2>
              <div className="prose-muted space-y-4">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share information only in these circumstances:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>With service providers who assist in our operations (payment processors, email services)</li>
                  <li>When required by law or to protect our rights</li>
                  <li>With your explicit consent</li>
                  <li>In case of emergency or safety concerns</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">5. Data Security</h2>
              <div className="prose-muted space-y-4">
                <p>
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Encrypted data transmission and storage</li>
                  <li>Regular security assessments</li>
                  <li>Limited access to personal information</li>
                  <li>Secure payment processing through Stripe</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">6. Your Rights</h2>
              <div className="prose-muted space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Opt out of communications at any time</li>
                  <li>Request deletion of your information</li>
                  <li>Receive a copy of your data</li>
                  <li>File a complaint with relevant authorities</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">7. Cookies and Tracking</h2>
              <div className="prose-muted space-y-4">
                <p>
                  We use cookies and similar technologies to improve your experience on our website. 
                  You can control cookie settings through your browser preferences.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">8. Children's Privacy</h2>
              <div className="prose-muted space-y-4">
                <p>
                  We do not knowingly collect personal information from children under 13. 
                  If we become aware of such collection, we will take steps to delete the information promptly.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">9. Changes to This Policy</h2>
              <div className="prose-muted space-y-4">
                <p>
                  We may update this privacy policy from time to time. We will notify you of any significant changes 
                  by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">10. Contact Us</h2>
              <div className="prose-muted space-y-4">
                <p>
                  If you have any questions about this privacy policy or our data practices, please contact us:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p><strong>SparkCreatives Inc.</strong></p>
                  <p>EIN: 33-4477854</p>
                  <p>FDACS Registration: CH79169</p>
                  <p>Email: <a href="mailto:info@sparkcreativesinc.org" className="text-tamarind-orange hover:underline">info@sparkcreativesinc.org</a></p>
                </div>
              </div>
            </section>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <GlowButton href="/">
              Return to Home
            </GlowButton>
          </motion.div>
        </motion.div>
      </Section>
    </main>
  );
}
