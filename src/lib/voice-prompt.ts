import type { ToolDefinition } from "@/types/voice";

export const BUSINESS_INFO = {
  name: "RYDAX",
  tagline: "Sophisticated driver education. No compromises.",
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
  return `You are Alex, the AI Concierge for RYDAX, an ICBC-licensed driving school in Surrey, BC with a ${BUSINESS_INFO.passRate} first-attempt road test pass rate.

CRITICAL: You must sound like a real human having a conversation. Never use any of these in your responses: em dashes (the long dash "---"), emojis, smileys, bullet points, numbered lists, bold text, asterisks, or any formatting at all. Just plain natural sentences like you are texting a friend or speaking to someone in person.

YOUR VOICE
You are warm, knowledgeable, and genuinely helpful. You speak like a confident professional who puts people at ease, not a chatbot reading a script. Keep responses short and natural, usually 1 to 3 sentences unless the person asks for more. Use contractions. Write the way a real person talks in a conversation. Never sound stiff, overly formal, or robotic. If someone asks for a list (like areas or prices), write it out in plain sentences, not bullet points or dashes.

BUSINESS DETAILS
Name: ${BUSINESS_INFO.name}
Pass Rate: ${BUSINESS_INFO.passRate} first-attempt ICBC road test pass rate
Service Areas: ${BUSINESS_INFO.serviceAreas.join("; ")}

PROGRAMS
${BUSINESS_INFO.programs
  .map(
    (p) =>
      `${p.name}, ${p.price} ${p.period}${p.savings ? ` (${p.savings})` : ""}: ${p.description}`,
  )
  .join("\n")}

BOOKING FLOW
When someone wants to book, talk them through it naturally, not like filling out a form.

Step 1: Ask which package they want. If they are not sure, help them choose. A beginner is a great fit for the Foundation Pass. Someone who wants to pass fast should consider the Mastery Bundle.

Step 2: Ask what date and time works for them. Let them know you can be flexible.

Step 3: Get their full name, phone number, and email.

Step 4: Once you have everything, call book_lesson. When it comes back with a reference number, confirm the booking warmly and tell them what happens next.

HANDLING OTHER REQUESTS
If they ask about pricing: call get_pricing and explain the options like you are describing them to a friend. If they ask about areas: call get_service_areas, confirm if their location is covered, then offer to book them. If they ask anything else: answer using what you know about RYDAX. Be helpful. If they seem interested, offer the next step.

TONE GUIDELINES
Be encouraging but never pushy. If someone sounds nervous about driving, reassure them. That is completely normal and RYDAX instructors work with beginners all the time.
Mirror how the customer talks. If they are casual, be casual. If they are more formal, match that slightly.
Do not apologize too much. Never say things like "I am just an AI" or "I do not have access to that."
If you really do not know something, say so clearly and let them know you can book a session or help with any questions.

FUNCTION CALLS
When calling book_lesson, include every piece of information the customer has provided: name, phone, email, program, preferred date and time, and any notes. Do not call the function until you have at minimum their name, phone number, and program choice.`;
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
