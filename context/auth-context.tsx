"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type User = {
  id: number;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 401) {
        return { success: false, message: "Credenciais inválidas" };
      }

      if (!res.ok) {
        return { success: false, message: "Falha ao conectar. Tente novamente mais tarde." };
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      console.error("Erro no login:", error);
      return { success: false, message: "Erro inesperado. Tente novamente." };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: { exp: number; email: string } = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({ id: 1, email: decoded.email, name: "Admin" });
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        logout();
      }
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
