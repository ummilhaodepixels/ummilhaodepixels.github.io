import Image from "next/image";

export default function IGButton() {
  return (
    <div className="fixed flex flex-wrap-reverse flex-row pl-4 pb-4" style={{bottom: '1px'}}>
      <a
        href="https://instagram.com/ummilhaodepixels"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-slate-900 text-white font-bold text-sm px-4 py-4 w-fit h-fit text-center rounded-full shadow-md hover:bg-slate-700"
      >
        <div className="flex flex-row gap-2 items-center align-middle">
          <Image src="/instagram.webp" alt="instagram" width={16} height={16} />
          <p className="text-xs font-bolder hidden md:block">@ummilhaodepixels</p>
        </div>
      </a>
    </div>
  );
}
