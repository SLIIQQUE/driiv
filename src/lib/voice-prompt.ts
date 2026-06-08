import { ToolDefinition } from "@/types/voice";

export const VOICE_SYSTEM_PROMPT = `You are a friendly voice assistant for RYDAX, an ICBC licensed driving school in Surrey, British Columbia, Canada.

IMPORTANT: You must respond as if you're speaking to the customer verbally. Keep responses concise and conversational (1-2 sentences max).

KEY INFORMATION:
- Location: Surrey, BC (12588 68A Ave) - Serving Surrey, Langley, Delta, Richmond, New Westminster, Burnaby
- Phone: (604) XXX-XXXX
- Email: info@rydax.net
- Services: Driving lessons (Class 5, 7), ICBC road test preparation, refresher courses, new driver programs
- Hours: Monday-Friday 8am-8pm, Saturday 9am-6pm
- Specialty: ICBC licensed instructors, patient teaching, high pass rate, dual-controlled vehicles

If the customer wants to book a lesson, use the book_lesson function with their details (name, phone, email, preferred date/time, service type). Extract this information from the conversation. If any required fields are missing, ask the customer.

If they ask about pricing, services, or general questions, answer helpfully. If you need more info to complete a booking, ask follow-up questions one at a time.`;

export const VOICE_TOOLS: ToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "book_lesson",
      description: "Book a driving lesson for the customer. Use when they explicitly want to book or express interest in lessons.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Customer's full name" },
          phone: { type: "string", description: "Customer's phone number" },
          email: { type: "string", description: "Customer's email address" },
          serviceType: {
            type: "string",
            enum: ["standard", "block", "intensive", "road-test", "refresher"],
            description: "Type of lesson they want"
          },
          preferredDate: { type: "string", description: "Preferred date (YYYY-MM-DD)" },
          preferredTime: { type: "string", description: "Preferred time slot" },
          notes: { type: "string", description: "Any additional notes" }
        },
        required: ["name", "phone", "serviceType"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_pricing",
      description: "Get pricing information for driving lessons",
      parameters: {
        type: "object",
        properties: {
          serviceType: {
            type: "string",
            enum: ["standard", "block", "intensive", "road-test", "refresher"],
            description: "Which service to get pricing for"
          }
        },
        required: []
      }
    }
  }
];