"use client";

import { useEffect, useRef, useState } from "react";
import { BRANDS } from "@/app/consts";
import Image from "next/image";
import clsx from "clsx";
import Header from "@/components/header";

function PixelBrought({
  name,
  link,
  logo,
  headline,
}: {
  name: string;
  link: string;
  logo: string;
  headline: string;
}) {
  const [showTip, setShowTip] = useState(false);

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div
        className="relative min-w-5 min-h-5 my-auto"
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
      >
        <div
          className={clsx(
            "absolute top-6 bg-black border text-white border-slate-50 rounded-md shadow-lg",
            { block: showTip, hidden: !showTip }
          )}
        >
          <p className="break-keep w-max text-xs font-black p-2">
            {name} | {headline}
          </p>
        </div>
          <Image src={logo} alt={headline} width={20} height={20} />
      </div>
    </a>
  );
}

function PixelEmpty() {
  return (
    <div className="h-5 w-5 bg-slate-200 border-dotted border-2 border-slate-50 rounded-sm" />
  );
}

export default function Home() {
  const [visibleBlocks, setVisibleBlocks] = useState(1); // Blocos visíveis
  const [isLoading, setIsLoading] = useState(false); // Estado de loading
  const containerRef = useRef<HTMLDivElement | null>(null);

  const PIXELS_PER_BLOCK = 10000; // Quantidade de pixels por bloco
  const TOTAL_PIXELS = 1_000_000; // Total de pixels
  const CACHE_KEY = "visible_blocks"; // Chave para armazenar no localStorage
  const MAX_CACHE_BLOCKS = 5; // Número máximo de blocos no cache (200 mil pixels)

  // Recupera o progresso salvo no localStorage ao carregar a página
  useEffect(() => {
    const savedBlocks = localStorage.getItem(CACHE_KEY);
    if (savedBlocks) {
      setVisibleBlocks(Math.min(Number(savedBlocks), MAX_CACHE_BLOCKS)); // Respeita o limite
    }
  }, []);

  // Atualiza o progresso no localStorage sempre que novos blocos forem carregados
  useEffect(() => {
    if (visibleBlocks <= MAX_CACHE_BLOCKS) {
      localStorage.setItem(CACHE_KEY, String(visibleBlocks)); // Salva apenas até o limite
    }
  }, [visibleBlocks]);

  // Detecta se o usuário está no fim da lista para carregar mais blocos
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true); // Ativa o loading
          setTimeout(() => {
            setVisibleBlocks((prev) =>
              Math.min(prev + 1, TOTAL_PIXELS / PIXELS_PER_BLOCK)
            );
            setIsLoading(false); // Desativa o loading
          }, 500); // Simula o tempo de carregamento
        }
      },
      { rootMargin: "100px" }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isLoading]);

  // Renderiza os pixels (com ou sem brand)
  const rows = Array.from({ length: visibleBlocks * PIXELS_PER_BLOCK }, (_, i) => {
    const brand = BRANDS.find((brand) => brand.pixels.includes(i));
    if (brand) {
      return <PixelBrought key={i} {...brand} />;
    } else {
      return <PixelEmpty key={i} />;
    }
  });

  return (
    <main className="mx-5 md:mx-20 mb-10 min-h-screen">
      <Header />
      <div
        className="flex"
        style={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {rows}
      </div>
      {/* Placeholder para carregar mais pixels */}
      <div
        ref={containerRef}
        className="h-10 w-full flex justify-center items-center text-sm font-bold text-gray-500"
      >
        {isLoading && "Carregando..."}
      </div>
    </main>
  );
}
