import Image from "next/image";
import Logo from "@/svg/logo"
import Link from "next/link";
import { menuItems } from "@/constants/menu"


export default async function Home() {

  return (
    <main>
      <div className="relative w-screen h-screen overflow-hidden bg-white">
        <Image src={"/album_cover.jpg"} alt={"album cover"} objectFit="cover" layout="fill" className="object-cover object-right-top opacity-80 blur-xs" />
        <div className="flex flex-col items-center justify-center h-full">
          <Logo className="z-10 w-35" color="#ffffff" />
          <h2 className="z-10 text-white font-bold text-5xl tracking-[0.22em] text-center my-7">
            PER OGNI<br />
            CADUTA<br />
            UNA TERRA<br />
            AMATA<br />
          </h2>
          <h1 className="z-10 text-white font-bold text-4xl text-center">FUORI ORA</h1>
          <div className="z-10 absolute bottom-8">
            <ul className="flex flex-row space-x-8">
              {menuItems.map((item, index) =>
                <li key={index} className="text-white text-xl font-bold underline underline-offset-4 cursor-pointer">
                  <Link href={item.url}>{item.name}</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
