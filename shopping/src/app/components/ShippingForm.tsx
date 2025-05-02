import { useAppDispatch, useAppSelector } from "@/redux";
import { setCart } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

type Props = {};

export default function ShippingForm({}: Props) {
  const cart = useAppSelector((state) => state.cart.products);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmitForm = () => {
    if (Object.values(cart).length > 0) {
      toast.success("Yay! Your order has been placed!", {
        duration: 3000,
      });
      dispatch(setCart({}));
    } else {
      toast.error("You have not added any items to the cart. Happy Shopping!", {
        duration: 2000,
      });
    }
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };
  return (
    <div className="p-6 rounded shadow bg-white space-y-4">
      <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
      <input
        className="w-full border-1 border-gray-400 py-2 px-4 rounded-sm"
        type="text"
        placeholder="Full Name"
      />
      <input
        className="w-full border-1 border-gray-400 py-2 px-4 rounded-sm"
        type="tel"
        placeholder="Phone Number"
      />
      <input
        className="w-full border-1 border-gray-400 py-2 px-4 rounded-sm"
        type="text"
        placeholder="Address"
      />
      <input
        className="w-full border-1 border-gray-400 py-2 px-4 rounded-sm"
        type="text"
        placeholder="Card Number"
      />
      <input
        className="w-full border-1 border-gray-400 py-2 px-4 rounded-sm"
        type="password"
        placeholder="CVV2"
      />
      <button
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded mt-2"
        onClick={handleSubmitForm}
      >
        Place Order
      </button>
    </div>
  );
}
