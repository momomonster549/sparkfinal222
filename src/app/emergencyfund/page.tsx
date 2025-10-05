"use client";
import { useEffect, useState } from "react";
import Section from "@/components/Section";
import GlowButton from "@/components/GlowButton";

export default function EmergencyFundPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Cebu earthquake images
  const backgroundImages = [
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/caceee41-aeec-4d43-b7f1-3ff559776b36.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS9jYWNlZWU0MS1hZWVjLTRkNDMtYjdmMS0zZmY1NTk3NzZiMzYuanBnIiwiaWF0IjoxNzU5Njg3NzYxLCJleHAiOjE3OTEyMjM3NjF9.vQTQQmxV-rAzxZUyPJDiUoYDTTblX5fVGJsrUnU68PM",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/b6da6df2-72bd-49ba-98d7-f5d2e7939404.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS9iNmRhNmRmMi03MmJkLTQ5YmEtOThkNy1mNWQyZTc5Mzk0MDQuanBnIiwiaWF0IjoxNzU5Njg3ODY0LCJleHAiOjE3OTEyMjM4NjR9.claSEXXztKuk0xA5xxKIyvTOoBUy9riWj8Wnycy8O1Q",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/5dd6a0f4-364c-40ec-a4cd-b4a4a2ecf416.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS81ZGQ2YTBmNC0zNjRjLTQwZWMtYTRjZC1iNGE0YTJlY2Y0MTYuanBnIiwiaWF0IjoxNzU5Njg3OTAzLCJleHAiOjE3OTEyMjM5MDN9.frsakToN76BQvh6nJo4_W7M761172aoK35YuTtxWf0w",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/d3156889-491f-4139-a4c4-5b31cd536ee7.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS9kMzE1Njg4OS00OTFmLTQxMzktYTRjNC01YjMxY2Q1MzZlZTcuanBnIiwiaWF0IjoxNzU5Njg4MTEzLCJleHAiOjE3OTEyMjQxMTN9.7Q2-pnr6P8s5pIq-Ncje4U1AwTZn1LK5wbn6ml6WC7M",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/a21cfdb9-e67d-424d-9d36-5eeefaa39054.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS9hMjFjZmRiOS1lNjdkLTQyNGQtOWQzNi01ZWVlZmFhMzkwNTQuanBnIiwiaWF0IjoxNzU5Njg4MTM1LCJleHAiOjE3OTEyMjQxMzV9.Eif9X0OJteAGfSeYtm3dvIffz7cuvqacXvCIqB2825M",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/6733a2d0-1815-42e7-8df4-45aae1c618b8.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS82NzMzYTJkMC0xODE1LTQyZTctOGRmNC00NWFhZTFjNjE4YjguanBnIiwiaWF0IjoxNzU5Njg4MTU0LCJleHAiOjE3OTEyMjQxNTR9.RKZsPgMFiiEtgXTgddHwkCaHaoQYEILFTLMjKRxZbKU",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/d3156889-491f-4139-a4c4-5b31cd536ee7.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS9kMzE1Njg4OS00OTFmLTQxMzktYTRjNC01YjMxY2Q1MzZlZTcuanBnIiwiaWF0IjoxNzU5Njg4MTczLCJleHAiOjE3OTEyMjQxNzN9.XMhsTAmIlId3QVs9JIWsrQyFNvXuxanFhhvdiSDBLA0",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/629a90bc-caa8-4efb-bec8-77cdbd29c5cd.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS82MjlhOTBiYy1jYWE4LTRlZmItYmVjOC03N2NkYmQyOWM1Y2QuanBnIiwiaWF0IjoxNzU5Njg4MTg4LCJleHAiOjE3OTEyMjQxODh9.bzywKe2h2YiPj4G4EYbR7XikAtcY7RCBWOxwMRGf7uA",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/586aef2d-8183-428d-9bdf-55ed7d100f99.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS81ODZhZWYyZC04MTgzLTQyOGQtOWJkZi01NWVkN2QxMDBmOTkuanBnIiwiaWF0IjoxNzU5Njg4MjAwLCJleHAiOjE3OTEyMjQyMDB9.Sfl637iqAQhezBdev8cyZGXZSWxEndsXbElnoGGQCFM",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/4e034eea-5ae8-4395-b845-51206ba3b391.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS80ZTAzNGVlYS01YWU4LTQzOTUtYjg0NS01MTIwNmJhM2IzOTEuanBnIiwiaWF0IjoxNzU5Njg4MjExLCJleHAiOjE3OTEyMjQyMTF9.5ax1RfJQB-80Fyutgm7LQ8oY4irFf66VTcJuxuTIYhI",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/3549179c-ef47-46ae-a96b-6c75997db345.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS8zNTQ5MTc5Yy1lZjQ3LTQ2YWUtYTk2Yi02Yzc1OTk3ZGIzNDUuanBnIiwiaWF0IjoxNzU5Njg4MjI0LCJleHAiOjE3OTEyMjQyMjR9.EL3qlzc4g7DxGzmB56XDTxdXLHpW4XRSA9dxtsiYpuY",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/fd09d2c0-89e1-4d30-8a2f-f7fa9228f945.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS9mZDA5ZDJjMC04OWUxLTRkMzAtOGEyZi1mN2ZhOTIyOGY5NDUuanBnIiwiaWF0IjoxNzU5Njg4MDYwLCJleHAiOjE3OTEyMjQwNjB9.htf07UKUhFahhD3jZXzbSdLRTWCYOpNQhHf3CNQbu9U",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/319ff1ce-3086-4d29-90f2-fffe883aeb3d.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS8zMTlmZjFjZS0zMDg2LTRkMjktOTBmMi1mZmZlODgzYWViM2QuanBnIiwiaWF0IjoxNzU5Njg4MjQ0LCJleHAiOjE3OTEyMjQyNDR9.tfv2uaJu1iKOegqK5EtLdi0-hK8uv01sERbu8OSCLjc",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/0c9d6833-8d5e-4bbc-bc09-91733b7260f4.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS8wYzlkNjgzMy04ZDVlLTRiYmMtYmMwOS05MTczM2I3MjYwZjQuanBnIiwiaWF0IjoxNzU5Njg4MjU2LCJleHAiOjE3OTEyMjQyNTZ9.aacaf9it10sLe1yeJqkTM6PA3TzfI94iHpQN0j8_59Q"
  ];

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <main className="relative min-h-screen">
      {/* Background Slideshow */}
      <div className="fixed inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Section>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display2 text-4xl sm:text-5xl lg:text-6xl mb-6 text-white drop-shadow-lg">
              Emergency Fund
            </h1>
            <p className="prose-muted text-lg sm:text-xl mb-8 leading-relaxed text-white/90 drop-shadow-md">
            When families face unexpected crises, your support provides immediate relief and hope for recovery.
            </p>
            <div className="bg-gradient-to-r from-tamarind-orange/20 to-chili-red/20 rounded-2xl p-6 sm:p-8 border border-tamarind-orange/30 backdrop-blur-sm">
              <h2 className="font-display2 text-2xl sm:text-3xl mb-4 text-tamarind-orange">
                Cebu Emergency Fund - $50
              </h2>
              <p className="prose-muted mb-6 text-white/90">
                Fill gaps in emergency kits and cover essential supplies for families in crisis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="text-left">
                  <h3 className="font-medium text-white mb-2">What this covers:</h3>
                  <ul className="prose-muted text-sm space-y-1 text-white/80">
                    <li>• Emergency food supplies</li>
                    <li>• Basic hygiene items</li>
                    <li>• Essential clothing</li>
                    <li>• Packing and shipping</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-white mb-2">Impact:</h3>
                  <ul className="prose-muted text-sm space-y-1 text-white/80">
                    <li>• Immediate relief for 1 family</li>
                    <li>• 2-3 weeks of essentials</li>
                    <li>• Peace of mind during crisis</li>
                    <li>• Foundation for recovery</li>
                  </ul>
                </div>
              </div>
              <a 
                href="https://sparkcreativesincorg/emergencyfund"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto"
              >
                <GlowButton className="w-full sm:w-auto">
                  Donate $50 Now
                </GlowButton>
              </a>
            </div>
          </div>
        </Section>

        {/* How it Works */}
        <Section id="how-it-works" kicker="How it works" title="From crisis to hope">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-tamarind-orange to-chili-red rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                1
              </div>
              <h3 className="font-display2 text-xl mb-3 text-white">Crisis Identified</h3>
              <p className="prose-muted text-white/80">
                Our community partners identify families facing unexpected emergencies like natural disasters, job loss, or medical crises.
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-chili-red to-burnt-sienna rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                2
              </div>
              <h3 className="font-display2 text-xl mb-3 text-white">Rapid Response</h3>
              <p className="prose-muted text-white/80">
                We quickly assemble emergency supply kits with essential items and coordinate immediate delivery to affected families.
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-burnt-sienna to-cacao-brown rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                3
              </div>
              <h3 className="font-display2 text-xl mb-3 text-white">Recovery Support</h3>
              <p className="prose-muted text-white/80">
                Beyond immediate relief, we provide ongoing support to help families rebuild and regain stability.
              </p>
            </div>
          </div>
        </Section>

        {/* Impact Stories */}
        <Section id="stories" kicker="Real impact" title="Stories of hope">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-tamarind-orange to-chili-red rounded-full flex items-center justify-center text-xl mr-4">
                  🌟
                </div>
                <div>
                  <h3 className="font-display2 text-lg text-white">Maria&apos;s Family</h3>
                  <p className="prose-muted text-sm text-white/70">Cebu, Philippines</p>
                </div>
              </div>
              <p className="prose-muted text-white/80">
                &ldquo;When the typhoon destroyed our home, we thought we had lost everything. The emergency kit gave us hope and the basic supplies we needed to start rebuilding our lives.&rdquo;
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-chili-red to-burnt-sienna rounded-full flex items-center justify-center text-xl mr-4">
                  💪
                </div>
                <div>
                  <h3 className="font-display2 text-lg text-white">The Johnson Family</h3>
                  <p className="prose-muted text-sm text-white/70">Jacksonville, FL</p>
                </div>
              </div>
              <p className="prose-muted text-white/80">
                &ldquo;After my husband lost his job, we struggled to make ends meet. The emergency supplies helped us through the toughest weeks while we got back on our feet.&rdquo;
              </p>
            </div>
          </div>
        </Section>

        {/* Call to Action */}
        <Section id="cta" kicker="Make a difference" title="Your support matters">
          <div className="text-center max-w-3xl mx-auto">
            <p className="prose-muted text-lg mb-8 text-white/90">
              Every $25 donation provides immediate relief to a family in crisis. Your generosity creates a ripple effect of hope and recovery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://sparkcreativesincorg.base44.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto"
              >
                <GlowButton className="w-full sm:w-auto">
                  Donate $25 Now
                </GlowButton>
              </a>
              <GlowButton 
                href="/#get-involved"
                className="w-full sm:w-auto"
              >
                See All Options
              </GlowButton>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
