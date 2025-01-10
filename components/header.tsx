import Image from "next/image";

export default function Header() {
  return (
    <header className="flex flex-col gap-10 md:gap-0 md:flex-row mx-auto justify-between py-10 items-center">
      <div>
        <Image src="/logo.png" width={200} height={100} alt="um milhão de pixels" />
      </div>
      <div className="text-center">
        <h1 className="text-lg font-bold text-slate-800 uppercase">
          A vitrine publicitária mais barata do Brasil 🇧🇷
        </h1>
        <h2 className="text-sm font-thin">
          Divulgue sua marca por apenas R$ 1 💰
        </h2>
      </div>
      <a
        href="https://wa.me/5521988793123?text=Quero anunciar no ummilhaodepixels.com.br"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-slate-900 text-white font-bold text-sm px-6 py-4 w-full text-center md:w-48 rounded-lg shadow-md hover:bg-slate-700"
      >
        Quero Divulgar 📢
      </a>
    </header>
  );
}
