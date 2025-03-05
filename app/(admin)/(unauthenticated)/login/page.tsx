"use client";

import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { geistSans } from "@/app/fonts";
import Spinner from "@/components/ui/spinner";

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div
      className={cn(
        "flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted",
        geistSans.className
      )}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            <Image
              src="/logo.png"
              priority
              className="w-44 h-12"
              width={180}
              height={50}
              alt="logo"
            />
          </a>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-center">Acessar</CardTitle>
              <CardDescription>Área administrativa</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <p className="text-sm text-red-600 text-center">
                  {error.message}
                </p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Senha</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <Separator />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Spinner className="text-white" /> : "Entrar"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
