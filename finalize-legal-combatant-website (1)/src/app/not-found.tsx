import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="not-found-section">
        <div className="shell not-found-inner">
          <p className="section-kicker light-kicker"><span>WRONG CORNER / 404</span><span className="kicker-line" /></p>
          <h1>THIS ROUND<br /><em>IS OVER.</em></h1>
          <p>We couldn&apos;t find the page you were looking for. Let&apos;s get you back in the right corner.</p>
          <Link className="button-lime" href="/">BACK TO HOME <ArrowUpRight size={21} strokeWidth={1.7} aria-hidden="true" /></Link>
          <span className="not-found-mark" aria-hidden="true">✳</span>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
