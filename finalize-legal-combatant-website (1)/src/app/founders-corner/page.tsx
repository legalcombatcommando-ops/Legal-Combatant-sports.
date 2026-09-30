import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FounderPortrait } from "@/components/founder-portrait";
import { founder } from "@/lib/founder";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Founder's Corner | The Man Behind Legal Combatants",
  description:
    "Oyebamiji Abdurrahman Adeniyi on why he founded Legal Combatants: the gap between talent and protection, and the institution he is building for the people who fight.",
};

const combatTaught = ["Discipline", "Courage", "Resilience", "Preparation", "Accountability", "The will to stand his ground"];
const lawTaught = ["Structure", "Justice", "Advocacy", "Negotiation", "Responsibility", "Rights protected through legitimate systems"];

const questions = [
  "Who is carefully examining the contract?",
  "Who explains the rights and obligations attached to the agreement?",
  "Who protects the athlete when negotiations become unfair?",
  "Who helps when a sponsorship arrangement goes wrong?",
  "Who helps resolve disputes?",
  "Who explains the legal consequences of a decision before the athlete signs?",
];

const gaps: [string, string][] = [
  ["Athletes", "and the law"],
  ["Talent", "and business"],
  ["Fighters", "and professional representation"],
  ["Careers", "and long-term security"],
  ["Opportunities", "and informed decision-making"],
];

const lifecycle = [
  { title: "The first professional opportunity", text: "Understanding what is on offer before it is accepted." },
  { title: "Contracts & negotiations", text: "Rights and obligations made clear, terms tested, deals negotiated with preparation." },
  { title: "Sponsorships & commercial partnerships", text: "A name and image treated as the asset they are." },
  { title: "Disputes & legal protection", text: "Lawful, informed action when something goes wrong." },
  { title: "Career development", text: "Decisions made with the whole career in view." },
  { title: "Retirement & life after competition", text: "Because the career is short and the life that follows is long." },
];

const missionAreas = [
  "Contract review, drafting and negotiation",
  "Legal representation and advocacy",
  "Sports and entertainment law support",
  "Dispute resolution",
  "Athlete and talent management",
  "Sponsorship and commercial opportunities",
  "Regulatory and compliance support",
  "Career and brand protection",
  "Athlete welfare and safeguarding",
  "Professional education",
  "Strategic partnerships",
  "Career transition and post-competition development",
];

const stages = [
  { step: "01", title: "Build community", text: "Begin with networks such as Lagos Combatants: serious fighters, athletes and combat sports professionals in one room, building relationships, sharing knowledge and naming the challenges they face." },
  { step: "02", title: "Build the platform", text: "From those networks, connect fighters and athletes to legal, professional, commercial and strategic resources they can trust." },
  { step: "03", title: "Build the institution", text: "Grow an African-rooted institution able to operate and form partnerships across the international sports ecosystem." },
];

const beliefs = [
  "that the people who dedicate their lives to protecting, entertaining and inspiring others deserve systems that protect them in return.",
  "that athletes should understand what they are signing.",
  "that talent should not be exploited simply because someone lacks legal or business knowledge.",
  "that a fighter's physical strength should be matched by professional intelligence.",
];

