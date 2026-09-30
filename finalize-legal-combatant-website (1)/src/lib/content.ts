export const services = [
  {
    number: "01",
    title: "Medicals & readiness",
    description: "Need a medical, clearance, or the right specialist? Tell us what support you’re looking for and we’ll explore the right next step together.",
    icon: "heart",
    needId: "medicals",
  },
  {
    number: "02",
    title: "Legal & protection",
    description: "From fight contracts to image rights and disputes, understand your position before it becomes a problem.",
    icon: "file",
    needId: "legal",
  },
  {
    number: "03",
    title: "Sponsors & brand",
    description: "Your story has value. Explore sponsorship opportunities and build a brand that works for the long game.",
    icon: "spark",
    needId: "sponsorship",
  },
  {
    number: "04",
    title: "Training & team",
    description: "Good preparation takes good people. Find clarity on the coaches, support, and relationships around you.",
    icon: "dumbbell",
    needId: "training",
  },
  {
    number: "05",
    title: "Career & opportunities",
    description: "Whether you’re preparing for the next bout or planning what comes after, let’s make a more intentional move.",
    icon: "compass",
    needId: "opportunities",
  },
  {
    number: "06",
    title: "Wellbeing & recovery",
    description: "The fighter matters outside the ring too. Make recovery and ongoing wellbeing part of the plan.",
    icon: "activity",
    needId: "wellbeing",
  },
] as const;

export const topics = [
  "Medicals & readiness",
  "Legal & contracts",
  "Sponsorship & brand",
  "Training & team",
  "Career opportunities",
  "Wellbeing & recovery",
  "Coach & referee development",
  "Security services",
  "Partnership inquiry",
  "Something else",
] as const;

export const roles = [
  "Fighter / athlete",
  "Coach / team",
  "Promoter / organisation",
  "Brand / partner",
  "Referee / official",
  "Other",
] as const;

export const audiences = [
  {
    number: "01",
    name: "Fighters & athletes",
    heading: "A whole career needs a whole corner.",
    description: "From the first amateur bout to your next big opportunity, we start with the full picture of what you need, not just one problem.",
    points: ["Talent development pathway", "Legal & contract support", "Protection beyond the ring"],
    href: "/join",
    cta: "BUILD YOUR CORNER",
  },
  {
    number: "02",
    name: "Coaches & officials",
    heading: "Raise the standard behind the ropes.",
    description: "Coaches, referees, and judges shape every fight. We are building development, licensing, and certification courses to help them lead with confidence.",
    points: ["Coach development", "Referee & official licensing", "Certification courses"],
    href: "/?topic=Coach%20%26%20referee%20development&role=Coach%20%2F%20team#contact",
    cta: "REGISTER INTEREST",
  },
  {
    number: "03",
    name: "Executives & organisations",
    heading: "Protection that matches your profile.",
    description: "VIPs, chief executives, and high-profile personnel rely on a professional security brand that is disciplined, discreet, and dependable.",
    points: ["VIP & executive protection", "High-profile personnel", "Event & venue security"],
    href: "/?topic=Security%20services&role=Other#contact",
    cta: "SPEAK TO THE TEAM",
  },
] as const;

export const faqs = [
  {
    question: "What is Legal Combatants?",
    answer: "Legal Combatants is built on three niches: combat sports development, professional security, and law as the baseline. Our aim is to replace mismanagement in Nigerian combat sports with management, by developing athletes, coaches, and officials, and protecting fighters beyond the ring.",
  },
  {
    question: "What happens after I join the corner?",
    answer: "Your profile is saved and we review what you have shared. We follow up using your preferred contact method to understand your needs and discuss possible next steps. Submitting a profile does not guarantee a match, sponsor, or referral.",
  },
  {
    question: "Do you offer coach and referee courses?",
    answer: "Coach development and referee and official licensing and certification courses are a core part of our vision, and programmes are being developed in line with the requirements and recognition of the relevant sporting and regulatory bodies. Register your interest and we will share details as they are confirmed.",
  },
  {
    question: "Who is the security arm for?",
    answer: "Our security brand serves VIPs, chief executives, and high-profile personnel, and provides protection teams for the fighters in our corner. Services are delivered in line with applicable Nigerian law. This website is not an emergency line; in an emergency contact the police or emergency services.",
  },
  {
    question: "Will you find me a sponsor, or arrange a medical?",
    answer: "We can explore your goals and help you find the right route, including to qualified medical professionals and suitable partners. Opportunities depend on fit and availability, and we do not promise sponsorship, clearance, or any specific outcome. This website does not provide medical advice or clearance.",
  },
  {
    question: "Does joining create a lawyer-client or other professional relationship?",
    answer: "No. Joining or sending an inquiry is an introduction. A professional relationship, if any, is formed separately with the appropriate qualified provider after their own checks and engagement process. We will check with you before sharing your identifiable details with anyone else.",
  },
] as const;

export type Article = {
  slug: string;
  number: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  closing: string;
};

