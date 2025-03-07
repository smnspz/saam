"use client";

import { Category } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { useRouter, useSearchParams } from "next/navigation";

interface Filter {
  category: Category;
  isSelected: boolean;
}

export default function Filters() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const searchParams = useSearchParams();

  const { data, error, isLoading } = useQuery<Category[]>({
    queryKey: ["category"],
    queryFn: async () => {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (data) {
      const currentCategory = searchParams.get("category");
      setFilters(
        data.map((category) => ({
          category,
          isSelected: category.slug === currentCategory,
        }))
      );
    }
  }, [data, searchParams]);

  const router = useRouter();

  const setFilter = (filter: Filter) => {
    const updatedFilters = filters.map((f) =>
      f.category.id === filter.category.id
        ? { ...f, isSelected: !f.isSelected }
        : { ...f, isSelected: false }
    );

    setFilters(updatedFilters);

    const toggledFilter = updatedFilters.find(
      (f) => f.category.id === filter.category.id
    );

    if (toggledFilter && toggledFilter.isSelected) {
      router.push(`?category=${toggledFilter.category.slug}`);
    } else {
      router.push("/merch");
    }
  };

  return (
    <div className="w-screen flex flex-wrap justify-center px-2 my-4 sm:my-2">
      {filters?.map((filter) => (
        <Badge
          key={filter.category.id}
          onClick={() => setFilter(filter)}
          className={
            "mr-2 px-2 py-1 cursor-pointer transition " +
            `${
              filter.isSelected
                ? "bg-blue-700"
                : "bg-blue-700/60 hover:bg-blue-700"
            }`
          }
        >
          {filter.category.name}
        </Badge>
      ))}
    </div>
  );
}
