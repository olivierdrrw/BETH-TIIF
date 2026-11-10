import { create } from "zustand";

import { Message }
from "@/features/messages/message.type";

interface MessageState {
  messages: Message[];

  sendMessage: (
    message: Message
  ) => void;
}

export const useMessageStore =
  create<MessageState>((set) => ({
    messages: [],

    sendMessage: (
      message
    ) =>
      set((state) => ({
        messages: [
          ...state.messages,
          message,
        ],
      })),
  }));