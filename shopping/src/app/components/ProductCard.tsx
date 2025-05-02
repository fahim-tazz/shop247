"use client";
import React from "react";
import type { Product } from "../types/product";
import Image from "next/image";

import { useRouter } from "next/navigation";

import ReviewStarIcon from "@/assets/star.svg";

type Props = {
  product: Product;
};
export default function ProductCard({ product }: Props) {
  const router = useRouter();

  return (
    <div
      className="w-[180px] border-[1px] border-gray-300 rounded-[2px] flex flex-col justify-between items-center gap-0 bg-white cursor-pointer hover:border-[3px] hover:border-orange-600 p-[2px] hover:p-[0px] transition-colors duration-200 active:scale-99"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <div className="relative w-[180px] h-[140px]">
        <Image
          src={product.image}
          alt="Product image"
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="text-sm w-full px-2 h-[2.5rem] overflow-hidden text-ellipsis line-clamp-2 font-medium text-gray-600">
        {product.title}
      </div>
      <div className="text-lg w-full px-2 pt-1 font-bold text-gray-800">
        ${product.price.toFixed(2)}
      </div>
      <div className="border-0 border-blue-500 flex flex-row justify-between w-full px-2 pb-2 text-gray-500 font-light">
        <div className="text-xs ">{product.origin}</div>
        <div className="text-xs  flex flex-row items-center p-0 gap-[2px]">
          {product.rating.toFixed(1)}
          <ReviewStarIcon className="h-[10px] text-yellow-500" />
        </div>
      </div>
    </div>
  );
}
