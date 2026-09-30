"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Check } from "lucide-react";
import { audiences } from "@/lib/content";

export function AudienceTabs() {
  const [active, setActive] = useState(0);
  const audience = audiences[active];

  return (
    <div className="audience-grid">
      <div className="audience-tab-list" role="tablist" aria-label="Who we help">
        {audiences.map((item, index) => (
          <button
            className={`audience-tab${active === index ? " is-active" : ""}`}
            key={item.number}
            id={`audience-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls="audience-panel"
            onClick={() => setActive(index)}
          >
            <span className="audience-tab-number">{item.number}</span>
            <span>{item.name}</span>
            {active === index ? <ArrowDownRight size={24} strokeWidth={1.4} aria-hidden="true" /> : <ArrowUpRight size={22} strokeWidth={1.4} aria-hidden="true" />}
          </button>
        ))}
      </div>
      <div className="audience-panel" id="audience-panel" role="tabpanel" aria-labelledby={`audience-tab-${active}`} key={audience.number}>
        <div className="audience-panel-top">
          <span>IN YOUR CORNER / {audience.number}</span>
          <span className="audience-panel-star" aria-hidden="true">✳</span>
        </div>
        <div>
          <h3>{audience.heading}</h3>
          <p>{audience.description}</p>
          <ul>
            {audience.points.map((point) => (
              <li key={point}><Check size={16} strokeWidth={2} aria-hidden="true" />{point}</li>
            ))}
          </ul>
          <Link className="text-link dark-link" href={audience.href}>
            {audience.cta} <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