export default function FoundersCornerPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="fc">
        {/* Hero */}
        <section className="fc-hero">
          <div className="shell fc-hero-inner">
            <div className="fc-hero-copy">
              <p className="fc-kicker"><span />THE FOUNDER&apos;S CORNER</p>
              <h1>THE MAN BEHIND<br />LEGAL <em>COMBATANTS.</em></h1>
              <p className="fc-hero-line">People who fight deserve people who will fight for them.</p>
              <p className="fc-hero-sub">Legal Combatants was born from the lived intersection of law and combat. This is the institution being built, why it was started, and where it is going.</p>
              <a className="fc-scroll" href="#origin">READ THE ORIGIN STORY <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <figure className="fc-portrait">
              <div className="fc-portrait-frame">
                <div className="fc-portrait-glow" aria-hidden="true" />
                <FounderPortrait priority />
                <div className="fc-portrait-shade" aria-hidden="true" />
                <p className="fc-portrait-quote">&ldquo;I understand both sides of the fight.&rdquo;</p>
              </div>
              <figcaption>
                <strong>{founder.name}</strong>
                <span>{founder.title}</span>
                <ul aria-label="Professional identity">{founder.roles.map((role) => <li key={role}>{role}</li>)}</ul>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Two worlds */}
        <section id="origin" className="fc-worlds fc-light">
          <div className="shell">
            <p className="fc-kicker fc-kicker-dark"><span />01 / TWO WORLDS, ONE IDEA</p>
            <h2>HE DIDN&apos;T CHOOSE<br />BETWEEN <em>LAW AND COMBAT.</em></h2>
            <p className="fc-lead">Oyebamiji Abdurrahman Adeniyi is a Nigerian law graduate and combat sports practitioner. His professional identity was never built around picking one world over the other.</p>
            <div className="fc-worlds-grid">
              <article>
                <span>COMBAT TAUGHT HIM</span>
                <ul>{combatTaught.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
              <div className="fc-worlds-join" aria-hidden="true"><i /><b>+</b><i /></div>
              <article>
                <span>LAW TAUGHT HIM</span>
                <ul>{lawTaught.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            </div>
            <p className="fc-worlds-end">Over time he realised the two worlds were not separate. They were connected by one idea:</p>
            <p className="fc-worlds-idea">People who fight deserve people who will fight for them.</p>
            <p className="fc-note">That realisation became the foundation of Legal Combatants.</p>
          </div>
        </section>

        {/* Story */}
        <section className="fc-story">
          <div className="shell fc-story-layout">
            <div className="fc-story-head">
              <p className="fc-kicker"><span />02 / THE STORY BEHIND THE BRAND</p>
              <h2>FIGHTERS TRAIN FOR YEARS.<br /><em>THE FIGHT LASTS MINUTES.</em></h2>
            </div>
            <div className="fc-story-copy">
              <p>Combat sports gave the founder first-hand insight into the world athletes work in. Fighters train for years for opportunities that can be over in minutes. They give their bodies, time, relationships, education and money to their careers.</p>
              <p>Yet the business and professional structures around an athlete rarely get the attention that physical preparation does. A fighter may have a coach preparing them for the ring, a promoter preparing the event, a manager negotiating opportunities.</p>
              <p className="fc-story-turn">But then the questions begin.</p>
            </div>
          </div>
          <div className="shell">
            <ol className="fc-questions">
              {questions.map((question, index) => <li key={question}><span>0{index + 1}</span>{question}</li>)}
            </ol>
            <p className="fc-big-question">And perhaps most importantly: <em>when the fighting stops, who fights for the fighter?</em></p>
            <p className="fc-note fc-note-light">Legal Combatants was created to begin answering those questions.</p>
          </div>
        </section>

        {/* Gap */}
        <section className="fc-gap fc-light">
          <div className="shell fc-gap-layout">
            <div>
              <p className="fc-kicker fc-kicker-dark"><span />03 / THE GAP</p>
              <h2>BETWEEN TALENT<br />AND <em>PROTECTION.</em></h2>
              <p className="fc-gap-copy">Athletes and combat sports professionals don&apos;t only need opportunities. They need structures that help them understand, protect and develop those opportunities. Legal Combatants is being built around one belief: an athlete&apos;s welfare should never be an afterthought.</p>
              <p className="fc-gap-line">A career may be short. A contract can last years. A bad decision can echo long after the final bell.</p>
            </div>
            <ul className="fc-gap-list" aria-label="The gaps to bridge">
              {gaps.map(([a, b]) => <li key={a}><strong>{a}</strong><span>{b}</span></li>)}
            </ul>
          </div>
        </section>

        {/* Vision */}
        <section className="fc-vision">
          <div className="shell">
            <p className="fc-kicker"><span />04 / THE VISION</p>
            <div className="fc-vision-head">
              <h2>AN INSTITUTION,<br /><em>NOT JUST A BRAND.</em></h2>
              <p>The long-term vision is an internationally recognised ecosystem at the intersection of <strong>law, combat sports, security, talent, business and advocacy</strong>. The aim is bigger than another law firm, sports agency or fighter network: a single institution that supports athletes and talent across the whole lifecycle of a career.</p>
            </div>
            <ol className="fc-lifecycle">
              {lifecycle.map((item, index) => (
                <li key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></li>
              ))}
            </ol>
            <p className="fc-vision-end">The ultimate objective: a system where fighters don&apos;t have to navigate the professional side of their careers alone.</p>
          </div>
        </section>

        {/* Mission */}
        <section className="fc-mission fc-red-section">
          <div className="shell">
            <p className="fc-kicker fc-kicker-white"><span />05 / THE MISSION</p>
            <blockquote>To protect, represent, educate and empower fighters, athletes and talent by connecting them to the legal, professional and strategic support required to build sustainable careers.</blockquote>
            <p className="fc-mission-lead">Legal Combatants aims to provide, or facilitate access to:</p>
            <ul className="fc-mission-list">
              {missionAreas.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}
            </ul>
            <p className="fc-mission-end">The mission isn&apos;t simply to help people win fights. It&apos;s to help them <strong>build lives and careers worth protecting.</strong></p>
          </div>
        </section>

        {/* Name */}
        <section className="fc-name">
          <div className="shell fc-name-layout">
            <div>
              <p className="fc-kicker"><span />06 / WHY &ldquo;LEGAL COMBATANTS&rdquo;?</p>
              <h2>A COMBATANT<br />STANDS, PREPARES,<br /><em>ENDURES.</em></h2>
              <p className="fc-name-copy">A combatant is someone willing to stand, prepare, endure and fight for something. Legal Combatants applies that mentality to advocacy and professional protection.</p>
              <p className="fc-name-copy"><strong>We don&apos;t encourage unnecessary conflict.</strong> We believe in preparation, lawful action, informed negotiation, strategic thinking and legitimate advocacy. A fighter who enters the arena ready to compete physically should be just as ready professionally and legally.</p>
            </div>
            <ul className="fc-maxims">
              <li><span>Law</span> gives the fight structure.</li>
              <li><span>Combat</span> gives the law courage.</li>
              <li><span>Discipline</span> gives ambition direction.</li>
              <li><span>Service</span> gives success meaning.</li>
            </ul>
          </div>
        </section>

        {/* Lagos to the world */}
        <section className="fc-world fc-light">
          <div className="shell">
            <p className="fc-kicker fc-kicker-dark"><span />07 / FROM LAGOS TO THE WORLD</p>
            <div className="fc-world-head">
              <h2>COMMUNITY FIRST.<br /><em>THEN SCALE.</em></h2>
              <p>The plan starts with a simple idea: build community before building scale. This is the road ahead, not a claim of what has already been achieved.</p>
            </div>
            <ol className="fc-stages">
              {stages.map((stage) => <li key={stage.step}><span>{stage.step}</span><h3>{stage.title}</h3><p>{stage.text}</p></li>)}
            </ol>
            <p className="fc-motto">Built from Africa.<br /><em>Designed for the world.</em></p>
          </div>
        </section>

        {/* Belief */}
        <section className="fc-belief">
          <div className="shell fc-belief-layout">
            <div>
              <p className="fc-kicker"><span />08 / THE FOUNDER&apos;S BELIEF</p>
              <h2>WHAT HE<br /><em>BELIEVES.</em></h2>
            </div>
            <div>
              <ul className="fc-beliefs">
                {beliefs.map((item) => <li key={item}><span>He believes</span> {item}</li>)}
              </ul>
              <p className="fc-belief-copy">And he believes the greatest legacy isn&apos;t only what one achieves personally, but what one builds that keeps serving people after they are gone.</p>
              <p className="fc-belief-strong">Not simply to create a brand. <em>To build an institution</em> that can outlive its founder: one that develops fighters, protects careers, creates opportunities, strengthens professional standards and contributes to a healthier sports ecosystem.</p>
            </div>
          </div>
        </section>

        {/* Closing statement */}
        <section className="fc-closing">
          <div className="shell">
            <p className="fc-kicker fc-kicker-center"><span />THE FOUNDER&apos;S CLOSING STATEMENT</p>
            <blockquote>
              <p>&ldquo;I have spent years learning how to fight inside the arena and how to advocate outside it. Legal Combatants is where those two worlds meet. My goal is to build a system where fighters are not only prepared to compete, but are protected, informed and empowered throughout their careers. Because when the fight ends, their lives continue, and someone should still be in their corner.&rdquo;</p>
              <footer><strong>{founder.name}</strong><span>{founder.title}</span></footer>
            </blockquote>
            <div className="fc-signoff">
              <strong>LEGAL COMBATANTS</strong>
              <em>Fighting for those who fight.</em>
            </div>
            <div className="fc-actions">
              <Link className="fc-button" href="/join">BUILD YOUR CORNER <ArrowUpRight size={19} aria-hidden="true" /></Link>
              <Link className="fc-button fc-button-ghost" href="/#contact">GET IN TOUCH <ArrowUpRight size={19} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
