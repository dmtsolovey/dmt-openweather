import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LocationSearchResult } from "../../models/OpenWeather";
import { searchLocation } from "./searchLocation";
import { updateLocation } from "./updateLocation";

export interface LocationsState {
  items: LocationSearchResult[];
  loading: boolean;
  error: boolean;
}

const initialState: LocationsState = {
  items: [],
  loading: false,
  error: false,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    delete: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchLocation.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(searchLocation.fulfilled, (state, { payload }) => {
      const allreadyExist = state.items.some((item) => item.id === payload.id);
      if (!allreadyExist) {
        state.items.push(payload);
      }
      state.loading = false;
    });
    builder.addCase(searchLocation.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(updateLocation.fulfilled, (state, { payload }) => {
      state.items = state.items.map((item) =>
        item.id === payload.id ? payload : item
      );
      state.loading = false;
    });
  },
});

export const locationActions = locationSlice.actions;

export default locationSlice.reducer;
