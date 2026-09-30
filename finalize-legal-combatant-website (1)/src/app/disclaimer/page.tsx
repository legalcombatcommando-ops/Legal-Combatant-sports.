import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description: "Important information about Legal Combatants fighter support and website content.",
};

export default function DisclaimerPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <header className="legal-hero"><div className="shell"><Link href="/" className="article-back"><ArrowLeft size={17} aria-hidden="true" /> BACK TO HOME</Link><p className="section-kicker light-kicker"><span>LEGAL COMBATANTS / WEBSITE INFORMATION</span><span className="kicker-line" /></p><h1>LEGAL<br /><em>DISCLAIMER.</em></h1><p>Good to know before you make your next move.</p></div></header>
        <div className="shell legal-content">
          <p className="legal-updated">LAST UPDATED: 2026</p>
          <h2>Information, not individual advice</h2>
          <p>Website content, articles, and FAQs are general information only. They are not legal, medical, financial, or other professional advice. Rules, health requirements, and individual circumstances vary. Seek appropriately qualified advice before making decisions about your situation.</p>
          <h2>No emergency or clinical service</h2>
          <p>This website does not provide medical assessment, treatment, ringside services, medical clearance, or emergency response. Do not submit diagnoses, test results, or medical records in the onboarding form. If you need urgent medical help, contact your local emergency services or a qualified healthcare professional directly.</p>
          <h2>Security services</h2>
          <p>Legal Combatants&apos;s security niche serves VIPs, chief executives, and high-profile personnel, and provides protection for fighters in our corner. Services are delivered in line with applicable Nigerian law and licensing requirements. This website is not an emergency line and does not monitor messages in real time. In an emergency, contact the police or emergency services immediately.</p>
          <h2>Courses, licences, and certification</h2>
          <p>Coach development, referee and official licensing, and certification programmes are being developed in line with the requirements and recognition of the relevant sporting and regulatory bodies. Descriptions on this website are not a guarantee of accreditation, recognition, or licensing. Programme details are confirmed at enrolment.</p>
          <h2>Onboarding is a starting point</h2>
          <p>Submitting a fighter profile or inquiry does not guarantee a medical appointment, legal representation, sponsorship, fight opportunity, partner match, or any other outcome. Possible introductions depend on your needs and the availability and suitability of independent providers. We will discuss an introduction with you before sharing your identifiable details.</p>
          <h2>No professional relationship through a form</h2>
          <p>Using this website or sending a form does not itself create a lawyer-client, doctor-patient, agent-athlete, or other professional relationship. Any such relationship, if available, is agreed separately with the relevant professional after their own checks, terms, and consent process. Please do not send confidential, time-sensitive, or privileged information in an initial form.</p>
          <h2>Sporting and commercial decisions</h2>
          <p>Combat sports regulations, eligibility, licensing, contracts, and commercial rights differ by place and governing body. Nothing on the site guarantees that information remains current or applies to your specific circumstances.</p>
          <div className="legal-endnote">READY TO START A CONVERSATION? <Link href="/join">JOIN THE CORNER ↗</Link></div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
