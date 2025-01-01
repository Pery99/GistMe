import api from "./api";

class AuthService {
  async login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      // Handling specific error messages from the backend
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error("Failed to login. Please try again.");
    }
  }

  async register(userData) {
    try {
      // Validate FormData before sending
      const requiredFields = ["username", "email", "password"];
      for (let field of requiredFields) {
        if (!userData.get(field)) {
          throw new Error(`${field} is required`);
        }
      }
      const response = await api.post(
        "/auth/register",
        {
          username: userData.get("username"),
          email: userData.get("email"),
          password: userData.get("password"),
          bio: userData.get("bio"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      console.error("Registration Error Details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  handleError(error) {
    if (error.response?.data?.error) {
      return new Error(error.response.data.error);
    }
    return new Error("An unexpected error occurred");
  }
}

export default new AuthService();
