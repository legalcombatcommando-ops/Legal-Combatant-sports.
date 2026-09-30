export type Division = {
  slug: "combat-sports" | "security" | "law";
  number: string;
  name: string;
  side: string;
  verb: string;
  tagline: string;
  heading: [string, string];
  intro: string;
  offeringsTitle: [string, string];
  offerings: { title: string; text: string }[];
  programmesTitle?: [string, string];
  programmes?: { title: string; audience: string; text: string }[];
  note: string;
  topic: string;
  role: string;
  ctaLabel: string;
  short: string;
};

export const divisions: Division[] = [
  {
    slug: "combat-sports",
    number: "01",
    name: "Combat Sports",
    side: "THE RIGHT PAN",
    verb: "DEVELOP",
    tagline: "Develop the talent. Raise the standard.",
    heading: ["TALENT DEVELOPED", "ON PURPOSE."],
    short: "Athlete provision and development, coach development, and licensed, certified referees and officials.",
    intro:
      "Nigeria does not lack fighters. It lacks the system that finds them early, develops them properly, and stands behind them. Our combat sports niche exists to build that system: for the athlete, for the coach in the corner, and for the official in the ring.",
    offeringsTitle: ["PROVISION &", "FACILITATION."],
    offerings: [
      { title: "Talent identification & profiling", text: "Finding promising athletes early and recording who they are, what they need, and where they want to go." },
      { title: "Training access & facilitation", text: "Connecting athletes to the gyms, coaches, sparring, and preparation they need to improve." },
      { title: "Medical readiness routes", text: "Helping athletes find the right route to screening and clearance through qualified professionals." },
      { title: "Career & sponsorship pathways", text: "Planning the next bout, the next step, and the partners who can back a fighter's progress." },
      { title: "Wellbeing & recovery", text: "Keeping the fighter's health and future in view, not only the next fight night." },
      { title: "A corner around the fighter", text: "Bringing legal and security support into every athlete's corner through our other two niches." },
    ],
    programmesTitle: ["THE CORNER", "ACADEMY."],
    programmes: [
      { title: "Coach development & certification", audience: "FOR COACHES", text: "Structured development and certification courses so every coach works to a recognised, safe, and professional standard." },
      { title: "Referee & official licensing", audience: "FOR REFEREES & JUDGES", text: "Licensing pathways and certification courses that build credible officials and protect the integrity of every bout." },
      { title: "Ring safety & officiating standards", audience: "FOR OFFICIALS & CORNERS", text: "Clear safety practice and officiating standards for event days, from weigh-in to final decision." },
      { title: "Gym & team management", audience: "FOR GYM OWNERS", text: "Practical management, compliance, and contracting knowledge for the people who run gyms and teams." },
    ],
    note: "Licensing and certification programmes are being developed in line with the requirements and recognition of the relevant sporting and regulatory bodies. Register your interest and we will share programme details, dates, and requirements as they are confirmed.",
    topic: "Coach & referee development",
    role: "Coach / team",
    ctaLabel: "REGISTER INTEREST IN THE ACADEMY",
  },
  {
    slug: "security",
    number: "02",
    name: "Security",
    side: "THE LEFT PAN",
    verb: "PROTECT",
    tagline: "Protection for the people who cannot afford a gap.",
    heading: ["PROTECTION", "WITHOUT A GAP."],
    short: "A professional security brand for VIPs, chief executives, high-profile personnel, and the fighters in our corner.",
    intro:
      "In the ring, a fighter has only themselves. Outside it, they need a team. Our security niche is a professional protection brand: disciplined, discreet, and trusted by people whose profile demands it, including VIPs, chief executives, and high-profile personnel, and the fighters we stand beside.",
    offeringsTitle: ["WHO WE", "PROTECT."],
    offerings: [
      { title: "VIP protection", text: "Close, discreet protection for people whose presence draws attention and risk." },
      { title: "Executive & CEO protection", text: "Protection planning for chief executives and senior leaders, at work, in transit, and at events." },
      { title: "High-profile personnel", text: "Security support for public figures, talent, and personnel who need a dependable team around them." },
      { title: "Fighter protection teams", text: "A team around the fighter through fight week, travel, public appearances, and life outside the ring." },
      { title: "Event & venue security", text: "Planning and on-the-day security for fight nights, functions, and gatherings." },
      { title: "Risk assessment & advance planning", text: "Understanding the risks before a movement or event, and planning around them." },
    ],
    note: "Security services are delivered in line with applicable Nigerian law and licensing requirements. This website is not an emergency line. In an emergency, contact the police or emergency services immediately.",
    topic: "Security services",
    role: "Other",
    ctaLabel: "SPEAK TO THE SECURITY TEAM",
  },
  {
    slug: "law",
    number: "03",
    name: "Law",
    side: "THE BASELINE",
    verb: "DEFEND",
    tagline: "The baseline under everything we do.",
    heading: ["LAW AS", "THE BASELINE."],
    short: "Contracts, rights, regulation, and disputes: the legal foundation beneath every service we offer.",
    intro:
      "Law is the beam the whole scale rests on. Every contract a fighter signs, every agreement a coach enters, every security engagement and every sponsorship starts from clear legal ground. We make that ground plain, so nobody signs a thing they do not understand.",
    offeringsTitle: ["THE LEGAL", "BASELINE."],
    offerings: [
      { title: "Fight & management contracts", text: "Understanding bout agreements, management deals, and the obligations inside them before you sign." },
      { title: "Sponsorship & image rights", text: "Protecting a fighter's name, image, and commercial value in every partnership." },
      { title: "Disputes & disciplinary matters", text: "Practical guidance when an agreement, a result, or a decision is challenged." },
      { title: "Regulatory & compliance guidance", text: "Helping gyms, promoters, and organisers understand the rules that apply to them." },
      { title: "Coach, official & gym agreements", text: "Clear working terms for the people who train, officiate, and run the sport." },
      { title: "Security service agreements", text: "Well-drafted engagements for protection work, so both sides know where they stand." },
    ],
    note: "Information on this website is general and is not legal advice. A lawyer-client relationship is formed only after appropriate checks are completed and engagement terms are agreed in writing.",
    topic: "Legal & contracts",
    role: "Fighter / athlete",
    ctaLabel: "TALK TO US ABOUT LAW",
  },
];

export function getDivision(slug: string) {
  return divisions.find((division) => division.slug === slug);
}
