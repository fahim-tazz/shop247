"use client";
import { useEffect } from "react";
import CategoricalFilter from "./components/CategoricalFilter";
import ProductGrid from "./components/ProductGrid";
import axios from "axios";

import { setProducts } from "@/redux/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux";

export default function Home() {
  const products = useAppSelector((state) => state.products.all);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products.length == 0) {
      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => {
          const prods = response.data;
          // console.log(prods);
          dispatch(setProducts(prods));
        })
        .catch((error) => {
          console.log("Error occured when fetching from FakeStoreAPI:");
          console.log(error);
        });
    }
  });
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
