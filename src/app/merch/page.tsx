import React, { Suspense, useMemo } from "react";
import { wooCommerceClient } from "@/lib/woocommerce";
import MerchContent from "./components/merch-content";

export default async function Merch() {
  const products = await wooCommerceClient.getProducts();

  return (
    <section>
      <Suspense>
        <MerchContent products={products} />
      </Suspense>
    </section>
  );
}
