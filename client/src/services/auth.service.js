import api from "../api/axios";

const authService = {
  // ===========================
  // Register Company + Admin
  // ===========================
  register: async (formData) => {
    return await api.post(
      "/auth/register-admin",
      formData
    );
  },

  // ===========================
  // Login
  // ===========================
  login: async (formData) => {
    return await api.post(
      "/auth/login",
      formData
    );
  },

  // ===========================
  // Logout
  // ===========================
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },

  // ===========================
  // Get User
  // ===========================
  getCurrentUser: () => {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  },

  // ===========================
  // Get Token
  // ===========================
  getToken: () => {
    return localStorage.getItem("accessToken");
  },

  // ===========================
  // Check Login
  // ===========================
  isAuthenticated: () => {
    return !!localStorage.getItem("accessToken");
  },
};

export default authService;