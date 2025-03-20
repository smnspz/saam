import Logo from "@/components/svg/logo";
import Link from "next/link";
import { menuItems } from "@constants/menu";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAAM | Per ogni caduta una terra amata fuori ora",
  description:
    "SAAM is an Italian emo rock band from Genova. Per ogni caduta una terra amata fuori ora! Listen to our latest music and check our tour dates.",
  keywords: [
    "SAAM",
    "Italian band",
    "emo rock",
    "Genova",
    "Liguria",
    "alternative rock",
    "punk",
    "pop punk",
    "indie",
    "Per ogni caduta una terra amata",
    "music",
    "album",
  ],
  openGraph: {
    title: "SAAM | Italian Emo Rock Band | Official Website",
    description:
      "SAAM is an Italian emo rock band from Genova. Listen to our latest music and check our tour dates.",
    url: "https://saam.band",
    siteName: "SAAM Official Website",
    images: [
      {
        url: "https://saam.band/album_cover.jpg",
        width: 1200,
        height: 1200,
        alt: "SAAM album cover - Per ogni caduta una terra amata",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAAM | Italian Emo Rock Band | Official Website",
    description:
      "SAAM is an Italian emo rock band from Genova. Listen to our latest music and check our tour dates.",
    images: ["https://saam.band/album_cover.jpg"],
  },
  alternates: {
    canonical: "https://saam.band",
  },
};

export default function Home() {
  // JSON-LD structured data for the band
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "SAAM",
    url: "https://saam.band",
    image: "https://saam.band/album_cover.jpg",
    genre: ["Emo", "Rock", "Punk", "Indie"],
    sameAs: [
      "https://instagram.com/saam_band",
      "https://open.spotify.com/artist/6TbR7LOXKCLxeuxf9MI2wa?si=d-1oiqXMRKOqAGEl4NeJhg",
    ],
    album: {
      "@type": "MusicAlbum",
      name: "Per ogni caduta una terra amata",
      datePublished: "2024",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="fixed inset-0 overflow-hidden">
        <div className="w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-[url(/album_cover.jpg)] bg-cover bg-top blur-sm"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="flex flex-col items-center justify-center h-full">
            <Logo
              className="z-10 w-35 mt-auto animate-fade-in"
              color="#ffffff"
            />
            <h2 className="z-10 text-white font-bold text-5xl tracking-[0.15em] text-center my-7 animate-fade-in-top">
              PER OGNI
              <br />
              CADUTA
              <br />
              UNA TERRA
              <br />
              AMATA
              <br />
            </h2>
            <h1 className="z-10 text-white font-bold text-4xl text-center animate-fade-in-top-delayed">
              FUORI ORA
            </h1>
            <ul className="z-10 flex flex-row space-x-8 mt-auto mb-8">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="text-white text-xl font-bold underline underline-offset-4 cursor-pointer"
                >
                  <Link href={item.url}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
