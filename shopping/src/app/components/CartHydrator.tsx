"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux";
import { setCart } from "@/redux/cartSlice";

export default function CartHydrator() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("shop247_cart");
      if (savedCart) {
        dispatch(setCart(JSON.parse(savedCart).products));
      }
    } catch (err) {
      console.log("Failed to load cart from localStorage", err);
    }
  }, []);

  return null;
}
