export interface VoiceMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface VoiceState {
  isListening: boolean;
  isSpeaking: boolean;
  isLoading: boolean;
  messages: VoiceMessage[];
  error: string | null;
}

export interface AIFunctionCall {
  name: string;
  arguments: Record<string, unknown>;
}

export interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: {
      name: string;
      arguments: string;
    };
  }>;
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