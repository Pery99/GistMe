import api from "./api";

class UserService {
  async getAvailableUsers() {
    try {
      const response = await api.get("/users/available");
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Failed to fetch available users";
    }
  }

  async addFriend(friendId) {
    try {
      const response = await api.post(`/users/friends/${friendId}`);
      return response.data;
    } catch (error) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error("Failed to add friend");
    }
  }

  async getFriends() {
    try {
      const response = await api.get('/users/friends');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch friends';
    }
  }

  async getUserProfile(userId) {
    try {
      const response = await api.get(`/users/profile/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch user profile';
    }
  }

  async getCurrentUserProfile() {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to fetch profile';
    }
  }
}

export default new UserService();
