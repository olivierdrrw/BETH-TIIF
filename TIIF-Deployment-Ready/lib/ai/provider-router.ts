import { AIProvider } from "@/types/ai-provider";

export function getProvider() {
  return process.env
    .NEXT_PUBLIC_AI_PROVIDER as AIProvider;
}