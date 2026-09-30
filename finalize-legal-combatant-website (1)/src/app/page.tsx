import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Dumbbell,
  FileText,
  HeartPulse,
  Mail,
  MessageCircle,
  Shield,
  Scale,
  Sparkles,
  Swords,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AudienceTabs } from "@/components/audience-tabs";
import { FaqAccordion } from "@/components/faq-accordion";
import { ContactForm } from "@/components/contact-form";
import { FounderPortrait } from "@/components/founder-portrait";
import { FounderEmblem } from "@/components/founder-emblem";
import { getWhatsAppUrl, ownerEmail, ownerWhatsAppDisplay } from "@/lib/contact";
import { articles, services } from "@/lib/content";
import { divisions } from "@/lib/divisions";

const serviceIcons = {
  heart: HeartPulse,
  file: FileText,
  spark: Sparkles,
  dumbbell: Dumbbell,
  compass: Compass,
  activity: Activity,
};

const divisionIcons = { "combat-sports": Swords, security: Shield, law: Scale };

type HomePageProps = {
  searchParams: Promise<{ role?: string | string[]; topic?: string | string[] }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const initialRole = typeof params.role === "string" ? params.role : undefined;
  const initialTopic = typeof params.topic === "string" ? params.topic : undefined;

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="shell hero-inner">
            <div className="hero-copy">
              <p className="hero-eyebrow"><span className="eyebrow-dash" /> COMBAT SPORTS · SECURITY · LAW</p>
              <h1 id="hero-heading">DEVELOP.<br />PROTECT.<br /><span>DEFEND</span><span className="hero-period">.</span></h1>
              <p className="hero-description">Three niches. One standard. Combat sports development, professional security, and law as the baseline, so Nigerian talent is managed, protected, and never left to chance.</p>
              <div className="hero-actions">
                <Link className="button-lime" href="/join">BUILD YOUR CORNER <ArrowUpRight size={21} strokeWidth={1.7} aria-hidden="true" /></Link>
                <Link className="hero-secondary" href="/founders-corner">MEET THE FOUNDER <ArrowRight size={19} strokeWidth={1.6} aria-hidden="true" /></Link>
              </div>
            </div>
            <span className="hero-vertical" aria-hidden="true">THE SWORD AND THE SCALE</span>
            <div className="hero-bottom">
              <span>LEGAL COMBATANTS <span className="hero-bottom-divider">/</span> A BETTER CORNER FOR NIGERIAN COMBAT SPORTS</span>
              <Link href="/#intro">SCROLL TO EXPLORE <ArrowDown size={15} strokeWidth={1.7} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <div className="ticker-band" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1, 2, 3].map((item) => (
              <span className="ticker-group" key={item}>COMBAT SPORTS <span>✳</span> SECURITY <span>✳</span> LAW <span>✳</span> DEVELOP · PROTECT · DEFEND <span>✳</span></span>
            ))}
          </div>
        </div>

        <section id="intro" className="intro-section section-spacing">
          <div className="shell intro-layout">
            <div className="intro-heading-col">
              <p className="section-kicker"><span>00 / THE REASON</span><span className="kicker-line" /></p>
              <h2>TALENT ISN&apos;T<br />THE PROBLEM.<br /><em>MANAGEMENT IS.</em></h2>
            </div>
            <div className="intro-text-col">
              <span className="big-asterisk" aria-hidden="true">✳</span>
              <p className="intro-lead">Nigerian combat sports has the talent. It needs the structure.</p>
              <p>Athletes go undeveloped, coaches go uncertified, officials lack clear pathways, and fighters are left exposed once the fight is over. Legal Combatants exists to convert that mismanagement into management, for athletes, coaches, referees, and everyone behind the fight.</p>
              <Link href="/founders-corner" className="text-link">READ THE FOUNDER&apos;S VISION <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section id="niches" className="niches-section section-spacing" aria-labelledby="niches-heading">
          <div className="shell">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker light-kicker"><span>01 / THE THREE NICHES</span><span className="kicker-line" /></p>
                <h2 id="niches-heading">ONE SWORD.<br /><em>THREE NICHES.</em></h2>
              </div>
              <p>Combat sports on the right. Security on the left. Law as the baseline, with the sword standing at the centre of the scale.</p>
            </div>
            <div className="niches-layout">
              <div className="niches-emblem"><FounderEmblem /></div>
              <div className="niches-list">
                {divisions.map((division) => {
                  const Icon = divisionIcons[division.slug];
                  return (
                    <Link href={`/divisions/${division.slug}`} key={division.slug} className="niche-card">
                      <div className="niche-card-top"><span>{division.number} / {division.side}</span><Icon size={30} strokeWidth={1.25} aria-hidden="true" /></div>
                      <h3>{division.name}</h3>
                      <p className="niche-verb">{division.verb}.</p>
                      <p className="niche-text">{division.short}</p>
                      <span className="niche-link">EXPLORE {division.name.toUpperCase()} <ArrowUpRight size={17} aria-hidden="true" /></span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="founder-teaser section-spacing" aria-labelledby="founder-teaser-heading">
          <div className="shell founder-teaser-layout">
            <div className="founder-portrait-frame"><FounderPortrait /></div>
            <div className="founder-teaser-copy">
              <p className="section-kicker light-kicker"><span>02 / THE FOUNDER&apos;S CORNER</span><span className="kicker-line" /></p>
              <h2 id="founder-teaser-heading">THE MAN BEHIND<br />LEGAL <em>COMBATANTS.</em></h2>
              <p>Oyebamiji Abdurrahman Adeniyi is a law graduate and combat sports practitioner who built Legal Combatants on one idea: people who fight deserve people who will fight for them.</p>
              <div className="founder-teaser-pillars" aria-label="Founder credentials"><span>LAW GRADUATE</span><span>COMBAT SPORTS PRACTITIONER</span><span>MEDIATOR &amp; CONCILIATOR</span></div>
              <Link className="button-lime" href="/founders-corner">READ THE FOUNDER&apos;S STORY <ArrowUpRight size={20} strokeWidth={1.7} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section id="services" className="services-section section-spacing">
          <div className="shell">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker"><span>03 / FOR THE FIGHTER</span><span className="kicker-line" /></p>
                <h2>EVERYTHING<br /><em>IN YOUR CORNER.</em></h2>
              </div>
              <p>The different pieces of a fight career should work together. Tell us what you need and we&apos;ll take it from there.</p>
            </div>
            <div className="services-grid support-grid">
              {services.map((service) => {
                const Icon = serviceIcons[service.icon];
                return (
                  <Link className="service-card" href={`/join?need=${service.needId}`} key={service.number}>
                    <div className="service-card-top"><span>{service.number} / 06</span><Icon size={34} strokeWidth={1.2} aria-hidden="true" /></div>
                    <div className="service-card-bottom"><h3>{service.title}</h3><p>{service.description}</p><span className="service-card-link">ADD TO YOUR CORNER <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></span></div>
                  </Link>
                );
              })}
            </div>
            <div className="services-footnote"><p><span>✳</span> Every fighter&apos;s needs are different. Support and introductions are explored personally, not promised automatically.</p><Link href="/join">TELL US WHAT YOU NEED <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
          </div>
        </section>

        <section id="approach" className="approach-section" aria-labelledby="approach-heading">
          <div className="approach-image">
            <Image src="/images/boxing-corner.jpg" alt="Boxer's gloved hands resting on the ropes of a boxing ring" fill sizes="(max-width: 800px) 100vw, 50vw" className="object-cover" />
            <span className="approach-image-tag">MORE THAN A MOMENT. A WHOLE CAREER.</span>
          </div>
          <div className="approach-copy">
            <div className="approach-copy-inner">
              <p className="section-kicker light-kicker"><span>04 / HOW IT WORKS</span><span className="kicker-line" /></p>
              <h2 id="approach-heading">ONE START.<br />MORE<br /><em>POSSIBILITY.</em></h2>
              <p className="approach-lead">You bring your goals. We start by listening. Together, we look at what kind of support actually makes sense.</p>
              <div className="approach-points">
                <div><span>01</span><p>Tell us where you are and what you need.</p></div>
                <div><span>02</span><p>We review your profile and start a conversation.</p></div>
                <div><span>03</span><p>We explore the right next steps with you.</p></div>
              </div>
              <Link className="text-link light-link" href="/join">JOIN THE CORNER <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section id="who-we-help" className="audience-section section-spacing">
          <div className="shell">
            <div className="section-heading-row audience-heading-row">
              <div><p className="section-kicker"><span>05 / WHO IT&apos;S FOR</span><span className="kicker-line" /></p><h2>YOUR WORLD.<br /><em>OUR FOCUS.</em></h2></div>
              <p>Fighters come first. The people who train, officiate, and protect are part of the story too.</p>
            </div>
            <AudienceTabs />
          </div>
        </section>

        <section id="road" className="road-section section-spacing" aria-labelledby="road-heading">
          <div className="shell">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker light-kicker"><span>06 / THE ROAD AHEAD</span><span className="kicker-line" /></p>
                <h2 id="road-heading">FROM LAGOS<br /><em>TO THE WORLD.</em></h2>
              </div>
              <p>This is where we are heading, built step by step: community first, then platform, then institution.</p>
            </div>
            <ol className="road-steps">
              <li><span>01 / COMMUNITY</span><h3>Lagos Combatants.</h3><p>Bring serious fighters, athletes and combat sports professionals together to build relationships, share knowledge and name the challenges they face.</p></li>
              <li><span>02 / PLATFORM</span><h3>One connected corner.</h3><p>Connect fighters and athletes to the legal, professional, commercial and strategic support they need to build sustainable careers.</p></li>
              <li><span>03 / INSTITUTION</span><h3>Africa-rooted, global.</h3><p>Grow an institution able to form partnerships across the international sports ecosystem, and to outlive its founder.</p></li>
            </ol>
            <p className="road-motto">Built from Africa. <em>Designed for the world.</em></p>
          </div>
        </section>

        <section className="statement-strip" aria-label="Our promise">
          <div className="shell statement-inner">
            <span className="statement-star" aria-hidden="true">✳</span>
            <p>MISMANAGEMENT OUT.<br /><em>MANAGEMENT IN.</em></p>
            <Link className="statement-join" href="/founders-corner">THE FOUNDER&apos;S VISION <ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
        </section>

        <section id="insights" className="insights-section section-spacing">
          <div className="shell">
            <div className="section-heading-row insights-heading-row">
              <div><p className="section-kicker"><span>07 / FROM OUR CORNER</span><span className="kicker-line" /></p><h2>KNOW MORE.<br /><em>MOVE BETTER.</em></h2></div>
              <Link href="/journal" className="text-link">ALL INSIGHTS <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" /></Link>
            </div>
            <div className="journal-grid">
              {articles.map((article) => (
                <Link href={`/journal/${article.slug}`} className="journal-card" key={article.slug}>
                  <div className="journal-image"><Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw" /><span className="journal-image-arrow"><ArrowUpRight size={23} strokeWidth={1.5} aria-hidden="true" /></span></div>
                  <div className="journal-meta"><span>{article.category}</span><span>{article.readTime}</span></div>
                  <h3>{article.title}</h3><p>{article.excerpt}</p><span className="journal-read">READ THE STORY <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section section-spacing">
          <div className="shell faq-layout">
            <div className="faq-intro"><p className="section-kicker"><span>08 / GOOD TO KNOW</span><span className="kicker-line" /></p><h2>YOU ASK.<br /><em>WE LISTEN.</em></h2><p>A few things worth knowing before you take the first step.</p><Link href="/join" className="text-link">BUILD YOUR CORNER <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" /></Link></div>
            <FaqAccordion />
          </div>
        </section>

        <section id="contact" className="contact-section section-spacing" aria-labelledby="contact-heading">
          <div className="shell contact-layout">
            <div className="contact-intro">
              <p className="section-kicker light-kicker"><span>09 / THE NEXT MOVE</span><span className="kicker-line" /></p>
              <h2 id="contact-heading">LET&apos;S BUILD<br /><em>WHAT&apos;S</em><br />NEXT<span>.</span></h2>
              <p>A fighter looking for support? The intake form is your fastest starting point. For coaches, officials, security enquiries, partners, or a general question, drop us a line here.</p>
              <div className="contact-fighter-path"><span>FOR FIGHTERS</span><p>One profile. Every part of your corner.</p><Link href="/join">START FIGHTER ONBOARDING <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
              <div className="contact-direct"><span>OR REACH US DIRECTLY</span><a href={`mailto:${ownerEmail}`}><Mail size={16} aria-hidden="true" /> {ownerEmail}</a><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" /> WHATSAPP {ownerWhatsAppDisplay} <ArrowUpRight size={15} aria-hidden="true" /></a></div>
            </div>
            <ContactForm initialRole={initialRole} initialTopic={initialTopic} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
