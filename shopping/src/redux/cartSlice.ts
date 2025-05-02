import { CartEntry } from "@/app/types/cartEntry";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  products: Record<number, CartEntry>;
};

const initialState: CartState = {
  // TODO: Retrieve state from localStorage
  products: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<Record<number, CartEntry>>) {
      state.products = action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
