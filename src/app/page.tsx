import Logo from "@/components/svg/logo";
import Link from "next/link";
import { menuItems } from "@constants/menu";

export default function Home() {
  return (
    <main className="fixed inset-0 overflow-hidden">
      <div className="w-full h-full overflow-hidden">
        <div className="absolute inset-0 bg-[url(/album_cover.jpg)] bg-cover bg-top blur-sm"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="flex flex-col items-center justify-center h-full">
          <Logo className="z-10 w-35 mt-auto animate-fade-in" color="#ffffff" />
          <h2 className="z-10 text-white font-bold text-5xl tracking-[0.22em] text-center my-7">
            PER OGNI
            <br />
            CADUTA
            <br />
            UNA TERRA
            <br />
            AMATA
            <br />
          </h2>
          <h1 className="z-10 text-white font-bold text-4xl text-center">
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
  );
}
