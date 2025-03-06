"use server";

import Header from "@/components/header";
import Marquee from "@/components/marquee";

export default async function MerchLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className="h-10">
          <Marquee
            text="25% OFF on all merchandise with code SAAMPUSSY"
            speed={0.8}
          />
        </div>
        <Header />
        {children}
      </body>
    </html>
  );
}
