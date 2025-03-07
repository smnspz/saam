"use client";

import Product from "@/components/product";
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product as ProductType } from "@/types/product";
import Filters from "@/components/filters";
import { useSearchParams } from "next/navigation";

export default function Merch() {
  const params = useSearchParams();
  const category = params.get("category");
  const { data, error, isLoading } = useQuery<ProductType[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  const filtered = useMemo(() => {
    if (category && data) {
      return data.filter((product) =>
        product.categories.some((cat) => cat.slug === category)
      );
    }
    return data;
  }, [data, category]);

  if (error) return <div className="text-xl"></div>;

  return (
    <section>
      <Filters />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 mx-5">
        {filtered?.map((product, index) => (
          <Product product={product} key={index} />
        ))}
      </div>
    </section>
  );
}
