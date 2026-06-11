export interface Program {
  id: "foundation" | "power-pack" | "mastery";
  name: string;
  price: string;
  period: string;
  tagline: string;
  savings?: string;
  description: string;
  features: string[];
  popular?: boolean;
  color?: string;
}

export const PROGRAMS: Program[] = [
  {
    id: "foundation",
    name: "Foundation Pass",
    price: "$55",
    period: "per session",
    tagline: "Pay-as-you-go mastery",
    description:
      "Pay-as-you-go mastery. Ideal for targeted refinement or refresher sessions. Book individual hours with instant confirmation.",
    features: [
      "One-on-one dual-control mentorship",
      "24/7 online booking — instantaneous",
      "Automated SMS & email pulses",
      "Digital progress report after each session",
    ],
    color: "from-accent/20 to-primary-light/20",
  },
  {
    id: "power-pack",
    name: "Power Pack",
    price: "$250",
    period: "5 sessions",
    tagline: "Optimal momentum",
    savings: "Save $25",
    description:
      "Save $25 and unlock priority scheduling. The recommended launch package for new learners ready to build momentum.",
    features: [
      "Save $25 versus per-session rate",
      "Priority calendar access",
      "AI concierge support — 24/7",
      "Mock assessment included",
      "Full progress nexus dashboard",
    ],
    popular: true,
    color: "from-accent/30 to-primary-light/30",
  },
  {
    id: "mastery",
    name: "Mastery Bundle",
    price: "$450",
    period: "10 sessions",
    tagline: "Maximum velocity",
    savings: "Save $100",
    description:
      "Our apex value. Save $100 and receive everything required to progress from novice to test-ready.",
    features: [
      "Save $100 versus per-session rate",
      "Complete curriculum immersion",
      "2 mock road tests with surgical scoring",
      "Test-readiness dashboard",
      "Auto-pay available — configure once",
    ],
    color: "from-accent/20 to-secondary-foreground/20",
  },
];
