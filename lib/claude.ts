import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const MODEL_OPUS = "claude-opus-4-7";
export const MODEL_HAIKU = "claude-haiku-4-5";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
