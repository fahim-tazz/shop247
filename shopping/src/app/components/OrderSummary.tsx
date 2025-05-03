"use client";
import { useAppSelector } from "@/redux";

type Props = object;

export default function OrderSummary({}: Props) {
  const cart = useAppSelector((state) => state.cart.products);

  const subtotal = Object.values(cart).reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );
  const gst = subtotal * 0.09;
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const total = subtotal + gst + deliveryFee;

  return (
    <div className=" p-4 rounded shadow bg-white">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between text-sm mb-2">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span>GST (9%):</span>
        <span>${gst.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span>Delivery Fee:</span>
        <span>${deliveryFee.toFixed(2)}</span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-bold text-md">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
