export interface Lesson {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  savings?: string;
  features: string[];
  popular?: boolean;
  color: string;
}

export const LESSONS: Lesson[] = [
  {
    id: "foundation",
    name: "Foundation Pass",
    description: "Pay-as-you-go mastery. Ideal for targeted refinement or refresher sessions. Book individual hours with instant confirmation.",
    price: "$55",
    period: "per session",
    features: [
      "One-on-one dual-control instruction",
      "24/7 online booking",
      "Automated SMS & email reminders",
      "Digital progress report after each session",
    ],
    color: "from-accent/20 to-primary-light/20",
  },
  {
    id: "power-pack",
    name: "Power Pack",
    description: "Save $25 and unlock priority scheduling. The recommended launch package for new learners ready to build momentum.",
    price: "$250",
    period: "5 sessions",
    savings: "Save $25",
    popular: true,
    features: [
      "Save $25 versus per-session rate",
      "Priority calendar access",
      "AI concierge support — 24/7",
      "Mock assessment included",
      "Full progress dashboard",
    ],
    color: "from-accent/30 to-primary-light/30",
  },
  {
    id: "mastery",
    name: "Mastery Bundle",
    description: "Our apex value. Save $100 and receive everything required to progress from novice to test-ready.",
    price: "$450",
    period: "10 sessions",
    savings: "Save $100",
    features: [
      "Save $100 versus per-session rate",
      "Complete curriculum coverage",
      "2 mock road tests with surgical scoring",
      "Test-readiness dashboard",
      "Auto-pay available",
    ],
    color: "from-accent/20 to-secondary-foreground/20",
  },
];

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  lessonId: string;
  lessonName: string;
  lessonPrice: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export const BOOKING_HOURS = {
  weekday: [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
  ],
  saturday: [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00",
  ],
} as const;
