import Link from "next/link";
import Section from "@/components/Section";
import ImpactStrip from "@/components/ImpactStrip";
import PartnersSlideshow from "@/components/PartnersSlideshow";
import GlowButton from "@/components/GlowButton";

export default function ImpactPage() {
  return (
    <main>
      {/* Hero Section */}
      <Section className="pt-8 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display2 text-4xl sm:text-5xl lg:text-6xl mb-6">
            Our Impact
          </h1>
          <p className="prose-muted text-lg sm:text-xl mb-8 leading-relaxed">
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

      <Section id="impact-numbers" kicker="Impact so far" title="Your generosity in numbers">
        <ImpactStrip items={[
          { label: "Boxes shipped", value: "84+" },
          { label: "Families supported", value: "17" },
          { label: "Micro-businesses launched", value: "5" },
        ]}/>
      </Section>

      <Section id="detailed-impact" kicker="Making a difference" title="Real stories, real impact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="surface rounded-2xl p-6 sm:p-8">
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
          
          <div className="surface rounded-2xl p-6 sm:p-8">
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
          
          <div className="surface rounded-2xl p-6 sm:p-8">
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
          
          <div className="surface rounded-2xl p-6 sm:p-8">
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

      <Section id="partners" kicker="Partners & supporters" title="It takes a community">
        <PartnersSlideshow partners={[
          {name:"Maple Bear Early Learning Center  St Johns, FL", category:"Educational Partner", description:"Supporting early childhood education and community development"},
          {name:"Compostela Elementary School - Cebu, Philippines", category:"School Partner", description:"Collaborating to provide essential resources to students and families"},
          {name:"Local Partners SPJ2 Catholic Church - Ponte Vedra Beach, FL", category:"Community Support", description:"Generous individuals and organizations making a difference in our community"},
          {name:"Logistics Partners - UMAC Cargo, UMAC Express, etc.", category:"Distribution Network", description:"Ensuring efficient delivery of resources to those who need them most"},
          {name:"Tech Allies - Google, Canva, Microsoft 365, Adobe, Zoom, Figma, Slack, etc.", category:"Technology Support", description:"Modern solutions and digital infrastructure for nonprofit community impact"},
        ]} />
      </Section>

      <Section id="call-to-action" kicker="Join the movement" title="Be part of the change">
        <div className="text-center max-w-3xl mx-auto">
          <p className="prose-muted text-lg mb-8">
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

      <Section id="faq" kicker="FAQ" title="Good to know">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {[
            ["How do you measure impact?", "We track boxes delivered, families supported, and micro-businesses launched. We also collect feedback from recipients and community partners."],
            ["Can I see where my donation goes?", "Yes—we provide tracking information and impact updates. Monthly allies receive regular impact reports."],
            ["How do you choose which families to help?", "We work with community partners and referrals to reach households with the greatest need, prioritizing families in crisis or transition."],
            ["What makes your approach different?", "We focus on sustainable empowerment through starter kits and micro-business coaching, not just temporary relief."],
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
              <Link href="/" className="hover:underline touch-target">Home</Link>
              <a href="https://sparkcreativesincorg.base44.app/" className="hover:underline touch-target">Donate</a>
              <a href="#volunteer" className="hover:underline touch-target">Volunteer</a>
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
