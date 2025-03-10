import Header from "@/components/header";
import Marquee from "@/components/marquee";

export default function MerchLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className="h-10">
          <Marquee
            text="25% OFF on all merchandise with code SAAM"
            speed={0.8}
          />
        </div>
        <Header />
        {children}
      </body>
    </html>
  );
}
