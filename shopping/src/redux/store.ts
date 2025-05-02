import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import filtersReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
  },
});
