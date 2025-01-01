import api from "./api";

class MessageService {
  async sendMessage(receiverId, content) {
    try {
      const response = await api.post(`/messages/${receiverId}`, { content });
      return this.formatMessage(response.data);
    } catch (error) {
      throw error.response?.data?.error || "Failed to send message";
    }
  }

  async getMessages(userId) {
    try {
      const response = await api.get(`/messages/${userId}`);
      return response.data.map(this.formatMessage);
    } catch (error) {
      throw error.response?.data?.error || "Failed to fetch messages";
    }
  }

  // Add timestamp handling to ensure consistent date format
  formatMessage(message) {
    return {
      ...message,
      createdAt: new Date(message.createdAt).toISOString(),
    };
  }

  async getRecentChats() {
    try {
      // Change the endpoint to be more specific and avoid route conflicts
      const response = await api.get("/messages/recent");
      return response.data.map((chat) => ({
        ...chat,
        lastMessage: chat.lastMessage
          ? this.formatMessage(chat.lastMessage)
          : null,
      }));
    } catch (error) {
      console.error("Recent chats error:", error);
      throw error.response?.data?.error || "Failed to fetch recent chats";
    }
  }
}

export default new MessageService();
