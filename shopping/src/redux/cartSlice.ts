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
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        delete state.products[id];
      }
      if (state.products[id]) {
        state.products[id].quantity = quantity;
      }
    },
  },
});

export const { setCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
