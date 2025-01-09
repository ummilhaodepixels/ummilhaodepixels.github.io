"use client";

import Header from "@/components/header";
import PixelGrid from "@/components/pixel-grid";

export default function Home() {
  return (
    <main className="mx-5 md:mx-20 mb-10 min-h-screen">
      <Header />
      <PixelGrid />
    </main>
  );
}
