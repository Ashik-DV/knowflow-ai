import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // ==========================
  // Register
  // ==========================

  const register = async (formData) => {
    try {
      const response = await api.post(
        "/auth/register-admin",
        formData
      );

      toast.success(response.data.message);

      return {
        success: true,
      };
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );

      return {
        success: false,
      };
    }
  };

  // ==========================
  // Login
  // ==========================

  const login = async (formData) => {
    try {
      const response = await api.post(
        "/auth/login",
        formData
      );

      const { accessToken, user } = response.data.data;

      localStorage.setItem(
        "accessToken",
        accessToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      setUser(user);

      toast.success("Login Successful");

      return {
        success: true,
      };
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid Credentials"
      );

      return {
        success: false,
      };
    }
  };

  // ==========================
  // Logout
  // ==========================

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setUser(null);

    toast.success("Logged Out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => {
  return useContext(AuthContext);
};