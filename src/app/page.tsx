import Section from "@/components/Section";
import VideoHero from "@/components/VideoHero";
import SimpleVideo from "@/components/SimpleVideo";
import ImpactStrip from "@/components/ImpactStrip";
import LogoWall from "@/components/LogoWall";
import GlowButton from "@/components/GlowButton";
import ExperienceCard from "@/components/ExperienceCard";
import DonationCard from "@/components/DonationCard";
import CalendarEvent from "@/components/CalendarEvent";

export default function Page() {
  return (
    <main>
      {/* Option 1: With Video Background */}
      <VideoHero
        videoUrl="https://cqxporsfudzigeimzawn.supabase.co/storage/v1/object/sign/website-assets-video/Igniting%20Creative%20Change!.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wNmNkMDYzYy1mYzcwLTQ5ZmMtOTEzMS0zMDUyOTU1MzRiZGMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWJzaXRlLWFzc2V0cy12aWRlby9JZ25pdGluZyBDcmVhdGl2ZSBDaGFuZ2UhLm1wNCIsImlhdCI6MTc1OTUzMDcwMywiZXhwIjoxNzkxMDY2NzAzfQ.zfZzbpeaRDMLc0--WZz3CLDIfezj1dpSAbA1TWrTpC4"
        showVideo={true}
      />
      
      {/* Option 2: Without Video (original 3D background) */}
      {/* <VideoHero showVideo={false} /> */}

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

      <Section id="get-involved" kicker="Get involved" title="Fuel the next box">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            {tier:"Supply Boost", price:"$25", bullets:["Fill gaps in a kit","Covers supplies & packing"], cta:"Donate $25", icon:"📦", color:"from-tamarind-orange to-chili-red", amount: 25, donationTier: 'supply-boost' as const},
            {tier:"Sponsor a Box", price:"$100", bullets:["Fund a complete starter-kit","Help deliver it with tracking"], cta:"Donate $100", icon:"🎁", color:"from-chili-red to-burnt-sienna", amount: 100, donationTier: 'sponsor-box' as const},
            {tier:"Monthly Ally", price:"/mo", bullets:["Reliable ongoing support","We'll show your impact"], cta:"Become a Member", icon:"💝", color:"from-burnt-sienna to-cacao-brown", amount: 25, donationTier: 'monthly-ally' as const},
          ].map((card,i)=> (
            <DonationCard key={i} {...card} index={i} />
          ))}
        </div>
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
        <LogoWall logos={[
          {name:"Maple Bear ELC"}, {name:"Compostela Elementary"}, {name:"Local Donors"}, {name:"Logistics Partners"}, {name:"Tech Allies"},
        ]}/>
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

      <footer className="mt-16 sm:mt-24 border-t border-white/10 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
            <p className="font-label tracking-widest text-sm sm:text-base">SparkCreatives Inc.</p>
            <nav className="flex flex-wrap gap-3 sm:gap-4 text-sm">
              <a href="#get-involved" className="hover:underline touch-target">Donate</a>
              <a href="#volunteer" className="hover:underline touch-target">Volunteer</a>
              <a href="#impact" className="hover:underline touch-target">See Impact</a>
            </nav>
          </div>
          <p className="prose-muted mt-4 text-xs sm:text-sm leading-relaxed">
            EIN 33-4477854 · FDACS Registration CH79169.
            A copy of the official registration and financial information may be obtained from the Florida Division of Consumer Services by calling 1-800-HELP-FLA (435-7352) or at FDACS.gov. Registration does not imply endorsement, approval, or recommendation by the state.
          </p>
          <p className="prose-muted text-xs mt-2">© {new Date().getFullYear()} SparkCreatives Inc. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
