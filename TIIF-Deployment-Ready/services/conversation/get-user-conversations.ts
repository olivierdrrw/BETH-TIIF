import {
    getConversations,
  } from "@/repositories/conversation-repository";
  
  export async function
  fetchUserConversations(
    userId: string
  ) {
    return getConversations(
      userId
    );
  }