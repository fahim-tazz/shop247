import React from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux";
import { updateQuantity } from "@/redux/cartSlice";

type Props = {
  productId: number;
};

export default function CartProductCard({ productId }: Props) {
  const cartEntry = useAppSelector((state) => state.cart.products[productId]);
  const product = cartEntry.product;
  const quantity = cartEntry.quantity;

  const dispatch = useAppDispatch();

  const handleChangeQuantity = (delta: number) => {
    dispatch(
      updateQuantity({ id: productId, quantity: Math.max(quantity + delta, 0) })
    );
  };
  return (
    <div className="flex items-center justify-between p-4 border-0 rounded bg-white gap-4">
      {/* Left: Image */}
      <div className="w-16 h-16 relative rounded overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      {/* Middle: Title and Price */}
      <div className="flex-1 px-2">
        <h3 className="text-md font-medium line-clamp-2">{product.title}</h3>
        <p className="text-sm text-gray-500 font-semibold">
          ${product.price.toFixed(2)}
        </p>
      </div>

      {/* Right: Quantity Controls */}
      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
        <button
          className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 active:text-xs transition-all duration-150"
          onClick={() => handleChangeQuantity(-1)}
        >
          -
        </button>
        <div className="w-10 text-center text-sm py-1">{quantity}</div>
        <button
          className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 active:text-xs transition-all duration-150"
          onClick={() => handleChangeQuantity(+1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
