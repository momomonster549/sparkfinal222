"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Section from "@/components/Section";
import ImpactStrip from "@/components/ImpactStrip";
import PartnersSlideshow from "@/components/PartnersSlideshow";
import GlowButton from "@/components/GlowButton";
import Footer from "@/components/Footer";

export default function ImpactPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Impact and community images
  const backgroundImages = [
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/caceee41-aeec-4d43-b7f1-3ff559776b36.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS9jYWNlZWU0MS1hZWVjLTRkNDMtYjdmMS0zZmY1NTk3NzZiMzYuanBnIiwiaWF0IjoxNzU5Njg3NzYxLCJleHAiOjE3OTEyMjM3NjF9.vQTQQmxV-rAzxZUyPJDiUoYDTTblX5fVGJsrUnU68PM",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/b6da6df2-72bd-49ba-98d7-f5d2e7939404.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS9iNmRhNmRmMi03MmJkLTQ5YmEtOThkNy1mNWQyZTc5Mzk0MDQuanBnIiwiaWF0IjoxNzU5Njg3ODY0LCJleHAiOjE3OTEyMjM4NjR9.claSEXXztKuk0xA5xxKIyvTOoBUy9riWj8Wnycy8O1Q",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/5dd6a0f4-364c-40ec-a4cd-b4a4a2ecf416.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS81ZGQ2YTBmNC0zNjRjLTQwZWMtYTRjZC1iNGE0YTJlY2Y0MTYuanBnIiwiaWF0IjoxNzU5Njg3OTAzLCJleHAiOjE3OTEyMjM5MDN9.frsakToN76BQvh6nJo4_W7M761172aoK35YuTtxWf0w",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/d3156889-491f-4139-a4c4-5b31cd536ee7.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS9kMzE1Njg4OS00OTFmLTQxMzktYTRjNC01YjMxY2Q1MzZlZTcuanBnIiwiaWF0IjoxNzU5Njg4MTEzLCJleHAiOjE3OTEyMjQxMTN9.7Q2-pnr6P8s5pIq-Ncje4U1AwTZn1LK5wbn6ml6WC7M",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/a21cfdb9-e67d-424d-9d36-5eeefaa39054.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS9hMjFjZmRiOS1lNjdkLTQyNGQtOWQzNi01ZWVlZmFhMzkwNTQuanBnIiwiaWF0IjoxNzU5Njg4MTM1LCJleHAiOjE3OTEyMjQxMzV9.Eif9X0OJteAGfSeYtm3dvIffz7cuvqacXvCIqB2825M",
    "https://mprqehqtefuqhtgczaqo.supabase.co/storage/v1/object/sign/website-assets/CebuEarthquake/6733a2d0-1815-42e7-8df4-45aae1c618b8.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mYWQ4OGYxOC1lZmEyLTQwNzUtODVjNi01ODhiN2ZmZmNmZDQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy9DZWJ1RWFydGhxdWFrZS82NzMzYTJkMC0xODE1LTQyZTctOGRmNC00NWFhZTFjNjE4YjguanBnIiwiaWF0IjoxNzU5Njg4MTU0LCJleHAiOjE3OTEyMjQxNTR9.RKZsPgMFiiEtgXTgddHwkCaHaoQYEILFTLMjKRxZbKU"
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
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Section>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display2 text-4xl sm:text-5xl lg:text-6xl mb-6 text-white">
              Our Impact
            </h1>
            <p className="prose-muted text-lg sm:text-xl mb-8 leading-relaxed text-white/90">
              See how your support is making a real difference in communities around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton href="/" className="w-full sm:w-auto">
                Back to Home
              </GlowButton>
              <GlowButton href="https://sparkcreativesincorg.base44.app/" className="w-full sm:w-auto !bg-white/0">
                Get Involved
              </GlowButton>
            </div>
          </div>
        </Section>

        {/* Impact Numbers */}
        <Section id="impact-numbers" kicker="Impact so far" title="Your generosity in numbers">
          <ImpactStrip items={[
            { label: "Boxes shipped", value: "84+" },
            { label: "Families supported", value: "17" },
            { label: "Micro-businesses launched", value: "5" },
          ]}/>
        </Section>

        {/* Detailed Impact Stories */}
        <Section id="detailed-impact" kicker="Making a difference" title="Real stories, real impact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="surface rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:shadow-tamarind-orange/20 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-tamarind-orange to-chili-red rounded-full flex items-center justify-center text-xl mr-4">
                  📦
                </div>
                <div>
                  <h3 className="font-display2 text-lg">Starter-Kit Success</h3>
                  <p className="prose-muted text-sm">84+ boxes delivered</p>
                </div>
              </div>
              <p className="prose-muted">
                Our carefully curated 40-60 item starter kits have helped families transition from surplus to sustainable livelihoods. Each box is tailored to the specific needs of the receiving family.
              </p>
            </div>
            
            <div className="surface rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:shadow-tamarind-orange/20 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-chili-red to-burnt-sienna rounded-full flex items-center justify-center text-xl mr-4">
                  💼
                </div>
                <div>
                  <h3 className="font-display2 text-lg">Micro-Business Growth</h3>
                  <p className="prose-muted text-sm">5 businesses launched</p>
                </div>
              </div>
              <p className="prose-muted">
                Through our six-week launchpad and 90-day mentoring program, families are learning to turn their starter kits into sustainable income sources.
              </p>
            </div>
            
            <div className="surface rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:shadow-tamarind-orange/20 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-burnt-sienna to-cacao-brown rounded-full flex items-center justify-center text-xl mr-4">
                  🎓
                </div>
                <div>
                  <h3 className="font-display2 text-lg">Educational Support</h3>
                  <p className="prose-muted text-sm">17 families supported</p>
                </div>
              </div>
              <p className="prose-muted">
                Our targeted school supplies, guided by teachers on the ground, ensure that children have the resources they need to succeed in their education.
              </p>
            </div>
            
            <div className="surface rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:shadow-tamarind-orange/20 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-tamarind-orange to-chili-red rounded-full flex items-center justify-center text-xl mr-4">
                  🤝
                </div>
                <div>
                  <h3 className="font-display2 text-lg">Community Partnerships</h3>
                  <p className="prose-muted text-sm">Strong local network</p>
                </div>
              </div>
              <p className="prose-muted">
                We work closely with local partners and community organizations to ensure our resources reach those who need them most.
              </p>
            </div>
          </div>
        </Section>

        {/* Photo Slideshow - Aligned with other pages */}
        <Section id="slideshow" kicker="Real impact" title="See our work in action">
          <div className="text-center mb-8">
            <p className="prose-muted text-base sm:text-lg text-white/90 max-w-3xl mx-auto">
              Follow our community impact efforts around the world. Every photo tells a story of hope, resilience, and community strength.
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
                      {currentImageIndex === 0 && "Community Impact - Cebu, Philippines"}
                      {currentImageIndex === 1 && "Emergency Response - Bogo, Cebu"}
                      {currentImageIndex === 2 && "Community Support - San Remigio, Cebu"}
                      {currentImageIndex === 3 && "Resource Distribution - Impact Stories"}
                      {currentImageIndex === 4 && "Recovery Efforts - Rebuilding Lives"}
                      {currentImageIndex === 5 && "Volunteer Team - SparkCreatives"}
                    </h3>
                    <p className="text-sm sm:text-base text-white/80">
                      {currentImageIndex === 0 && "Providing immediate relief and long-term support to communities in need"}
                      {currentImageIndex === 1 && "Emergency response and resource distribution in Bogo, Cebu"}
                      {currentImageIndex === 2 && "Community support and resilience building in San Remigio, Cebu"}
                      {currentImageIndex === 3 && "Distributing essential resources and supplies to families in need"}
                      {currentImageIndex === 4 && "Helping communities rebuild and recover from various challenges"}
                      {currentImageIndex === 5 && "Our dedicated volunteer team making a difference worldwide"}
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
              Join us in making a difference. Every donation helps us reach more families and create lasting impact.
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

        {/* Partners */}
        <Section id="partners" kicker="Partners & supporters" title="It takes a community">
          <PartnersSlideshow partners={[
            {name:"Maple Bear Early Learning Center  St Johns, FL", category:"Educational Partner", description:"Supporting early childhood education and community development"},
            {name:"Compostela Elementary School - Cebu, Philippines", category:"School Partner", description:"Collaborating to provide essential resources to students and families"},
            {name:"Local Partners SPJ2 Catholic Church - Ponte Vedra Beach, FL", category:"Community Support", description:"Generous individuals and organizations making a difference in our community"},
            {name:"Logistics Partners - UMAC Cargo, UMAC Express, etc.", category:"Distribution Network", description:"Ensuring efficient delivery of resources to those who need them most"},
            {name:"Tech Allies - Google, Canva, Microsoft 365, Adobe, Zoom, Figma, Slack, etc.", category:"Technology Support", description:"Modern solutions and digital infrastructure for nonprofit community impact"},
          ]} />
        </Section>

        {/* Call to Action */}
        <Section id="call-to-action" kicker="Join the movement" title="Be part of the change">
          <div className="text-center max-w-3xl mx-auto">
            <p className="prose-muted text-lg mb-8 text-white/90">
              Your support makes this impact possible. Join us in turning excess into empowerment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlowButton href="https://sparkcreativesincorg.base44.app/" className="w-full sm:w-auto">
                Sponsor a Box
              </GlowButton>
              <GlowButton href="https://sparkcreativesincorg.base44.app/" className="w-full sm:w-auto !bg-white/0">
                Become a Monthly Ally
              </GlowButton>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" kicker="FAQ" title="Good to know">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              ["How do you measure impact?", "We track boxes delivered, families supported, and micro-businesses launched. We also collect feedback from recipients and community partners."],
              ["Can I see where my donation goes?", "Yes—we provide tracking information and impact updates. Monthly allies receive regular impact reports."],
              ["How do you choose which families to help?", "We work with community partners and referrals to reach households with the greatest need, prioritizing families in crisis or transition."],
              ["What makes your approach different?", "We focus on sustainable empowerment through starter kits and micro-business coaching, not just temporary relief."],
            ].map(([q,a],i)=>(
              <details key={i} className="surface rounded-2xl p-4 sm:p-6 hover:shadow-lg hover:shadow-tamarind-orange/20 transition-all duration-300">
                <summary className="font-display2 text-lg sm:text-xl cursor-pointer">{q}</summary>
                <p className="prose-muted mt-2 text-sm sm:text-base">{a}</p>
              </details>
            ))}
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
