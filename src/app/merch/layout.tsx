import Header from "@/components/header";
import Marquee from "@/components/marquee";
import CartSheet from "@/app/merch/components/cart-sheet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAAM MERCH",
  description: "Musica e merchandise",
};

export default function MerchLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="h-10">
        <Marquee text="25% OFF on all merchandise with code SAAM" speed={0.8} />
      </div>
      <Header />
      {children}
      <CartSheet />
    </>
  );
}
