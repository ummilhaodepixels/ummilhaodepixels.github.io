import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics, MicrosoftClarity } from "@/components/tracking";
import { AuthProvider } from "@/context/auth-context";
import { geistMono, geistSans } from "./fonts";
import QueryClientProvider from "@/providers/client-query.provider";

export const metadata: Metadata = {
  title: "Um Milhão de Pixels",
  description: "A vitrine publicitária mais barata do Brasil 🇧🇷",
  keywords: "Publicidade, Marketing, Branding",
  openGraph: {
    images: "https://ummilhaodepixels.com.br/meta.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="light" lang="pt-BR">
      <GoogleAnalytics />
      <MicrosoftClarity />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
