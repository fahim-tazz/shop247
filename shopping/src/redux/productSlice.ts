import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/app/types/product";

type ProductsState = {
  all: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  all: [],
  loading: true,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.all = action.payload;
      state.loading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setProducts, setError } = productsSlice.actions;
export default productsSlice.reducer;
