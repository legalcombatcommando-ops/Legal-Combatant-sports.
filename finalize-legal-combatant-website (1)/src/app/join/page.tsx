import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, LockKeyhole, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OnboardingForm } from "@/components/onboarding-form";
import { getWhatsAppUrl, ownerEmail, ownerWhatsAppDisplay } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Join the Corner | Fighter Onboarding",
  description: "Tell Legal Combatants where you are and what you need. Start one fighter profile for medicals, legal guidance, sponsorship, training, wellbeing, and more.",
};

type PageProps = { searchParams: Promise<{ need?: string | string[] }> };

export default async function JoinPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialNeed = typeof params.need === "string" ? params.need : undefined;

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="join-hero">
          <div className="join-hero-photo" aria-hidden="true" />
          <div className="shell join-hero-inner">
            <p className="section-kicker light-kicker"><span>LEGAL COMBATANTS / THE FIGHTER NETWORK</span><span className="kicker-line" /></p>
            <h1>EVERY FIGHTER<br />NEEDS A <em>CORNER.</em></h1>
            <div className="join-hero-bottom"><p>Medicals. Legal. Sponsors. The right people around your career. Tell us what you need and let&apos;s start building your corner.</p><a href="#onboarding-form">START YOUR PROFILE <ArrowDown size={18} aria-hidden="true" /></a></div>
          </div>
        </section>

        <section className="join-workspace section-spacing">
          <div className="shell join-layout">
            <aside className="join-aside">
              <p className="section-kicker"><span>YOUR STARTING LINE</span><span className="kicker-line" /></p>
              <h2>ONE FORM.<br /><em>MORE SUPPORT.</em></h2>
              <p className="join-aside-lead">You shouldn&apos;t have to figure out every part of a fight career alone.</p>
              <p>Give us a sense of who you are and what you need. We&apos;ll review your profile, follow up, and talk through the most relevant next steps. No automatic matches or guaranteed sponsorships—just a real starting point.</p>
              <div className="join-aside-steps">
                <div><span>01</span><p>Tell us about your sport and your stage.</p></div>
                <div><span>02</span><p>Choose the support you&apos;re looking for.</p></div>
                <div><span>03</span><p>We&apos;ll follow up and explore next steps with you.</p></div>
              </div>
              <div className="join-aside-privacy"><LockKeyhole size={20} strokeWidth={1.5} aria-hidden="true" /><span>No documents or medical records needed. We ask before sharing your details with a third party.</span></div>
              <div className="join-aside-contact"><span>PREFER A CONVERSATION?</span><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" /> {ownerWhatsAppDisplay} <ArrowUpRight size={16} aria-hidden="true" /></a><a href={`mailto:${ownerEmail}`}>{ownerEmail}</a></div>
            </aside>
            <OnboardingForm initialNeed={initialNeed} />
          </div>
        </section>

        <section className="join-next-section">
          <div className="shell">
            <p className="section-kicker"><span>AFTER YOU HIT SEND</span><span className="kicker-line" /></p>
            <div className="join-next-heading"><h2>THE NEXT ROUND<br /><em>STARTS WITH A PLAN.</em></h2><p>Not a directory. Not a promise of placement. A thoughtful conversation about what helps you move forward.</p></div>
            <div className="join-next-grid">
              <div><span>01 / REVIEW</span><Check size={22} strokeWidth={1.4} aria-hidden="true" /><h3>We read your profile.</h3><p>We take stock of your goals, timing, location, and the kind of help you&apos;re after.</p></div>
              <div><span>02 / CONNECT</span><Check size={22} strokeWidth={1.4} aria-hidden="true" /><h3>We talk it through.</h3><p>We get in touch to understand the details before suggesting any next step.</p></div>
              <div><span>03 / MOVE</span><Check size={22} strokeWidth={1.4} aria-hidden="true" /><h3>You choose the path.</h3><p>Any introduction to an independent professional or partner is discussed with you first.</p></div>
            </div>
            <Link href="/#services" className="text-link join-back-link">EXPLORE THE NETWORK <ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
