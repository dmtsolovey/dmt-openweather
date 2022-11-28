import { createAsyncThunk } from "@reduxjs/toolkit";
import { readWeather } from "../../api";
import { LocationSearchResult } from "../../models/OpenWeather";

export const updateLocation = createAsyncThunk<LocationSearchResult, number>(
  "locations/update",
  readWeather
);
