export const fighterNeeds = [
  {
    id: "medicals",
    title: "Medicals & clearance",
    description: "Find the right route to screening, clearance, or specialist support.",
    icon: "heart",
  },
  {
    id: "legal",
    title: "Legal & contracts",
    description: "Understand agreements, rights, disputes, and the fine print.",
    icon: "file",
  },
  {
    id: "sponsorship",
    title: "Sponsors & brand",
    description: "Explore brand partnerships and protect what you have built.",
    icon: "spark",
  },
  {
    id: "training",
    title: "Training & team",
    description: "Build the right people around your preparation.",
    icon: "dumbbell",
  },
  {
    id: "opportunities",
    title: "Career & opportunities",
    description: "Think through your next bout, pathway, or introduction.",
    icon: "compass",
  },
  {
    id: "wellbeing",
    title: "Recovery & wellbeing",
    description: "Make space for recovery and support beyond fight night.",
    icon: "activity",
  },
  {
    id: "financial",
    title: "Money & planning",
    description: "Get pointed toward practical financial planning support.",
    icon: "chart",
  },
  {
    id: "security",
    title: "Security & protection",
    description: "Explore protection around events, travel, and public life.",
    icon: "shield",
  },
  {
    id: "other",
    title: "Something else",
    description: "Every fighter’s story is different. Tell us what is missing.",
    icon: "plus",
  },
] as const;

export type FighterNeed = (typeof fighterNeeds)[number]["id"];

export const disciplines = ["Boxing", "MMA", "Kickboxing", "Muay Thai", "Wrestling", "Other"] as const;
export const careerStages = ["Just starting out", "Amateur", "Turning professional", "Professional", "Returning to the sport"] as const;
export const timelines = ["As soon as possible", "In the next month", "Planning ahead"] as const;
export const contactPreferences = ["WhatsApp", "Email", "Either works"] as const;

export function needLabel(id: string) {
  return fighterNeeds.find((need) => need.id === id)?.title ?? id;
}
