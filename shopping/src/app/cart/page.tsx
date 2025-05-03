"use client";
import { useAppDispatch, useAppSelector } from "@/redux";
import React, { useState } from "react";
import { Product } from "../types/product";
import { CartEntry } from "../types/cartEntry";
import Image from "next/image";
import CartProductCard from "../components/CartProductCard";
import OrderSummary from "../components/OrderSummary";
import ShippingForm from "../components/ShippingForm";

type Props = {};

export default function CartPage({}: Props) {
  const cart: Record<number, CartEntry> = useAppSelector(
    (state) => state.cart.products
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left Side: Scrollable Cart Items */}
      <div className="w-full md:w-2/3 h-[80vh] overflow-y-auto border-r-1 border-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <div className="space-y-4">
          {Object.keys(cart).length === 0 && (
            <div className="w-full flex justify-center items-center py-8 text-gray-500 text-lg">
              No items in cart.
            </div>
          )}
          {Object.values(cart).map(({ product, quantity }) => (
            <CartProductCard key={product.id} productId={product.id} />
          ))}
        </div>
      </div>

      {/* Right Side: Order Summary + Shipping Info */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        <OrderSummary />
        <ShippingForm />
      </div>
    </div>
  );
}
