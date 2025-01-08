import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, MicrosoftClarity } from "@/components/tracking";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Um Milhão de Pixels",
  description: "A vitrine publicitária mais barata do Brasil 🇧🇷",
  keywords: "Publicidade, Marketing, Branding",
  openGraph: {
    images: 'https://ummilhaodepixels.com.br/meta.png'
  }
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
        {children}
      </body>
    </html>
  );
}
