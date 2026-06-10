export interface VoiceMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  /** Optional: booking data associated with this message */
  booking?: BookingInfo;
  /** Optional: result of a tool call (e.g. booking confirmation) */
  toolCallResult?: ToolCallResult;
}

export interface VoiceState {
  isLoading: boolean;
  messages: VoiceMessage[];
  error: string | null;
  bookingInProgress: boolean;
  suggestedReplies: string[];
}

export interface ToolCallResult {
  success: boolean;
  bookingRef?: string;
  error?: string;
  data?: Record<string, unknown>;
}

export interface BookingInfo {
  name?: string;
  phone?: string;
  email?: string;
  serviceType?: string;       // "foundation" | "power-pack" | "mastery"
  lessonName?: string;
  lessonPrice?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}

export interface VoiceAPIResponse {
  content: string;
  toolCalls?: Array<{
    function: {
      name: string;
      arguments: string;
    };
  }>;
  booking?: ToolCallResult;
}

export interface AIFunctionCall {
  name: string;
  arguments: Record<string, unknown>;
}

export interface GroqMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: {
      name: string;
      arguments: string;
    };
  }>;
  tool_call_id?: string;
}

export interface ToolDefinition {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: "object";
      properties: Record<string, unknown>;
      required: string[];
    };
  };
}
