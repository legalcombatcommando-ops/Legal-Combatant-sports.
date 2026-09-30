import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { articles } from "@/lib/content";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      ...(process.env.NEXT_PUBLIC_SITE_URL ? { images: [article.image] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const nextArticle = articles[(articles.indexOf(article) + 1) % articles.length];

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <article>
          <header className="article-hero">
            <div className="shell">
              <Link href="/journal" className="article-back"><ArrowLeft size={17} aria-hidden="true" /> BACK TO FIELD NOTES</Link>
              <div className="article-hero-meta"><span>{article.category}</span><span>{article.date} <span className="meta-dot">•</span> {article.readTime}</span></div>
              <h1>{article.title}</h1>
              <p>{article.excerpt}</p>
              <div className="article-hero-bottom"><span>FIELD NOTES / {article.number}</span><span>LEGAL COMBATANTS / FIGHTER NETWORK</span></div>
            </div>
          </header>
          <div className="shell article-image-wrap">
            <div className="article-image"><Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 800px) 100vw, 1200px" priority /></div>
          </div>
          <div className="shell article-content-layout">
            <aside className="article-aside">
              <span>IN THIS ARTICLE</span>
              <ol>{article.sections.map((section, index) => <li key={section.heading}><a href={`#section-${index + 1}`}>0{index + 1} / {section.heading}</a></li>)}</ol>
              <Link href="/#contact">HAVE A QUESTION? <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </aside>
            <div className="article-prose">
              <p className="article-intro">{article.intro}</p>
              {article.sections.map((section, index) => (
                <section id={`section-${index + 1}`} key={section.heading}>
                  <span className="article-section-number">0{index + 1} / THE DETAILS</span>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>
              ))}
              <blockquote>{article.closing}</blockquote>
              <p className="article-disclaimer">This article is general information, not legal advice. Circumstances and laws vary; get advice on your specific situation before acting.</p>
            </div>
          </div>
        </article>
        <section className="next-article">
          <div className="shell next-article-inner">
            <div><span>KEEP READING / NEXT STORY</span><Link href={`/journal/${nextArticle.slug}`}>{nextArticle.title} <ArrowRight size={31} strokeWidth={1.4} aria-hidden="true" /></Link></div>
            <Link className="next-article-contact" href="/#contact">LET&apos;S TALK <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
