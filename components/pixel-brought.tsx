import clsx from "clsx";
import { useState } from "react";
import Image from "next/image";

interface PixelBroughtProps {
  name: string;
  link: string;
  logoPath: string;
  headline: string;
  rows?: number;
  columns?: number;
  bg?: string;
}

export default function PixelBrought({
  name,
  link,
  logoPath,
  headline,
  rows = 1,
  columns = 1,
  bg,
}: PixelBroughtProps) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
      style={{
        gridColumn: `span ${columns}`,
        gridRow: `span ${rows}`,
      }}
    >
      <div
        className={clsx(
          "absolute top-6 bg-black border text-white border-slate-50 rounded-sm shadow-lg z-10",
          { block: showTip, hidden: !showTip }
        )}
      >
        <p className="break-keep w-max text-xs font-black p-2">
          {name} | {headline}
        </p>
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div
          className={clsx(bg, "rounded-md")}
          style={{
            width: `${20 * columns}px`,
            height: `${20 * rows}px`,
          }}
        >
          <Image
            src={logoPath}
            alt={headline}
            fill
            className="object-contain rounded-sm"
          />
        </div>
      </a>
    </div>
  );
}
