"use client";

import { Product as ProductType } from "@/types/product";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Filters from "./filters";
import ProductCard from "./product-card";

export default function MerchContent({
  products,
}: {
  products: ProductType[];
}) {
  const params = useSearchParams();
  const category = params.get("category");

  const categories = products.map((product) => {
    return product.categories[0]; // each product might have multiple categories?
  });

  const filtered = useMemo(() => {
    if (category && products) {
      return products.filter((product) =>
        product.categories.some((cat) => cat.slug === category)
      );
    }
    return products;
  }, [products, category]);

  return (
    <>
      <Filters categories={categories} />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 mx-5">
        {filtered?.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </>
  );
}
