import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/product";
import { useAppSelector } from "@/redux";

type Props = {};

export default function ProductGrid({}: Props) {
  const products = useAppSelector((state) => state.products.all);
  const loadingState = useAppSelector((state) => state.products.loading);

  // const p1: Product = {
  //   name: "Iphone 14 Pro ",
  //   // name: "Iphone 14 Pro Iphone 14 Pro Iphone 14 Pro Iphone 14 Pro",
  //   description: "Latest iphone by apple.",
  //   id: 0,
  //   price: 1400,
  //   image: "An image of iphone",
  // };
  // const p2: Product = {
  //   // name: "Iphone 14 Pro ",
  //   name: "Iphone 14 Pro Iphone 14 Pro Iphone 14 Pro Iphone 14 Pro",
  //   description: "Latest iphone by apple.",
  //   id: 0,
  //   price: 1400,
  //   image: "An image of iphone",
  // };

  console.log("Products found by productgrid:" + products);
  console.log(products);
  return (
    <div className="flex-[5] grid [grid-template-columns:repeat(auto-fill,_minmax(180px,_1fr))] auto-rows-[280px] gap-y-4 pl-4 pr-0 py-4 border-0 border-red-700">
      {loadingState ? (
        <>Loading</> //TODO: Style this
      ) : (
        products.map((prod) => <ProductCard key={prod.id} product={prod} />)
      )}
      {/* // <>
        <ProductCard product={p1}></ProductCard>
<ProductCard product={p1}></ProductCard>
<ProductCard product={p1}></ProductCard>
   <ProductCard product={p2}></ProductCard>
<ProductCard product={p1}></ProductCard>
   <ProductCard product={p1}></ProductCard>
 </> */}
    </div>
  );
}
