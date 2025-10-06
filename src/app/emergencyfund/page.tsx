"use client";
import { useEffect, useState } from "react";
import Section from "@/components/Section";
import GlowButton from "@/components/GlowButton";
import QuickDonationButton from "@/components/QuickDonationButton";
import CustomAmountDonation from "@/components/CustomAmountDonation";
import Footer from "@/components/Footer";

export default function EmergencyFundPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Multi-disaster images representing typhoons, floods, and infrastructure failures
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
          <div className="text-center max-w-6xl mx-auto px-4 sm:px-6">
            <h1 className="font-display2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-white drop-shadow-lg leading-tight">
              Multi-Disaster Emergency Fund
            </h1>
            <p className="prose-muted text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed text-white/90 drop-shadow-md max-w-4xl mx-auto">
              When typhoons, floods, and infrastructure failures strike the Philippines, your support provides immediate relief and fills critical gaps left by government failures. Together, we build community resilience.
            </p>
            <div className="bg-gradient-to-r from-tamarind-orange/20 to-chili-red/20 rounded-2xl p-4 sm:p-6 md:p-8 border border-tamarind-orange/30 backdrop-blur-sm">
              <h2 className="font-display2 text-xl sm:text-2xl md:text-3xl mb-4 text-tamarind-orange">
                Philippine Emergency Fund
              </h2>
              <p className="prose-muted mb-4 sm:mb-6 text-white/90 text-sm sm:text-base">
                Fill gaps in emergency response and cover essential supplies for families affected by multiple disaster types.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="text-left">
                  <h3 className="font-medium text-white mb-2 text-sm sm:text-base">What this covers:</h3>
                  <ul className="prose-muted text-xs sm:text-sm space-y-1 text-white/80">
                    <li>• Typhoon relief supplies</li>
                    <li>• Flood emergency kits</li>
                    <li>• Infrastructure gap support</li>
                    <li>• Community resilience building</li>
                  </ul>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-white mb-2 text-sm sm:text-base">Impact:</h3>
                  <ul className="prose-muted text-xs sm:text-sm space-y-1 text-white/80">
                    <li>• One dollar feeds one person</li>
                    <li>• Immediate disaster response</li>
                    <li>• Fills government gaps</li>
                    <li>• Builds community strength</li>
                  </ul>
                </div>
              </div>
              
              {/* Responsive Donation Options Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <QuickDonationButton 
                  amount={25} 
                  campaign="emergency-fund"
                  className="inline-block w-full"
                >
                  Donate $25
                </QuickDonationButton>
                
                <QuickDonationButton 
                  amount={50} 
                  campaign="emergency-fund"
                  className="inline-block w-full"
                >
                  Donate $50
                </QuickDonationButton>
                
                <QuickDonationButton 
                  amount={100} 
                  campaign="emergency-fund"
                  className="inline-block w-full"
                >
                  Donate $100
                </QuickDonationButton>
                
                <QuickDonationButton 
                  amount={250} 
                  campaign="emergency-fund"
                  className="inline-block w-full"
                >
                  Donate $250
                </QuickDonationButton>
              </div>

              {/* Custom Amount Donation */}
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <CustomAmountDonation
                  campaign="emergency-fund"
                  defaultAmount={50}
                  onSuccess={(paymentIntent) => {
                    console.log('Donation successful:', paymentIntent);
                    // You can add success handling here
                  }}
                  onError={(error) => {
                    console.error('Donation failed:', error);
                    // You can add error handling here
                  }}
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Disaster Types Section */}
        <Section id="disaster-types" kicker="Multiple threats" title="Disasters we respond to">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-tamarind-orange to-chili-red rounded-full flex items-center justify-center text-lg sm:text-2xl mb-3 sm:mb-4 mx-auto">
                🌪️
              </div>
              <h3 className="font-display2 text-lg sm:text-xl mb-2 sm:mb-3 text-white">Typhoons</h3>
              <p className="prose-muted text-sm sm:text-base text-white/80">
                Philippines faces 20+ typhoons annually. We provide immediate relief when government response falls short.
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-chili-red to-burnt-sienna rounded-full flex items-center justify-center text-lg sm:text-2xl mb-3 sm:mb-4 mx-auto">
                🌊
              </div>
              <h3 className="font-display2 text-lg sm:text-xl mb-2 sm:mb-3 text-white">Floods</h3>
              <p className="prose-muted text-sm sm:text-base text-white/80">
                Frequent flooding due to poor drainage and failed infrastructure projects. We fill the gaps.
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-burnt-sienna to-cacao-brown rounded-full flex items-center justify-center text-lg sm:text-2xl mb-3 sm:mb-4 mx-auto">
                🏗️
              </div>
              <h3 className="font-display2 text-lg sm:text-xl mb-2 sm:mb-3 text-white">Infrastructure Failures</h3>
              <p className="prose-muted text-sm sm:text-base text-white/80">
                When government projects fail due to corruption, we step in to protect communities.
              </p>
            </div>
          </div>
        </Section>

        {/* How it Works */}
        <Section id="how-it-works" kicker="How it works" title="From crisis to resilience">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-tamarind-orange to-chili-red rounded-full flex items-center justify-center text-lg sm:text-2xl mb-3 sm:mb-4 mx-auto">
                1
              </div>
              <h3 className="font-display2 text-lg sm:text-xl mb-2 sm:mb-3 text-white">Disaster Identified</h3>
              <p className="prose-muted text-sm sm:text-base text-white/80">
                Our community partners identify families affected by typhoons, floods, or infrastructure failures across the Philippines.
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-chili-red to-burnt-sienna rounded-full flex items-center justify-center text-lg sm:text-2xl mb-3 sm:mb-4 mx-auto">
                2
              </div>
              <h3 className="font-display2 text-lg sm:text-xl mb-2 sm:mb-3 text-white">Rapid Response</h3>
              <p className="prose-muted text-sm sm:text-base text-white/80">
                We quickly assemble disaster-specific relief kits and coordinate immediate delivery to affected families.
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-burnt-sienna to-cacao-brown rounded-full flex items-center justify-center text-lg sm:text-2xl mb-3 sm:mb-4 mx-auto">
                3
              </div>
              <h3 className="font-display2 text-lg sm:text-xl mb-2 sm:mb-3 text-white">Community Resilience</h3>
              <p className="prose-muted text-sm sm:text-base text-white/80">
                Beyond immediate relief, we build local capacity to better withstand future disasters.
              </p>
            </div>
          </div>
        </Section>

        {/* Impact Stories */}
        <Section id="stories" kicker="Real impact" title="Stories of resilience">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-tamarind-orange to-chili-red rounded-full flex items-center justify-center text-lg sm:text-xl mr-3 sm:mr-4">
                  🌟
                </div>
                <div>
                  <h3 className="font-display2 text-base sm:text-lg text-white">Maria&apos;s Family - Typhoon Relief</h3>
                  <p className="prose-muted text-xs sm:text-sm text-white/70">Leyte, Philippines</p>
                </div>
              </div>
              <p className="prose-muted text-sm sm:text-base text-white/80">
                &ldquo;When Typhoon Odette destroyed our home, the government aid never came. SparkCreatives provided us with emergency supplies and helped us rebuild. We are forever grateful for filling the gap when our leaders failed us.&rdquo;
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-chili-red to-burnt-sienna rounded-full flex items-center justify-center text-lg sm:text-xl mr-3 sm:mr-4">
                  💪
                </div>
                <div>
                  <h3 className="font-display2 text-base sm:text-lg text-white">The Santos Family - Flood Response</h3>
                  <p className="prose-muted text-xs sm:text-sm text-white/70">Metro Manila, Philippines</p>
                </div>
              </div>
              <p className="prose-muted text-sm sm:text-base text-white/80">
                &ldquo;The flood control project in our area was never completed due to corruption. When floods hit, we had nowhere to go. SparkCreatives provided emergency shelter and supplies when the government failed us.&rdquo;
              </p>
            </div>
          </div>
        </Section>

        {/* Photo Slideshow */}
        <Section id="slideshow" kicker="Real impact" title="See our work in action">
          <div className="text-center mb-8">
            <p className="prose-muted text-base sm:text-lg text-white/90 max-w-3xl mx-auto">
              Follow our disaster response efforts across the Philippines. Every photo tells a story of hope, resilience, and community strength.
            </p>
          </div>
          
          {/* Single Window Slideshow */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 overflow-hidden">
              {/* Slideshow Container */}
              <div className="relative aspect-video rounded-xl overflow-hidden">
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
                {/* Overlay with photo info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">
                      {currentImageIndex === 0 && "Typhoon Relief - Leyte, Philippines"}
                      {currentImageIndex === 1 && "Flood Response - Metro Manila"}
                      {currentImageIndex === 2 && "Community Support - Cebu, Philippines"}
                      {currentImageIndex === 3 && "Emergency Kits - Distribution Center"}
                      {currentImageIndex === 4 && "Recovery Efforts - Rebuilding Lives"}
                      {currentImageIndex === 5 && "Volunteer Team - SparkCreatives"}
                    </h3>
                    <p className="text-sm sm:text-base text-white/80">
                      {currentImageIndex === 0 && "Providing immediate relief to families affected by Typhoon Odette"}
                      {currentImageIndex === 1 && "Emergency response during severe flooding in Metro Manila"}
                      {currentImageIndex === 2 && "Community support and resilience building in Cebu"}
                      {currentImageIndex === 3 && "Distributing essential emergency supplies to families in need"}
                      {currentImageIndex === 4 && "Helping communities rebuild and recover from disasters"}
                      {currentImageIndex === 5 && "Our dedicated volunteer team making a difference"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {backgroundImages.slice(0, 6).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'bg-tamarind-orange scale-125' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action Below Slideshow */}
          <div className="text-center mt-8 sm:mt-12">
            <p className="prose-muted text-base sm:text-lg mb-6 text-white/90">
              Join us in making a difference. Every donation helps us respond faster and reach more families in need.
            </p>
            <div className="flex justify-center">
              <GlowButton 
                href="/#get-involved"
                className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              >
                See All Options
              </GlowButton>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </main>
  );
}
