import { useEffect, useRef, useState } from "react";
import { BRANDS } from "@/app/consts";
import PixelBrought from "./pixel-brought";
import PixelEmpty from "./pixel-empty";

export default function PixelGrid() {
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
  const rows = Array.from(
    { length: visibleBlocks * PIXELS_PER_BLOCK },
    (_, i) => {
      const brand = BRANDS.find((brand) => brand.pixel === i);
      if (brand) {
        return (
          <PixelBrought
            key={i}
            {...brand}
            rows={brand.rows ?? 1}
            columns={brand.columns ?? 1}
          />
        );
      } else {
        return <PixelEmpty key={i} />;
      }
    }
  );

  return (
    <>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(20px, 1fr))",
          gridAutoRows: "20px",
          gap: 0,
        }}
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
    </>
  );
}
