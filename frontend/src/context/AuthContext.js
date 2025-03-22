import React, { createContext, useState, useEffect } from 'react';
import API from "../api/api"; // Assicurati che l'API sia importata correttamente



export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Stato dell'utente

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error('Errore di login:', error.response?.data || error.message);
      throw error;
    }
  };

  const fetchUser = async () => {
    try {
      const response = await API.get("/auth/me");
      setUser(response.data);
    } catch (error) {
      logout(); // Se il token è scaduto o non valido
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const reloadUser = async () => {
    await fetchUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, reloadUser}}>
      {children}
    </AuthContext.Provider>
  );
};

