import Link from "next/link";

/** The mark: a sword standing upright through the centre of a scale of justice. */
export function BrandMark() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="7" y1="14" x2="41" y2="14" />
      <path d="M7 14L2.5 26H11.5L7 14Z" />
      <path d="M41 14L36.5 26H45.5L41 14Z" />
      <path d="M24 3L27.2 9V33H20.8V9L24 3Z" fill="currentColor" stroke="none" />
      <line x1="16" y1="33" x2="32" y2="33" strokeWidth="3" />
      <line x1="24" y1="34" x2="24" y2="41" />
      <circle cx="24" cy="43" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`brand${footer ? " brand-footer" : ""}`} href="/" aria-label="Legal Combatants, home">
      <span className="brand-symbol" aria-hidden="true"><BrandMark /></span>
      <span className="brand-wordmark">
        <span>LEGAL</span>
        <span>COMBATANTS</span>
      </span>
      <span className="brand-descriptor">COMBAT SPORTS<br />SECURITY · LAW</span>
    </Link>
  );
}
