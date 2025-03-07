"use server";

import Header from "@/components/header";
import Marquee from "@/components/marquee";
import { getQueryClient } from "@/lib/query";
import { wooCommerceClient } from "@/lib/woocommerce";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function MerchLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => wooCommerceClient.getProducts(),
  });
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
        <HydrationBoundary>{children}</HydrationBoundary>
      </body>
    </html>
  );
}
