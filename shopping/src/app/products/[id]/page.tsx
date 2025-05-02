"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux";
import axios from "axios";
import { Product } from "@/app/types/product";
import { setProducts } from "@/redux/productSlice"; // optional cache

export default function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);

  const reduxProduct = useAppSelector((state) =>
    state.products.all.find((prod) => prod.id === productId)
  );

  const [product, setProduct] = useState<Product | undefined>(reduxProduct);
  const [loading, setLoading] = useState(!reduxProduct);

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
              origin: "Singapore", // fallback or derived
              rating: 4.6, // fallback or mock
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
    <div>
      <h2>{product.title}</h2>
      <p>${product.price.toFixed(2)}</p>
    </div>
  );
}
