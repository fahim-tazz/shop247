// test-utils.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/cartSlice";

export function makeMockStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });
}
