"use client"

import { BRANDS } from "@/app/consts"
import clsx from "clsx"
import Image from "next/image"
import { useState } from "react"

function PixelBrought({ name, link, logo, headline }: { name:string, link: string, logo: string, headline: string }) {
  const [showTip, setShowTip] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <div
        className={clsx(
          "absolute top-6 bg-black border text-white border-slate-300 rounded-md shadow-lg",
          { block: showTip, hidden: !showTip }
        )}
      >
        <p className="break-keep w-max text-xs font-black p-2">
          {name} | {headline}
        </p>
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Image src={logo} alt={headline} width={20} height={20} />
      </a>
    </div>
  )
}

function PixelEmpty() {
  return (
    <div className="h-5 w-5 bg-slate-200 border-dotted border-2 border-slate-300 rounded-sm" />
  )
}

export default function Home() {

  const rows = Array.from(Array(10000).keys()).map((row, rowIndex) => {
    const brand = BRANDS.find(coItem => coItem.pixels.includes(row))
      if (brand) {
        return <PixelBrought key={rowIndex} {...brand} />
      } else {
        return <PixelEmpty key={rowIndex} />
      }
  })

  return (
    <main className="mx-5 md:mx-20 mb-10 min-h-screen">
      <header className="flex flex-col gap-10 md:gap-0 md:flex-row mx-auto justify-between py-10 items-center">
        <div>
          <Image src="logo.png" width={200} height={100} alt="um milhão de pixels"/>
        </div>
        <div className="text-center">
          <div className="flex gap-2 items-center">
            <h1 className="text-lg font-bold text-slate-800 uppercase">
              A vitrine publicitária mais barata do Brasil
            </h1>
            <Image src="flagbr.png" width={25} height={15} alt="Brasil" />
          </div>
          <h2 className="text-sm font-thin">
            Anuncie sua marca por apenas R$ 1 💰
          </h2>
        </div>
        <a 
          href="http://wa.me/5521988793123?text=Quero anunciar no ummilhaodepixels.com.br" 
          target="_blank" 
          className="bg-slate-900 text-white font-bold text-sm px-6 py-4 w-full text-center md:w-48 rounded-lg shadow-md hover:bg-slate-700"
        >
          Quero Anunciar
        </a>
      </header>
      <div className="flex flex-wrap gap-2 mx-auto" >
        {rows}
      </div>
    </main>
  );
}
