"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux";
import axios from "axios";
import { Product } from "@/app/types/product";
import { setProducts } from "@/redux/productSlice"; // optional cache
import Image from "next/image";
import { CartEntry } from "@/app/types/cartEntry";
import { setCart } from "@/redux/cartSlice";

export default function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);

  const reduxProduct = useAppSelector((state) =>
    state.products.all.find((prod) => prod.id === productId)
  );

  const [product, setProduct] = useState<Product | undefined>(reduxProduct);
  const [loading, setLoading] = useState(!reduxProduct);

  const [quantity, setQuantity] = useState(1);

  const cart: Record<number, CartEntry> = useAppSelector(
    (state) => state.cart.products
  );
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const id = product!.id;
    const newCart = { ...cart };

    if (newCart[id]) {
      newCart[id] = {
        ...newCart[id],
        quantity: newCart[id].quantity + quantity,
      };
    } else {
      newCart[id] = {
        product: product!,
        quantity,
      };
    }

    dispatch(setCart(newCart));
    setQuantity(1);
  };
  useEffect(() => {
    if (!reduxProduct) {
      // Fetch from API
      axios
        .get(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => {
          const fetched = res.data;
          console.log(fetched);
          if (fetched) {
            const product: Product = {
              id: fetched.id,
              title: fetched.title,
              price: fetched.price,
              description: fetched.description,
              image: fetched.image,
              category: fetched.category
                .split(" ")
                .map(
                  (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
                ),
              origin: "Singapore", // Dummy attribute
              rating: 4.6, // Dummy attribute
            };

            setProduct(product);
          }
          setLoading(false);
        });
    }
  }, [reduxProduct]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 m-4 bg-white">
      {/* Image section */}
      <div className="w-full md:w-[400px] h-[400px] relative border-0 border-gray-200 bg-white rounded">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain w-full h-full p-4"
        />
      </div>

      {/* Info section */}
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-xl font-semibold text-orange-600">
          ${product.price.toFixed(2)}
        </p>

        {/* Delivery Info */}
        <div className="text-sm text-gray-600">
          Get it by <span className="font-medium">Tuesday, May 7</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium" htmlFor="quantity">
            Quantity:
          </label>
          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
            <button
              className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 active:text-xs transition-all duration-150"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            >
              -
            </button>
            <div className="w-12 text-center text-sm py-1">{quantity}</div>
            <button
              className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 active:text-xs transition-all duration-150"
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
        {/* Add to Cart */}
        <button
          className="w-fit px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 active:scale-98 transition duration-150"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold mt-4 mb-2">Description</h2>
          <p className="text-sm text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
