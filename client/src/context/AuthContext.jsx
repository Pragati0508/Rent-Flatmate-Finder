import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch Current User
  // ==========================

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");

      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ==========================
  // Login
  // ==========================

  const login = async (data) => {
    setLoading(true);

    try {
      const res = await API.post("/auth/login", data);

      setUser(res.data.user);

      return res;
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Register
  // ==========================

  const register = async (data) => {
    setLoading(true);

    try {
      const res = await API.post("/auth/register", data);

      setUser(res.data.user);

      return res;
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Logout
  // ==========================

  const logout = async () => {
    await API.post("/auth/logout");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);