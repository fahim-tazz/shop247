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
        const priceMatch =
          product.price >= priceRange[0] && product.price <= priceRange[1];

        return categoryMatch && originMatch && priceMatch;
      })
    );

    console.log("Filtered products:", filteredProducts);
  }, [products, filters]);

  const isEmptyList = filteredProducts.length == 0;
  return (
    <div className="flex-[5] grid [grid-template-columns:repeat(auto-fill,_minmax(10rem,_1fr))] auto-rows-[15rem] gap-y-4 pl-4 pr-0 py-4 ">
      {/* Loading state while fetching */}
      {loadingState && (
        <>Loading</> //TODO: Style this
      )}
      {/* Fetched, no products found: */}
      {!loadingState && isEmptyList && <>No products found</>}

      {/* Fetched, products found: */}
      {!loadingState &&
        !isEmptyList &&
        filteredProducts
          .slice(0, -1)
          .map((prod) => <ProductCard key={prod.id} product={prod} />)}
    </div>
  );
}
