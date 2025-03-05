import sharp from "sharp";
import fs from "node:fs";

const BRANDS = [
  {
    name: "Elevatte",
    logo: "/brands/elevatte/resized.webp",
    headline: "Você no controle da sua carreira",
    link: "https://elevatte.me?utm_source=ummilhaodepixels&utm_campaign=ummilhaodepixels",
    pixel: 0,
  },
  {
    name: "Ki Frango",
    logo: "/brands/kifrango/resized.webp",
    headline: "Coma mais frango",
    link: "https://www.instagram.com/galeteriakifrango/",
    pixel: 1,
  },
  {
    name: "DVSTT",
    logo: "/brands/dvstt/resized.webp",
    headline: "DJ & Produtor",
    link: "https://instagram.com/dvsttoficial/",
    pixel: 2,
  },
  {
    name: "Oly",
    logo: "/brands/oly/resized.webp",
    headline: "Feita para a deusa que habita em você 🪽",
    link: "https://www.instagram.com/oly.modaintima/",
    pixel: 3,
  },
  {
    name: "Neograde",
    logo: "/brands/neograde/resized.webp",
    headline: "Sites, E-commerces e Aplicativos",
    link: "https://www.instagram.com/neograde.tech/",
    pixel: 4,
  },
  {
    name: "Cabana criativa",
    logo: "/brands/cabana-criativa/resized.webp",
    headline: "Presentear é dar forma ao amor",
    link: "https://www.instagram.com/cabana_criativa/",
    pixel: 5,
  },
  {
    name: "Croc Artesanato",
    logo: "/brands/croc/resized.webp",
    headline:
      "Artesanato em crochê, feitos por encomenda e algumas coisinhas a pronta entrega 🥰",
    link: "https://www.instagram.com/croc.artesanato/",
    pixel: 6,
  },
  {
    name: "VIRALATA PRODUÇÕES",
    logo: "/brands/viralata-prod/resized.webp",
    headline: "🐶 festa de música eletrônica diferenciada 🐶",
    link: "https://www.instagram.com/viralataprod/",
    pixel: 7,
  },
  {
    name: "viniREMELA",
    logo: "/brands/viniremela/resized.webp",
    headline: "o astro do momento",
    link: "https://www.instagram.com/viniremela/",
    pixel: 8,
  },
  {
    name: "Mimo",
    logo: "/brands/mimo/resized.webp",
    headline:
      "⚠️ este gato não está à venda, apenas para fins de apreciação de sua beleza!",
    link: "https://www.instagram.com/belotibordado/",
    pixel: 9,
  },
  {
    name: "belo(ti)bordado",
    logo: "/brands/belotibordado/resized.webp",
    headline:
      "dou vida em linha e bordado para personagens geek e outras coisas ;p",
    link: "https://www.instagram.com/belotibordado/",
    pixel: 10,
  },
  {
    name: "EgoBrain",
    logo: "/brands/egobrain/resized.webp",
    headline:
      "11/01/25, Galpão do Rock, Insurgents motoclube - Rua Maria Naymaier, 4985",
    link: "https://www.sympla.com.br/evento/rock-paulera-o-lado-troo-da-vida/2777795?share_id=whatsapp",
    pixel: 11,
  },
  {
    name: "Gaudério News",
    logo: "/brands/gauderionews/resized.webp",
    headline: "Notícias do Noroeste Gaúcho",
    link: "https://gauderionews.com.br/",
    pixel: 12,
  },
  {
    name: "Madeirão",
    logo: "/brands/madeirao/resized.webp",
    headline: "Informação é com a gente!",
    link: "https://madeiraoweb.com.br/",
    pixel: 13,
  },
  {
    name: "O Bandeirante",
    logo: "/brands/bandeirante/resized.webp",
    headline: "Jornal do distrito de União Bandeirantes, Porto Velho, Rondônia",
    link: "https://obandeirantenews.com.br",
    pixel: 14,
  },
  {
    name: "BH Ao Vivo",
    logo: "/brands/bhaovivo/resized.webp",
    headline: "Seu resumo diário de notícias",
    link: "https://bhaovivo.com.br/",
    pixel: 15,
  },
  {
    name: "Centro de Treinamento Instituo Maria Auxiliadora (CT IMA)",
    logo: "/brands/ctima/resized.webp",
    headline: "Esporte & qualidade de vida",
    link: "https://www.instagram.com/ct.imapvh?igsh=MWpjZjFoMW9iN2wyZg==",
    pixel: 16,
  },
  {
    name: "Central F.C.",
    logo: "/brands/centralfc/resized.webp",
    headline: "Central Desportivo: Amantes do esporte",
    link: "https://www.instagram.com/central.fc.pvh?igsh=bGg0Z3p3a3V6em9k",
    pixel: 17,
  },
  {
    name: "Eco+",
    logo: "/brands/eco/resized.webp",
    headline: "Soluções Ambientais",
    link: "http://wa.me/5569984483035",
    pixel: 18,
  },
  {
    name: "Luar Espaço Infantil",
    logo: "/brands/luarespacoinfantil/resized.webp",
    headline: "Terapia Ocupacional",
    link: "https://www.instagram.com/luar.espacoinfantil?igsh=MWNlb2F3eWFmdTk0cA==",
    pixel: 19,
  },
  {
    name: "DL Consultoria & Consórcios",
    logo: "/brands/dlconsultoria/resized.webp",
    headline: "Promotora de créditos",
    link: "https://www.instagram.com/dlconsultoriaoficial?igsh=MWZybzdmY3JtZTRzYg%3D%3D&utm_source=qr",
    pixel: 20,
  },
  {
    name: "itsabiker",
    logo: "/brands/itsabiker/resized.webp",
    headline: "Ex-sedentario, computeiro, nortista e ciclista entusiasta",
    link: "https://www.youtube.com/@itsabiker",
    pixel: 21,
  },
  {
    name: "Marcelo Régis | In Foco",
    logo: "/brands/marceloregis/resized.webp",
    headline: "Ininterrupto, desde 1999.",
    link: "https://www.instagram.com/marceloregisoficial/",
    pixel: 22,
  },
  {
    name: "Desapego da Gia",
    logo: "/brands/desapegodagia/resized.webp",
    headline: "Brechó & Outlet em Porto Velho, Rondônia",
    link: "https://www.instagram.com/desapego_da_gia",
    pixel: 23,
  },
  {
    name: "Volpi Café",
    logo: "/brands/volpicafe/resized.webp",
    headline: "Forte no sabor, suave no rolê ☕😎",
    link: "https://www.instagram.com/volpi.cafe",
    pixel: 24,
    rows: 2,
    columns: 5,
  },
  {
    name: "Jorge Mallet da elevatte",
    logo: "/brands/jorgemallet/resized.webp",
    headline:
      "Ensino profissionais de tecnologia a conquistarem cargos estratégicos com salários de R$ 25k+ em até 60 dias",
    link: "https://elevatte.me/mentoria/?utm_source=instagram&utm_medium=social&utm_campaign=ummilhaodepixels",
    pixel: 25,
  },
  {
    name: "Prof. Brilhante",
    logo: "/brands/profbrilhante/resized.webp",
    headline: "Desde 2013 ajudando alunos a desmistificarem as exatas",
    link: "https://api.whatsapp.com/send/?phone=%2B5569981147878&text&type=phone_number&app_absent=0&wame_ctl=1",
    pixel: 26,
  },
  {
    name: "tatuagensdofecchio",
    logo: "/brands/tatuagensdofecchio/resized.webp",
    headline: "Blackwork Autoral",
    link: "https://linktr.ee/fecchio",
    pixel: 27,
  },
  {
    name: "Zoghbi Imóveis",
    logo: "/brands/zoghbi/resized.webp",
    headline: "🤩 Há 20 anos cuidando do seu patrimônio",
    link: "https://www.instagram.com/zoghbiimoveis/",
    pixel: 28,
  },
  {
    name: "Ricci Burger's",
    logo: "/brands/ricciburgers/resized.webp",
    headline: "Artesanal Food 🍔",
    link: "https://www.instagram.com/ricci_burgers/",
    pixel: 29,
    rows: 10,
    columns: 10,
  },
  {
    name: "AL",
    logo: "/brands/al/resized.webp",
    headline: "Escola de basquete",
    link: "https://www.instagram.com/al._basquete?igsh=MWd5cmZheG9kdnRqYg==",
    pixel: 30,
  },
  {
    name: "DJ Alan Luck",
    logo: "/brands/djalanluck/resized.webp",
    headline: "DJ Profissional & Produtor de Eventos 🔈🎶🎧",
    link: "https://www.instagram.com/djalanluck",
    pixel: 31,
    rows: 2,
    columns: 5,
    bg: "bg-black",
  },
  {
    name: "Amanda & Gustavo",
    logo: "/brands/amandagustavo/resized.webp",
    headline: "Yoga Surf 🧘🏻🏄🏼",
    link: "https://www.instagram.com/volpi.cafe",
    pixel: 32,
  },
  {
    name: "shininja96",
    logo: "/brands/shininja96/resized.webp",
    headline: "Streamer",
    link: "https://twitch.tv/shininja96",
    pixel: 33,
    rows: 3,
    columns: 3,
  },
  {
    name: "Construtora Martins",
    logo: "/brands/construtoramartins/resized.png",
    headline: "Pilares de confiança em cada projeto!",
    link: "https://www.instagram.com/martins_const?igsh=a3JrM2V3OWZ4Z2g1",
    pixel: 34,
  },
  {
    name: "New Jungle Wave VI",
    logo: "/brands/newjunglewave5/resized.jpg",
    headline: "Evento musical em Porto Velho, RO",
    link: "https://www.instagram.com/newjunglewave",
    pixel: 35,
  },
  {
    name: "MP",
    logo: "/brands/mp/resized.jpeg",
    headline: "Identidade, concepção, arquitetura interiores",
    link: "https://www.instagram.com/mariabarros.arquitetura/",
    pixel: 36,
    rows: 4,
    columns: 4,
  },
  {
    name: "BREEZE FOOD 🌿",
    logo: "/brands/breezefood/resized.jpeg",
    headline: "Identidade, concepção, arquitetura interiores",
    link: "https://www.instagram.com/breeze.food/",
    pixel: 37,
    rows: 4,
    columns: 4,
  },
  {
    name: "Adria & José | Renda Nas Ruas💰",
    logo: "/brands/adriajose/resized.jpg",
    headline: "💥Fazemos das ruas nossa liberdade financeira💰",
    link: "https://kiwify.app/Tnvfm7v",
    pixel: 38,
    rows: 4,
    columns: 3,
  },
  {
    name: "Indrig Caroline | Vendedora Ambulante 🚀",
    logo: "/brands/vendedoraaambulantee/resized.png",
    headline: "Jovem, alguns doces e um sonho",
    link: "https://www.instagram.com/vendedoraambulantee/",
    pixel: 39,
  },
  {
    name: "Indrig Kelly | Sagrada Salada",
    logo: "/brands/saladasagrada/resized.png",
    headline: "🍉 Frutas frescas selecionadas com amor",
    link: "https://www.instagram.com/sagradasalada.ofc",
    pixel: 40,
  },
  {
    name: "Banda Neymos",
    logo: "/brands/bandaneymos/resized.png",
    headline: "18/01 , Shelter, Porto Velho RO",
    link: "https://instagram.com/bandaneymos",
    pixel: 41,
  },
  {
    name: "Mimo PVH",
    logo: "/brands/mimopvh/resized.jpeg",
    headline:
      "Personalizamos lindos mimos para você encantar os seus clientes.",
    link: "https://instagram.com/mimo_pvh",
    pixel: 42,
    rows: 2,
    columns: 5,
    bg: "bg-[#FF9554]",
  },
];

function convertAndResize({
  source,
  destination,
  outputFormat = "webp",
  resize,
}: {
  source: string;
  destination: string;
  outputFormat?: "webp" | "png";
  resize: {
    width: number;
    height: number;
  };
}) {
  return sharp(source)
    .resize({
      width: resize.width,
      height: resize.height,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFormat(outputFormat, { quality: 100 })
    .toFile(destination);
}

fs.readdirSync("./uploads/brands").forEach((brandSlug) => {
  fs.readdirSync(`./uploads/brands/${brandSlug}`).forEach(async (imageName) => {
    if (!fs.existsSync(`./public/brands/${brandSlug}`)) {
      fs.mkdirSync(`./public/brands/${brandSlug}`, { recursive: true });
    }

    const brand = BRANDS.find((brand) => brand.logo.includes(brandSlug));

    if (!brand) {
      throw new Error("Brand not found: " + brandSlug);
    }

    await convertAndResize({
      source: `./uploads/brands/${brandSlug}/${imageName}`,
      resize: {
        width: (brand?.columns ?? 1) * 60,
        height: (brand?.rows ?? 1) * 60,
      },
      destination: `./public/brands/${brandSlug}/resized.webp`,
    });
  });
});
