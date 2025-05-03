import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import filtersReducer from "./filterSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    cart: cartReducer,
  },
});

let saveTimeout: NodeJS.Timeout | null = null;
store.subscribe(() => {
  const state = store.getState().cart;
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      localStorage.setItem("shop247_cart", JSON.stringify(state));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, 500);
});
