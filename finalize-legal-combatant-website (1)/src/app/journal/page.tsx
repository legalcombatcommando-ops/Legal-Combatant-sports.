import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { articles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Field Notes",
  description: "Insights on contracts, rights, and the business of combat sports from Legal Combatants.",
};

export default function JournalPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="subpage-hero">
          <div className="shell subpage-hero-inner">
            <p className="section-kicker light-kicker"><span>LEGAL COMBATANTS / INSIGHTS</span><span className="kicker-line" /></p>
            <div className="subpage-hero-row">
              <h1>FIELD<br /><em>NOTES.</em></h1>
              <p>Good decisions start with a better understanding of the game. Thoughts and insights from our corner.</p>
            </div>
            <span className="subpage-count">THE JOURNAL / 001—003</span>
          </div>
        </section>
        <section className="archive-section section-spacing">
          <div className="shell">
            <div className="archive-topline"><span>ALL STORIES</span><span>01 — 03</span></div>
            <div className="journal-grid archive-grid">
              {articles.map((article) => (
                <Link href={`/journal/${article.slug}`} className="journal-card" key={article.slug}>
                  <div className="journal-image">
                    <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw" />
                    <span className="journal-image-arrow"><ArrowUpRight size={23} strokeWidth={1.5} aria-hidden="true" /></span>
                  </div>
                  <div className="journal-meta"><span>{article.category}</span><span>{article.readTime}</span></div>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                  <span className="journal-read">READ THE STORY <ArrowRight size={17} strokeWidth={1.7} aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="archive-cta">
          <div className="shell archive-cta-inner">
            <div><span>BUILDING YOUR FIGHT CAREER?</span><h2>YOUR CORNER STARTS HERE.</h2></div>
            <Link className="button-lime" href="/join">JOIN THE CORNER <ArrowUpRight size={20} aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
