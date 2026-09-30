import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand";
import { getWhatsAppUrl, ownerEmail } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div><Brand footer /><p>Fighting for those who fight.</p></div>
          <div className="footer-links">
            <div>
              <span className="footer-label">THE THREE NICHES</span>
              <Link href="/divisions/combat-sports">Combat sports</Link>
              <Link href="/divisions/security">Security</Link>
              <Link href="/divisions/law">Law</Link>
              <Link href="/founders-corner">The Founder&apos;s Corner</Link>
              <Link href="/journal">Insights</Link>
            </div>
            <div>
              <span className="footer-label">GET IN TOUCH</span>
              <Link href="/join">Join the corner <ArrowUpRight size={15} aria-hidden="true" /></Link>
              <a href={`mailto:${ownerEmail}`}>Email us <ArrowUpRight size={15} aria-hidden="true" /></a>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp us <ArrowUpRight size={15} aria-hidden="true" /></a>
              <Link href="/privacy">Privacy notice</Link>
              <Link href="/disclaimer">Legal disclaimer</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LEGAL COMBATANTS. ALL RIGHTS RESERVED.</span>
          <span>COMBAT SPORTS · SECURITY · LAW</span>
          <Link href="#top">BACK TO TOP ↑</Link>
        </div>
      </div>
    </footer>
  );
}
