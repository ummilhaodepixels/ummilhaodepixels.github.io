"use client";

import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Redirecionando para o login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Bem-vindo(a)!
        </h1>
        <p className="text-lg text-gray-700 text-center">
          Olá, <span className="font-semibold text-blue-600">{user?.email}</span>.
        </p>
        <div className="flex justify-center">
          <button
            onClick={logout}
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
