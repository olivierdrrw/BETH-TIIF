import {
    getConversations,
  } from "@/repositories/conversation-repository";
  
  export async function
  getConversationAnalytics(
    userId: string
  ) {
    const conversations =
      await getConversations(
        userId
      );
  
    return {
      totalMessages:
        conversations.length,
  
      totalSessions:
        Math.ceil(
          conversations.length /
            20
        ),
    };
  }