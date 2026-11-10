export type MessageRole =
  | "user"
  | "assistant"
  | "system";

export interface AIMessage {
  id: string;

  role: MessageRole;

  content: string;

  createdAt: string;
}