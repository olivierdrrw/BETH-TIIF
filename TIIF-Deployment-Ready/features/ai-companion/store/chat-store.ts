import { create } from "zustand";

import { AIMessage }
from "../types/message";

interface ChatState {
  messages: AIMessage[];

  addMessage: (
    message: AIMessage
  ) => void;

  clearMessages: () => void;
}

export const useChatStore =
  create<ChatState>((set) => ({
    messages: [],

    addMessage: (message) =>
      set((state) => ({
        messages: [
          ...state.messages,
          message,
        ],
      })),

    clearMessages: () =>
      set({
        messages: [],
      }),
  }));