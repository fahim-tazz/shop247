"use client";
import { useEffect } from "react";
import CategoricalFilter from "./components/CategoricalFilter";
import ProductGrid from "./components/ProductGrid";
import axios from "axios";

import { setError, setProducts } from "@/redux/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  setCategoryFilter,
  setOriginFilter,
  setMinMaxPriceRange,
} from "@/redux/filterSlice";

export default function Home() {
  const products = useAppSelector((state) => state.products.all);
  const errorState = useAppSelector((state) => state.products.error);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!errorState && products.length == 0) {
      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => {
          let prods = response.data;
          // Simulate ratings and country of origin randomly
          prods = prods.map((prod) => {
            const origins = ["China", "Singapore", "Korea", "Hong Kong"];
            const randomOrigin =
              origins[Math.round(Math.random() * (origins.length - 1))];
            const randomRating = (Math.random() * (5 - 3) + 3).toFixed(1);
            return {
              ...prod,
              origin: randomOrigin,
              rating: parseFloat(randomRating),
            };
          });
          console.log(prods);
          dispatch(setProducts(prods));

          const categoryRecord: Record<string, boolean> = {};
          const originRecord: Record<string, boolean> = {};
          let minPrice = 100000;
          let maxPrice = 0;
          for (const product of prods) {
            categoryRecord[product.category] = false;
            originRecord[product.origin] = false;
            minPrice = Math.min(minPrice, product.price);
            maxPrice = Math.max(maxPrice, product.price);
          }

          // Dispatch category filter to Redux
          dispatch(setCategoryFilter(categoryRecord));
          dispatch(setOriginFilter(originRecord));
          dispatch(setMinMaxPriceRange([minPrice, maxPrice]));
        })
        .catch((error) => {
          console.log("Error occured when fetching from FakeStoreAPI:");
          console.log(error);
          dispatch(setError("Could not fetch."));
        });
    }
  }, []);

  return (
    <div className="flex-1 flex flex-row p-0 m-0 border-0 border-blue-800 py-0">
      <div className="flex-1 grid grid-cols-1 auto-rows-min py-2 px-2 border-r-[0px] border-r-gray-300">
        <CategoricalFilter category="Product Category" />
        <CategoricalFilter category="Origin Country" />
      </div>
      <ProductGrid />
    </div>
  );
}
