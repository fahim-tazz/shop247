import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FiltersState = {
  category: Record<string, boolean>;
  origin: Record<string, boolean>;
  priceRange: [number, number];
  lastSearchQuery: string | null;
};

const initialState: FiltersState = {
  category: {},
  origin: {},
  priceRange: [-Infinity, Infinity],
  lastSearchQuery: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryFilter(state, action: PayloadAction<Record<string, boolean>>) {
      state.category = action.payload;
    },
    setOriginFilter(state, action: PayloadAction<Record<string, boolean>>) {
      state.origin = action.payload;
    },
    setPriceRangeFilter(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
    },
    setLastSearchQuery(state, action: PayloadAction<string>) {
      state.lastSearchQuery = action.payload;
    },
  },
});

export const {
  setCategoryFilter,
  setOriginFilter,
  setPriceRangeFilter,
  setLastSearchQuery,
} = filtersSlice.actions;

export default filtersSlice.reducer;
