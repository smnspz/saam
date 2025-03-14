import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/lib/providers/react-query-provider";
import { CartProvider } from "@/lib/providers/cart-provider";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAAM",
  description: "Per ogni caduta una terra amata fuori ora!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${ibmPlexMono.className} antialiased`}>
        <CartProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </CartProvider>
      </body>
    </html>
  );
}
