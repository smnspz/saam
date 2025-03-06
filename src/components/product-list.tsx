"use server";

import { Product as IProduct } from "@/types/product";
import Product from "./product";

const ProductsList = async () => {
  const res = await fetch(`${process.env.BASE_URL}/wp-json/wc/v3/products`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
      ).toString("base64")}`,
    },
  });
  const products: IProduct[] = await res.json();

  console.log(products);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 mx-5">
      {products.map((product, index) => (
        <Product product={product} key={index} />
      ))}
    </div>
  );
};

export default ProductsList;