export const articles: Article[] = [
  {
    slug: "before-you-sign-a-fight-contract",
    number: "01",
    category: "CONTRACTS",
    date: "12 JUNE 2025",
    readTime: "4 MIN READ",
    title: "Before you sign: what a fight contract should make clear",
    excerpt: "The questions worth asking before a signature turns an opportunity into an obligation.",
    image: "/images/journal-contract.jpg",
    imageAlt: "Contract and pen alongside boxing hand wraps",
    intro:
      "A fight offer can move quickly. A good agreement should move just as clearly. Before you commit, take time to understand what is expected of you, what you will receive, and what happens if plans change.",
    sections: [
      {
        heading: "Start with the fundamentals",
        paragraphs: [
          "The basics should never be a guessing game: who the parties are, when and where the bout takes place, the agreed weight, the purse, payment timing, and any expenses or deductions. If an important point was agreed in a conversation, make sure it appears in the written agreement.",
          "Read the whole document, including schedules, attachments, and policies incorporated by reference. Those details can have just as much effect as the headline terms.",
        ],
      },
      {
        heading: "Plan for the unexpected round",
        paragraphs: [
          "Injuries, opponent changes, postponements, and cancellations happen. Look for clear language about who can make those decisions and what happens to your payment and obligations if they do.",
          "Also consider obligations outside the ring: media appearances, exclusivity, sponsorship restrictions, and the use of your image or likeness. They can extend beyond the bout itself.",
        ],
      },
      {
        heading: "Get a second set of eyes",
        paragraphs: [
          "Pressure to sign quickly is not a reason to skip a careful review. Asking questions is part of being professional, and getting advice before you agree is usually easier than resolving a problem later.",
        ],
      },
    ],
    closing: "The best time to understand a contract is before you put your name on it.",
  },
  {
    slug: "your-name-your-rights",
    number: "02",
    category: "ATHLETE RIGHTS",
    date: "29 MAY 2025",
    readTime: "5 MIN READ",
    title: "Your name is an asset. Treat your rights like one.",
    excerpt: "A closer look at image rights, sponsorship terms, and the value you build outside the ring.",
    image: "/images/journal-rights.jpg",
    imageAlt: "Fighter entering a boxing arena through a dark tunnel",
    intro:
      "An athlete’s value doesn’t stop at the final bell. Your name, image, story, and audience can open doors long after a single event. The agreements you make today can shape how those rights are used tomorrow.",
    sections: [
      {
        heading: "Know what you are giving away",
        paragraphs: [
          "A licence to use your image is different from giving up ownership or granting unrestricted use. Pay attention to where your likeness can appear, for what purpose, for how long, and whether you have any approval rights.",
          "Broad language can travel further than expected. A promotion for one event may end up covering future advertising, merchandise, or third-party campaigns if the agreement is not clear.",
        ],
      },
      {
        heading: "Check how your deals fit together",
        paragraphs: [
          "Sponsorship opportunities are valuable, but exclusivity and category restrictions can overlap with promoter, team, or event commitments. Understanding those intersections before signing helps you avoid promising the same rights twice.",
        ],
      },
      {
        heading: "Think beyond the next event",
        paragraphs: [
          "A practical rights strategy is not about saying no to every opportunity. It is about knowing what you control, choosing deals that make sense, and leaving room for the career you are building.",
        ],
      },
    ],
    closing: "The name on the fight poster is yours. Be deliberate about what comes with it.",
  },
  {
    slug: "when-fight-night-changes",
    number: "03",
    category: "THE BUSINESS OF SPORT",
    date: "08 MAY 2025",
    readTime: "4 MIN READ",
    title: "When fight night changes, what happens next?",
    excerpt: "Opponent changes, postponements, and cancellations deserve a plan before they happen.",
    image: "/images/journal-brand.jpg",
    imageAlt: "Boxer sitting alone at the edge of a ring after training",
    intro:
      "Months of training can be upended in a phone call. An opponent withdraws, an event moves, or a bout is cancelled altogether. The right next step depends on the agreements in place and the reason for the change.",
    sections: [
      {
        heading: "Start with what was agreed",
        paragraphs: [
          "Look at the written terms for postponement, cancellation, replacement opponents, and notice. Different events and jurisdictions may have different requirements, so avoid assuming that an informal understanding settles the issue.",
        ],
      },
      {
        heading: "Keep a clear record",
        paragraphs: [
          "Save the agreement and any written updates. Keep track of dates, expenses, and the communications that explain what changed. A straightforward timeline can be invaluable if there is later disagreement about what was promised.",
          "Before accepting a replacement bout or new date, take stock of what else changes: weight, preparation time, pay, travel, broadcast arrangements, and medical or regulatory requirements.",
        ],
      },
      {
        heading: "Make the next decision deliberately",
        paragraphs: [
          "Fast-moving situations call for calm, informed decisions. If the financial or career impact is significant, get advice on your specific circumstances before agreeing to revised terms or taking a formal position.",
        ],
      },
    ],
    closing: "You cannot control every change of plans. You can be prepared for how you respond.",
  },
];
