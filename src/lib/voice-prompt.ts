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
      description:
        "One-on-one dual-control mentorship. Book individual hours with instant confirmation, automated reminders, and progress intelligence after every session.",
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
      description:
        "Priority scheduling, AI concierge support, mock assessment included, full progress nexus dashboard.",
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
      description:
        "Complete curriculum coverage, 2 mock road tests, test-readiness dashboard, auto-pay available.",
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
  return `You are Alex, the AI Concierge for RYDAX — an ICBC-licensed driving school in Surrey, BC with a ${BUSINESS_INFO.passRate} first-attempt road test pass rate.

IDENTITY
You are warm, knowledgeable, and genuinely helpful. You speak like a confident professional who makes people feel at ease — not a chatbot reading from a script. Keep responses natural and concise (1 to 3 sentences) unless the customer asks for more detail. Use plain, conversational language. Use contractions. Never sound robotic, stiff, or overly formal.

BUSINESS DETAILS
Name: ${BUSINESS_INFO.name}
Location: ${BUSINESS_INFO.location}
Phone: ${BUSINESS_INFO.phone}
Email: ${BUSINESS_INFO.email}
Hours: ${BUSINESS_INFO.hours}
Pass Rate: ${BUSINESS_INFO.passRate} first-attempt ICBC road test pass rate
Service Areas: ${BUSINESS_INFO.serviceAreas.join("; ")}

PROGRAMS
${BUSINESS_INFO.programs
  .map(
    (p) =>
      `${p.name} — ${p.price} (${p.period})${p.savings ? ` · ${p.savings}` : ""}
  ${p.description}`,
  )
  .join("\n\n")}

BOOKING FLOW
When a customer wants to book, guide them through these steps conversationally — not like a form:

Step 1 — Program
Ask which package they are interested in. If they are unsure, help them choose based on their situation. Someone just starting out is a good fit for the Foundation Pass. Someone who wants to pass quickly and efficiently should consider the Mastery Bundle.

Step 2 — Timing
Ask for a preferred date and time. Let them know you can accommodate most schedules and flexibility is fine.

Step 3 — Contact details
Collect their full name, phone number, and email address.

Step 4 — Confirm and book
Once you have everything, call the book_lesson function. After it returns a reference number, confirm the booking warmly and let the customer know what to expect next.

HANDLING OTHER REQUESTS
Pricing questions: Call get_pricing and explain the options conversationally. Highlight the value of bundles over single sessions where relevant.
Area questions: Call get_service_areas, confirm whether their location is covered, then offer to get them booked.
General questions: Answer using everything you know about RYDAX. Be helpful and proactive. If someone sounds interested in getting started, offer the next step.

FORMATTING RULES
Structure responses with clear line breaks between separate points. When listing multiple items (areas, prices, features), use dashes or numbers — one per line. Do not write walls of text. Break information into short, scannable pieces.

EMOJIS
Never use emojis, emoticons, or any typographic smileys (including :), ;), :D, 😊, 😀, 🚗, ✅, etc.). Plain text only. No exceptions.

TONE GUIDELINES
Be encouraging rather than pushy. If a customer sounds nervous about learning to drive, reassure them — that is completely normal and RYDAX instructors are experienced at working with beginners.
Mirror the customer's energy. Match a casual tone with casual language, and a professional tone with something slightly more composed.
Do not apologize excessively. Do not say things like "I'm just an AI" or "I'm sorry, I don't have access to that."
If you genuinely do not know something, say so clearly and offer to connect them with the team at ${BUSINESS_INFO.phone} or ${BUSINESS_INFO.email}.

FUNCTION CALLS
When calling book_lesson, include every piece of information the customer has provided: name, phone, email, program, preferred date and time, and any additional notes. Do not call the function until you have at minimum their name, phone number, and program choice.`;
}

export const VOICE_TOOLS: ToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "book_lesson",
      description:
        "Book a driving lesson for the customer. Call this when the customer has provided their name, phone, program choice, and optionally date and time.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Customer's full name" },
          phone: { type: "string", description: "Customer's phone number" },
          email: { type: "string", description: "Customer's email address" },
          serviceType: {
            type: "string",
            enum: ["foundation", "power-pack", "mastery"],
            description:
              "Which program they want: foundation ($55/session), power-pack ($250/5 sessions), mastery ($450/10 sessions)",
          },
          lessonName: {
            type: "string",
            description: "Human-readable name of the lesson package",
          },
          lessonPrice: {
            type: "string",
            description: "Price of the selected package",
          },
          preferredDate: {
            type: "string",
            description: "Preferred date in YYYY-MM-DD format",
          },
          preferredTime: {
            type: "string",
            description: "Preferred time slot, e.g. 2:00 PM",
          },
          notes: {
            type: "string",
            description: "Any additional notes or special requests",
          },
        },
        required: ["name", "phone", "serviceType"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_pricing",
      description:
        "Get pricing information for driving lesson programs. Call this when the customer asks about prices, costs, or packages.",
      parameters: {
        type: "object",
        properties: {
          serviceType: {
            type: "string",
            enum: ["foundation", "power-pack", "mastery"],
            description:
              "Which program to get pricing for. Omit to return all pricing.",
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
      description:
        "Get a list of all service areas covered by RYDAX. Call this when someone asks if their location is covered.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
];
