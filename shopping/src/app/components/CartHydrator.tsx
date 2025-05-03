/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux";
import { setCart } from "@/redux/cartSlice";

export default function CartHydrator() {
  const dispatch = useAppDispatch();

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
