"use server";

import { Product as IProduct } from "@/types/product";
import Product from "@/components/product";
import { wooCommerceClient } from "@/lib/woocommerce";

export default async function Merch() {
  const products: IProduct[] = await wooCommerceClient.getProducts();

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 mx-5">
      {products.map((product, index) => (
        <Product product={product} key={index} />
      ))}
    </section>
  );
}
