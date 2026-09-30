"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";

const navigation = [
  { label: "COMBAT SPORTS", href: "/divisions/combat-sports" },
  { label: "SECURITY", href: "/divisions/security" },
  { label: "LAW", href: "/divisions/law" },
  { label: "FOUNDER'S CORNER", href: "/founders-corner" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner shell">
        <Brand />
        <nav className="desktop-navigation" aria-label="Main navigation">
          {navigation.map((item) => <Link href={item.href} key={item.label}>{item.label}</Link>)}
        </nav>
        <Link className="header-cta" href="/join">JOIN THE CORNER <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" /></Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={25} aria-hidden="true" /> : <Menu size={25} aria-hidden="true" />}
        </button>
      </div>
      <nav id="mobile-navigation" className={`mobile-navigation${menuOpen ? " is-open" : ""}`} aria-label="Mobile navigation" inert={!menuOpen}>
        {navigation.map((item, index) => <Link href={item.href} key={item.label} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={20} aria-hidden="true" /></Link>)}
        <Link className="mobile-contact-link" href="/join" onClick={() => setMenuOpen(false)}>JOIN THE CORNER <ArrowUpRight size={22} aria-hidden="true" /></Link>
        <Link className="mobile-direct-link" href="/#contact" onClick={() => setMenuOpen(false)}>GENERAL ENQUIRY <ArrowUpRight size={19} aria-hidden="true" /></Link>
      </nav>
    </header>
  );
}
