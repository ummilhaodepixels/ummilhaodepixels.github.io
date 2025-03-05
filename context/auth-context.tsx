"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  email: string;
  name: string;
};

type AuthError = {
  message: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: null | { message: string };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: { exp: number; email: string } = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          alert("deslogando por expiração...");
          logout();
        } else {
          setUser({ id: 1, email: decoded.email, name: "Admin" });
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);

        alert("deslogando por erro...");
        logout();
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://api-fc6m.onrender.com/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(
          res.status == 401
            ? "Credenciais inválidas"
            : "Falha ao conectar. Tente novamente mais tarde."
        );
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setUser(data.user);

      router.push("/dashboard");
    } catch (error) {
      setError({ message: (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
