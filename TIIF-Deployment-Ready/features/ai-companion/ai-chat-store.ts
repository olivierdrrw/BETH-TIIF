import { create }
from "zustand";

import {
  ChatMessage,
} from "./chat-message";

interface State {

  messages:
    ChatMessage[];

  addMessage: (
    message:
      ChatMessage
  ) => void;
}

export const useAiChatStore =
create<State>((set) => ({

  messages: [],

  addMessage: (
    message
  ) =>
    set((state) => ({
      messages: [
        ...state.messages,
        message,
      ],
    })),
}));