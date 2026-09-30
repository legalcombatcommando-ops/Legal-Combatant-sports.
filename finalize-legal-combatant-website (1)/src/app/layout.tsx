import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "./globals.css";
import "./onboarding.css";
import "./founder.css";
import "./founders-corner.css";
import "./revamp.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Legal Combatants | Combat Sports. Security. Law.",
    template: "%s | Legal Combatants",
  },
  description:
    "Legal Combatants is building a better corner for Nigerian combat sports: athlete, coach, and referee development, professional security, and law as the baseline.",
  openGraph: {
    title: "Legal Combatants | Develop. Protect. Defend.",
    description: "Combat sports development, professional security, and law: three niches, one standard.",
    ...(siteUrl ? { images: ["/images/hero-fighter.jpg"] } : {}),
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
