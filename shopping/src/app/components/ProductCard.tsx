"use client";
import React from "react";
import type { Product } from "../types/product";
import Image from "next/image";

import { useRouter } from "next/navigation";

// Dummy image
import iphoneImage from "@/assets/iphone.png";

import ReviewStarIcon from "@/assets/star.svg";

type Props = {
  product: Product;
};
export default function ProductCard({ product }: Props) {
  const router = useRouter();

  return (
    <div
      className="w-[180px] border-[1px] border-gray-300 rounded-[2px] flex flex-col justify-between items-center gap-0 bg-white cursor-pointer hover:border-[3px] hover:border-orange-600 p-[2px] hover:p-[0px] transition-colors duration-200 active:scale-99"
      onClick={() => router.push("/products/{id}")}
    >
      <Image
        className="border-0 border-pink-500"
        src={iphoneImage}
        width={180}
        // height={100}
        alt="Product image"
      />
      <div className="text-sm border-0 border-pink-500 w-full px-2 h-md overflow-hidden text-ellipsis line-clamp-2">
        {product.name}
      </div>
      <div className="text-lg border-0 border-pink-500 w-full px-2 font-semibold">
        ${product.price}
      </div>
      <div className="border-0 border-blue-500 flex flex-row justify-between w-full p-2 text-gray-500">
        <div className="text-xs border-0 border-pink-500">Singapore</div>
        <div className="text-xs border-0 border-pink-500 flex flex-row items-center p-0 gap-[2px]">
          4.8
          <ReviewStarIcon className="h-[10px] text-yellow-500" />
        </div>
      </div>
    </div>
  );
}
