import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ownerEmail } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How Legal Combatants handles fighter profiles and website inquiries.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <header className="legal-hero"><div className="shell"><Link href="/" className="article-back"><ArrowLeft size={17} aria-hidden="true" /> BACK TO HOME</Link><p className="section-kicker light-kicker"><span>LEGAL COMBATANTS / WEBSITE INFORMATION</span><span className="kicker-line" /></p><h1>PRIVACY<br /><em>NOTICE.</em></h1><p>Plain language about the information you share with us.</p></div></header>
        <div className="shell legal-content">
          <p className="legal-updated">LAST UPDATED: 2026</p>
          <p>Legal Combatants collects information you choose to share so we can understand your request and contact you. Please do not submit medical records, diagnoses, confidential legal documents, or urgent requests through this website.</p>
          <h2>What you give us</h2>
          <p>The fighter onboarding form asks for your name, email, phone number, city and country, sport, career stage, the broad support categories you select, an optional short note, timeline, and contact preference. The general inquiry form asks for your name, email, role, topic, and message. Each submission receives a reference number. We also record your consent and whether notifications were accepted by the delivery provider.</p>
          <h2>How we use it</h2>
          <p>We use these details to review your request, communicate with you about next steps, and keep an internal record of the conversation. A medical-support selection tells us what area you are interested in; it is not a request for a diagnosis and we do not ask for clinical information. Joining does not sign you up for marketing or create a professional relationship.</p>
          <h2>Email and WhatsApp</h2>
          <p>When outbound notifications are configured, the form sends your submitted details to the Legal Combatants team by email. An automated WhatsApp alert to our own team number contains only your reference number, not your profile or medical information. These messages may be processed by the respective email and WhatsApp delivery providers. If you choose WhatsApp as a contact method, we may respond to your number about your request. If you choose the WhatsApp button after onboarding, it opens a draft containing your reference and a brief summary of your sport, location, and selected support areas; nothing is sent until you choose to send it. WhatsApp processes that conversation under its own terms.</p>
          <h2>Introductions to others</h2>
          <p>We do not automatically send your identifiable profile to sponsors, medical providers, lawyers, coaches, or other third parties. We will check with you before sharing details for a possible introduction. Independent providers have their own privacy practices and professional responsibilities.</p>
          <h2>Storage and retention</h2>
          <p>Submissions are stored in our website database. We do not sell your details. We retain them only as long as reasonably needed to manage your request, keep appropriate records, or meet applicable obligations. Hosting and notification providers may process data needed to deliver the website and messages.</p>
          <h2>Your choices</h2>
          <p>You can ask what information we have about your submission or request a correction or deletion, subject to applicable requirements. Email <a href={`mailto:${ownerEmail}`}>{ownerEmail}</a> and include your reference if you have it. You can also use the <Link href="/#contact">general contact form</Link>.</p>
          <h2>Changes</h2>
          <p>We may update this notice as the service evolves. The date above shows its latest revision.</p>
          <div className="legal-endnote">QUESTIONS ABOUT YOUR INFORMATION? <a href={`mailto:${ownerEmail}`}>EMAIL US ↗</a></div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
