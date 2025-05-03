import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/product";
import { useAppSelector } from "@/redux";

type Props = {};

export default function ProductGrid({}: Props) {
  const products = useAppSelector((state) => state.products.all);
  const loadingState = useAppSelector((state) => state.products.loading);
  const filters = useAppSelector((state) => state.filters);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const lastSearchQuery = useAppSelector(
    (state) => state.filters.lastSearchQuery
  );

  useEffect(() => {
    const categoryFilter = filters.category;
    const originFilter = filters.origin;
    const priceRange = filters.chosenPriceRange;

    const isCategoryFilterActive = Object.values(categoryFilter).some((v) => v);
    const isOriginFilterActive = Object.values(originFilter).some((v) => v);

    setFilteredProducts(
      products.filter((product) => {
        const categoryMatch =
          !isCategoryFilterActive || categoryFilter[product.category];
        const originMatch =
          !isOriginFilterActive || originFilter[product.origin];

        const searchMatch =
          lastSearchQuery && lastSearchQuery.length > 0
            ? product.title
                .toLowerCase()
                .includes(lastSearchQuery.toLowerCase()) ||
              product.description
                .toLowerCase()
                .includes(lastSearchQuery.toLowerCase())
            : true;
        return categoryMatch && originMatch && searchMatch;
      })
    );
  }, [products, filters]);

  const isEmptyList = filteredProducts.length == 0;
  console.log(filteredProducts);
  return (
    <div className="flex-[5] grid [grid-template-columns:repeat(auto-fill,_minmax(10rem,_1fr))] auto-rows-[15rem] gap-y-4 pl-4 pr-0 py-4 ">
      {/* Loading state while fetching */}
      {loadingState && (
        <div className="text-center w-full text-gray-500 py-6 text-lg">
          Loading...
        </div>
      )}
      {/* Fetched, no products found: */}
      {!loadingState && isEmptyList && (
        <div className="text-center text-lg w-full text-gray-500 py-6">
          No products found
        </div>
      )}

      {/* Fetched, products found: */}
      {!loadingState &&
        !isEmptyList &&
        filteredProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
    </div>
  );
}
