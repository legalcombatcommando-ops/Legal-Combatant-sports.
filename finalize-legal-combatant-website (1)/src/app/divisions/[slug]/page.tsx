import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Shield, Scale, Swords } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { divisions, getDivision } from "@/lib/divisions";

type PageProps = { params: Promise<{ slug: string }> };

const icons = { "combat-sports": Swords, security: Shield, law: Scale };

export function generateStaticParams() {
  return divisions.map((division) => ({ slug: division.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) return { title: "Page not found" };
  return { title: `${division.name} | ${division.tagline}`, description: division.short };
}

export default async function DivisionPage({ params }: PageProps) {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) notFound();
  const others = divisions.filter((item) => item.slug !== division.slug);
  const contactHref = `/?topic=${encodeURIComponent(division.topic)}&role=${encodeURIComponent(division.role)}#contact`;

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="division-hero">
          <div className="shell division-hero-inner">
            <div className="division-hero-top">
              <Link href="/#niches" className="article-back">THE THREE NICHES</Link>
              <span>{division.number} / 03 · {division.side}</span>
            </div>
            <p className="division-verb">{division.verb}.</p>
            <h1>{division.heading[0]}<br /><em>{division.heading[1]}</em></h1>
            <div className="division-hero-bottom">
              <p>{division.tagline}</p>
              <Link className="button-lime" href={contactHref}>{division.ctaLabel} <ArrowUpRight size={20} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className="division-intro section-spacing">
          <div className="shell division-intro-layout">
            <p className="section-kicker"><span>{division.number} / {division.name.toUpperCase()}</span><span className="kicker-line" /></p>
            <p className="division-intro-text">{division.intro}</p>
          </div>
        </section>

        <section className="division-offerings section-spacing">
          <div className="shell">
            <h2>{division.offeringsTitle[0]}<br /><em>{division.offeringsTitle[1]}</em></h2>
            <div className="division-offering-grid">
              {division.offerings.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {division.programmes && division.programmesTitle && (
          <section className="division-programmes section-spacing">
            <div className="shell">
              <h2>{division.programmesTitle[0]}<br /><em>{division.programmesTitle[1]}</em></h2>
              <div className="division-programme-grid">
                {division.programmes.map((item) => (
                  <article key={item.title}>
                    <span>{item.audience}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <em>REGISTER INTEREST</em>
                  </article>
                ))}
              </div>
              <p className="division-note">{division.note}</p>
            </div>
          </section>
        )}

        <section className="division-cta">
          <div className="shell division-cta-layout">
            <div>
              <p className="section-kicker light-kicker"><span>NEXT STEP</span><span className="kicker-line" /></p>
              <h2>LET&apos;S TALK<br /><em>{division.name.toUpperCase()}.</em></h2>
              {!division.programmes && <p className="division-note division-note-light">{division.note}</p>}
            </div>
            <div className="division-cta-links">
              <Link href={contactHref}>{division.ctaLabel} <ArrowUpRight size={19} aria-hidden="true" /></Link>
              {division.slug !== "security" && <Link href="/join">BUILD YOUR FIGHTER PROFILE <ArrowUpRight size={19} aria-hidden="true" /></Link>}
              <Link href="/founders-corner">MEET THE FOUNDER <ArrowUpRight size={19} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <section className="division-switch">
          <div className="shell division-switch-grid">
            {others.map((item) => {
              const Icon = icons[item.slug];
              return (
                <Link href={`/divisions/${item.slug}`} key={item.slug}>
                  <Icon size={26} strokeWidth={1.3} aria-hidden="true" />
                  <span>{item.number} / {item.side}</span>
                  <strong>{item.name}</strong>
                  <em>EXPLORE <ArrowRight size={17} aria-hidden="true" /></em>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
