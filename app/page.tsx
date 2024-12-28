import { BRANDS } from "@/app/consts"
import Image from "next/image"

function PixelBrought({ link, logo, headline }: { link: string, logo: string, headline: string }) {
  return (
    <div>
      <a href={link} target="_blank">
        <Image src={logo} alt={headline} width={20} height={20}/>
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

  const rows = Array.from(Array(1000000).keys()).map((row, rowIndex) => {
    const brand = BRANDS.find(coItem => coItem.pixels.includes(row))
      if (brand) {
        return <PixelBrought key={rowIndex} {...brand} />
      } else {
        return <PixelEmpty key={rowIndex} />
      }
  })

  return (
    <main className="mx-5 md:mx-20 mb-10 min-h-screen">
      <header className="flex flex-row justify-between py-10 items-center">
        <div>
          <Image src="logo.png" width={200} height={100} alt="um milhão de pixels"/>
        </div>
        <div className="text-center">
          <h1 className="text-lg font-bold text-slate-800 uppercase">
            A vitrine publicitária mais barata do Brasil 🇧🇷
          </h1>
          <h2 className="text-sm font-thin">
            Anuncie sua marca por apenas R$ 1 💰
          </h2>
        </div>
        <div>
          <a href="/tst" className="bg-slate-900 text-white font-bold text-sm px-6 py-4 rounded-lg shadow-md hover:bg-slate-700">
            Quero Anunciar
          </a>
        </div>
      </header>
      <div className="flex gap-2" style={{flexWrap: "wrap"}}>
        {rows}
      </div>
    </main>
  );
}
