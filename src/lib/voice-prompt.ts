import type { ToolDefinition } from "@/types/voice";

export const BUSINESS_INFO = {
  name: "RYDAX",
  tagline: "Sophisticated driver education. No compromises.",
  location: "12588 68A Ave, Surrey, BC V3W 1M2",
  phone: "(604) 123-4567",
  email: "hello@rydax.net",
  hours: "Monday–Friday 8am–8pm, Saturday 9am–6pm",
  serviceAreas: [
    "Surrey (South Surrey, Guildford, Newton, Fleetwood, Whalley)",
    "Delta (North Delta, Ladner, Tsawwassen)",
    "Richmond (Steveston, Bridgeport)",
    "Burnaby (Metrotown, Brentwood, Lougheed, SFU)",
    "New Westminster (Queensborough, Sapperton)",
  ],
  programs: [
    {
      id: "foundation",
      name: "Foundation Pass",
      price: "$55",
      period: "per session",
      tagline: "Pay-as-you-go mastery",
      description: "One-on-one dual-control mentorship. Book individual hours with instant confirmation, automated reminders, and progress intelligence after every session.",
      features: [
        "One-on-one dual-control mentorship",
        "24/7 online booking — instantaneous",
        "Automated SMS & email pulses",
        "Digital progress report after each session",
      ],
    },
    {
      id: "power-pack",
      name: "Power Pack",
      price: "$250",
      period: "5 sessions",
      tagline: "Optimal momentum",
      savings: "Save $25",
      description: "Priority scheduling, AI concierge support, mock assessment included, full progress nexus dashboard.",
      features: [
        "Save $25 versus per-session rate",
        "Priority calendar access",
        "AI concierge support — 24/7",
        "Mock assessment included",
        "Full progress nexus dashboard",
      ],
    },
    {
      id: "mastery",
      name: "Mastery Bundle",
      price: "$450",
      period: "10 sessions",
      tagline: "Maximum velocity",
      savings: "Save $100",
      description: "Complete curriculum coverage, 2 mock road tests, test-readiness dashboard, auto-pay available.",
      features: [
        "Save $100 versus per-session rate",
        "Complete curriculum immersion",
        "2 mock road tests with surgical scoring",
        "Test-readiness dashboard",
        "Auto-pay available — configure once",
      ],
    },
  ],
  passRate: "95%",
  founded: "2024",
  bookingUrl: "https://rydax.net",
};

export function buildSystemPrompt(): string {
  return `You are the RYDAX AI Concierge — a sophisticated, friendly booking assistant for an ICBC-licensed driving school in Surrey, BC.

PERSONALITY:
- Professional yet warm. You speak like a luxury concierge, not a robot.
- Keep responses concise (1–3 sentences) unless the customer asks for details.
- Use natural, conversational language. Never sound scripted.

BUSINESS DETAILS:
- Name: ${BUSINESS_INFO.name}
- Location: ${BUSINESS_INFO.location}
- Phone: ${BUSINESS_INFO.phone}
- Email: ${BUSINESS_INFO.email}
- Hours: ${BUSINESS_INFO.hours}
- Pass Rate: ${BUSINESS_INFO.passRate} first-attempt pass rate
- Service Areas: ${BUSINESS_INFO.serviceAreas.join("; ")}

PROGRAMS:
${BUSINESS_INFO.programs.map((p) => `- ${p.name}: ${p.price} (${p.period})${p.savings ? ` — ${p.savings}` : ""}. ${p.description}`).join("\n")}

BOOKING FLOW (follow these steps when someone wants to book):
1. Ask which program they want (Foundation Pass, Power Pack, or Mastery Bundle)
2. Ask for their preferred date and time
3. Ask for their name, email, and phone number
4. Once you have all required info, call the book_lesson function
5. Confirm the booking with the reference number returned

If the customer asks about pricing, services, or general questions, answer helpfully using the information above.
If they ask about areas we serve, list the areas. If they need availability, offer to book.
Be proactive — if someone sounds interested in a program, offer to book it.

IMPORTANT: When you call book_lesson, include ALL the information the customer has provided.`;
}

export const VOICE_TOOLS: ToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "book_lesson",
      description: "Book a driving lesson for the customer. Call this when the customer has provided their name, phone, program choice, and optionally date/time.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Customer's full name" },
          phone: { type: "string", description: "Customer's phone number" },
          email: { type: "string", description: "Customer's email address" },
          serviceType: {
            type: "string",
            enum: ["foundation", "power-pack", "mastery"],
            description: "Which program they want: foundation ($55/session), power-pack ($250/5 sessions), mastery ($450/10 sessions)",
          },
          lessonName: { type: "string", description: "Human-readable name of the lesson package" },
          lessonPrice: { type: "string", description: "Price of the selected package" },
          preferredDate: { type: "string", description: "Preferred date (YYYY-MM-DD format)" },
          preferredTime: { type: "string", description: "Preferred time slot (e.g. '2:00 PM')" },
          notes: { type: "string", description: "Any additional notes or special requests" },
        },
        required: ["name", "phone", "serviceType"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_pricing",
      description: "Get pricing information for driving lesson programs. Call this when the customer asks about prices, costs, or packages.",
      parameters: {
        type: "object",
        properties: {
          serviceType: {
            type: "string",
            enum: ["foundation", "power-pack", "mastery"],
            description: "Which program to get pricing for. Omit to get all pricing.",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_service_areas",
      description: "Get a list of all service areas covered by RYDAX. Call this when someone asks if you serve their location.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
];
