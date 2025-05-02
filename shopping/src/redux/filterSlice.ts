import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FiltersState = {
  category: Record<string, boolean>;
  origin: Record<string, boolean>;
  minMaxPriceRange: [number, number];
  chosenPriceRange: [number, number];
  lastSearchQuery: string | null;
};

const initialState: FiltersState = {
  category: {},
  origin: {},
  minMaxPriceRange: [-Infinity, Infinity],
  chosenPriceRange: [-Infinity, Infinity],
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
    // min and max of all fetched products
    setMinMaxPriceRange(state, action: PayloadAction<[number, number]>) {
      state.minMaxPriceRange = action.payload;
      state.chosenPriceRange[0] = Math.max(
        action.payload[0],
        state.chosenPriceRange[0]
      );
      state.chosenPriceRange[1] = Math.min(
        action.payload[1],
        state.chosenPriceRange[1]
      );
    },
    // users choice of price range
    setPriceRangeFilter(state, action: PayloadAction<[number, number]>) {
      state.chosenPriceRange = action.payload;
    },
    setLastSearchQuery(state, action: PayloadAction<string>) {
      state.lastSearchQuery = action.payload;
    },
  },
});

export const {
  setCategoryFilter,
  setOriginFilter,
  setMinMaxPriceRange,
  setPriceRangeFilter,
  setLastSearchQuery,
} = filtersSlice.actions;

export default filtersSlice.reducer;
