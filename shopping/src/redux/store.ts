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
