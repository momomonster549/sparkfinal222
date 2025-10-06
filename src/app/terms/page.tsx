"use client";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import GlowButton from "@/components/GlowButton";

export default function TermsPage() {
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
              📋
            </motion.div>
            <h1 className="font-display2 text-3xl sm:text-4xl mb-4">
              Terms of Service
            </h1>
            <p className="prose-muted text-lg">
              These terms govern your use of our website and services. Please read them carefully.
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
              <h2 className="font-display2 text-2xl mb-4">1. Acceptance of Terms</h2>
              <div className="prose-muted space-y-4">
                <p>
                  By accessing and using the SparkCreatives Inc. website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">2. About SparkCreatives Inc.</h2>
              <div className="prose-muted space-y-4">
                <p>
                  SparkCreatives Inc. is a 501(c)(3) public charity (EIN: 33-4477854) registered with the Florida Division of Consumer Services (FDACS Registration: CH79169). Our mission is to turn excess into empowerment by providing starter-kit boxes and micro-business coaching to families in need.
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Tax-Deductible Donations:</strong> All donations to SparkCreatives Inc. are tax-deductible to the full extent allowed by law. You will receive a receipt for your records.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">3. Use of Website</h2>
              <div className="prose-muted space-y-4">
                <p>You may use our website for lawful purposes only. You agree not to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Use the website in any way that violates applicable laws or regulations</li>
                  <li>Transmit or send unsolicited commercial communications</li>
                  <li>Attempt to gain unauthorized access to any part of the website</li>
                  <li>Interfere with or disrupt the website or servers</li>
                  <li>Use automated systems to access the website without permission</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">4. Donations and Payments</h2>
              <div className="prose-muted space-y-4">
                <div>
                  <h3 className="font-label tracking-wider uppercase text-sm mb-2">Donation Processing</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>All donations are processed securely through Stripe</li>
                    <li>Donations are non-refundable unless required by law</li>
                    <li>You will receive a tax-deductible receipt via email</li>
                    <li>We reserve the right to refuse any donation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-label tracking-wider uppercase text-sm mb-2">Recurring Donations</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>You can cancel recurring donations at any time</li>
                    <li>Changes to recurring donations may take up to 24 hours to process</li>
                    <li>Contact us if you need assistance with recurring donations</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">5. Intellectual Property</h2>
              <div className="prose-muted space-y-4">
                <p>
                  All content on this website, including text, graphics, logos, images, and software, is the property of SparkCreatives Inc. or its content suppliers and is protected by copyright and other intellectual property laws.
                </p>
                <p>
                  You may not reproduce, distribute, or create derivative works from our content without written permission.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">6. Privacy and Data Protection</h2>
              <div className="prose-muted space-y-4">
                <p>
                  Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these terms by reference.
                </p>
                <p>
                  By using our services, you consent to the collection and use of information as described in our Privacy Policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">7. Disclaimers and Limitations</h2>
              <div className="prose-muted space-y-4">
                <div>
                  <h3 className="font-label tracking-wider uppercase text-sm mb-2">Website Availability</h3>
                  <p>
                    We strive to keep our website available 24/7, but we do not guarantee uninterrupted access. The website may be temporarily unavailable due to maintenance, updates, or technical issues.
                  </p>
                </div>
                <div>
                  <h3 className="font-label tracking-wider uppercase text-sm mb-2">Information Accuracy</h3>
                  <p>
                    While we make every effort to ensure the accuracy of information on our website, we cannot guarantee that all information is complete, accurate, or up-to-date.
                  </p>
                </div>
                <div>
                  <h3 className="font-label tracking-wider uppercase text-sm mb-2">Limitation of Liability</h3>
                  <p>
                    To the maximum extent permitted by law, SparkCreatives Inc. shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">8. Volunteer Activities</h2>
              <div className="prose-muted space-y-4">
                <p>
                  If you participate in volunteer activities with SparkCreatives Inc., you agree to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Follow all safety guidelines and instructions</li>
                  <li>Represent our organization professionally</li>
                  <li>Respect the privacy and dignity of those we serve</li>
                  <li>Complete any required background checks or training</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">9. Governing Law</h2>
              <div className="prose-muted space-y-4">
                <p>
                  These terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising from these terms or your use of our services shall be resolved in the courts of Florida.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">10. Changes to Terms</h2>
              <div className="prose-muted space-y-4">
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of any significant changes by posting the updated terms on our website and updating the "Last updated" date.
                </p>
                <p>
                  Your continued use of our website and services after changes are posted constitutes acceptance of the modified terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display2 text-2xl mb-4">11. Contact Information</h2>
              <div className="prose-muted space-y-4">
                <p>
                  If you have any questions about these terms of service, please contact us:
                </p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p><strong>SparkCreatives Inc.</strong></p>
                  <p>EIN: 33-4477854</p>
                  <p>FDACS Registration: CH79169</p>
                  <p>Email: <a href="mailto:info@sparkcreativesinc.org" className="text-tamarind-orange hover:underline">info@sparkcreativesinc.org</a></p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>Florida Division of Consumer Services:</strong><br />
                    A copy of the official registration and financial information may be obtained from the Florida Division of Consumer Services by calling 1-800-HELP-FLA (435-7352) or at FDACS.gov. Registration does not imply endorsement, approval, or recommendation by the state.
                  </p>
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

