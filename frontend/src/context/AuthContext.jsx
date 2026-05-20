import { createContext, useContext, useState } from "react";
import { loginUserApi, registerUserApi } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedUser = JSON.parse(localStorage.getItem("courierUser"));
  const [user, setUser] = useState(savedUser || null);
  const [loading, setLoading] = useState(false);

  const login = async (formData) => {
    setLoading(true);

    try {
      const data = await loginUserApi(formData);
      localStorage.setItem("courierUser", JSON.stringify(data));
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);

    try {
      const data = await registerUserApi(formData);

      // Important:
      // Do not save user in localStorage after registration.
      // User should login manually after successful signup.
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("courierUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
