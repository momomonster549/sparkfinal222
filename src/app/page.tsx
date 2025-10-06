import Section from "@/components/Section";
import VideoBackground from "@/components/VideoBackground";
import ImpactStrip from "@/components/ImpactStrip";
import PartnersSlideshow from "@/components/PartnersSlideshow";
import GlowButton from "@/components/GlowButton";
import ExperienceCard from "@/components/ExperienceCard";
import DonationCard from "@/components/DonationCard";
import CalendarEvent from "@/components/CalendarEvent";
import CustomAmountSection from "@/components/CustomAmountSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative">
      {/* Persistent Video Background */}
      <VideoBackground />
      
      {/* All content with proper z-index */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Section>
          <div className="min-h-screen flex items-center">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-28 md:py-40">
              <div className="space-y-4 sm:space-y-6">
                <p className="font-label tracking-widest text-tamarind-orange text-sm sm:text-base drop-shadow-md">
                  SparkCreatives Inc
                </p>
                
                <h1 className="font-display1 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-[#E7E9EE] drop-shadow-lg">
                  Igniting change.{" "}
                  <span className="text-tamarind-orange inline-block drop-shadow-lg">
                    Turning excess
                  </span>{" "}
                  to empowerment.
                </h1>
                
                <p className="mt-3 sm:mt-5 max-w-2xl text-[#E7E9EE]/90 text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-md">
                  Sponsor a box or become a monthly donor. Your support fuels starter-kit deliveries and no-cost micro-business coaching.
                </p>
                
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                  <GlowButton 
                    href="/earthquakefund" 
                    className="w-full sm:w-auto text-center text-sm sm:text-base px-6 py-3 !bg-red-600 hover:!bg-red-700 !text-white border-2 border-white shadow-lg"
                  >
                    CEBU EARTHQUAKE
                  </GlowButton>
                  <GlowButton href="https://sparkcreativesincorg.base44.app/" className="w-full sm:w-auto text-center text-sm sm:text-base px-6 py-3">Sponsor a Box</GlowButton>
                  <GlowButton href="/impactpage" className="w-full sm:w-auto text-center !bg-white/0 text-sm sm:text-base px-6 py-3">See Impact</GlowButton>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="get-involved" kicker="Get involved" title="Fuel the next box">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                tier: "Cebu Earthquake Fund",
                price: "$50",
                description: "Emergency relief for families affected by the 6.9 magnitude earthquake",
                bullets: [
                  "Every $1 feeds 1 person",
                  "Immediate emergency supplies",
                  "Direct aid to affected families",
                  "Tax-deductible donation"
                ],
                cta: "Donate $50",
                icon: "🚨",
                color: "from-red-500 to-orange-600",
                amount: 50,
                campaign: "earthquake-fund"
              },
              {
                tier: "Starter Kit Sponsor",
                price: "$150",
                description: "Fund a complete 40-60 item starter kit for a family in need",
                bullets: [
                  "Complete starter kit delivery",
                  "Tracking and transparency",
                  "Family impact report",
                  "Sustainable livelihood support"
                ],
                cta: "Sponsor Kit",
                icon: "📦",
                color: "from-tamarind-orange to-chili-red",
                amount: 150,
                campaign: "starter-kit-sponsor"
              },
              {
                tier: "Monthly Impact Partner",
                price: "$25/mo",
                description: "Become a monthly supporter and create lasting change",
                bullets: [
                  "Reliable ongoing support",
                  "Monthly impact reports",
                  "Priority volunteer opportunities",
                  "Community recognition"
                ],
                cta: "Join Monthly",
                icon: "💝",
                color: "from-chili-red to-burnt-sienna",
                amount: 25,
                campaign: "monthly-impact-partner"
              }
            ].map((card, i) => (
              <DonationCard 
                key={i} 
                {...card} 
                index={i} 
              />
            ))}
          </div>

          {/* Custom Amount Section */}
          <CustomAmountSection 
            campaign="custom-donation"
            title="Custom Donation Amount"
            description="Choose any amount that fits your budget and make a direct impact"
            defaultAmount={50}
          />
        </Section>

        <Section id="experience" kicker="What you'll experience" title="From surplus to sustainable livelihoods">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {title:"Starter-kit boxes", body:"Curated 40–60 item kits delivered with tracking and transparency.", icon:"📦"},
              {title:"Micro-business coaching", body:"Six-week launchpad and 90-day mentoring to help families earn.", icon:"💼"},
              {title:"Education support", body:"Targeted school supplies guided by teachers on the ground.", icon:"🎓"},
            ].map((c,i) => (
              <ExperienceCard key={i} title={c.title} body={c.body} icon={c.icon} index={i} />
            ))}
          </div>
        </Section>

        <Section id="impact" kicker="Impact so far" title="Your generosity in numbers">
          <ImpactStrip items={[
            { label: "Boxes shipped", value: "84+" },
            { label: "Families supported", value: "17" },
            { label: "Micro-businesses launched", value: "5" },
          ]}/>
        </Section>

        <Section id="calendar" kicker="Upcoming" title="Drives & ship dates">
          <div className="grid gap-4">
            {[
              {date:"Oct 26", title:"Community sorting day – JAX", note:"Volunteers welcome", icon:"🗓️"},
              {date:"Nov 09", title:"Ship batch to Cebu", note:"Box receipt QR posted to dashboard", icon:"📦"},
              {date:"Dec 07", title:"Holiday school supply drive", note:"Sponsor a classroom kit", icon:"🎁"},
            ].map((e,i)=>(
              <CalendarEvent key={i} {...e} index={i} />
            ))}
          </div>
        </Section>

        <Section id="partners" kicker="Partners & supporters" title="It takes a community">
          <PartnersSlideshow partners={[
            {name:"Maple Bear Early Learning Center  St Johns, FL", category:"Educational Partner", description:"Supporting early childhood education and community development"},
            {name:"Compostela Elementary School - Cebu, Philippines", category:"School Partner", description:"Collaborating to provide essential resources to students and families"},
            {name:"Local Partners SPJ2 Catholic Church - Ponte Vedra Beach, FL", category:"Community Support", description:"Generous individuals and organizations making a difference in our community"},
            {name:"Logistics Partners - UMAC Cargo, UMAC Express, etc.", category:"Distribution Network", description:"Ensuring efficient delivery of resources to those who need them most"},
            {name:"Tech Allies - Google, Canva, Microsoft 365, Adobe, Zoom, Figma, Slack, etc.", category:"Technology Support", description:"Modern solutions and digital infrastructure for nonprofit community impact"},
          ]} />
        </Section>

        <Section id="faq" kicker="FAQ" title="Good to know">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[
              ["Are donations tax-deductible?", "Yes. SparkCreatives Inc. is a 501(c)(3) public charity. You'll receive a receipt for your records."],
              ["What goes in a 40–60 item starter kit?", "Quality clothing, household essentials, and supplies tailored to a family's needs."],
              ["Do you send receipts and tracking?", "Yes—QR codes and shipment confirmations are shared when available."],
              ["How do you choose families?", "We work with community partners and referrals to reach households with the greatest need."],
            ].map(([q,a],i)=>(
              <details key={i} className="surface rounded-2xl p-4 sm:p-6">
                <summary className="font-display2 text-lg sm:text-xl cursor-pointer">{q}</summary>
                <p className="prose-muted mt-2 text-sm sm:text-base">{a}</p>
              </details>
            ))}
          </div>
        </Section>

        <Footer />
      </div>
    </main>
  );
}