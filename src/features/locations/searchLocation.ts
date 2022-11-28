import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLocationByName } from "../../api";
import { LocationSearchResult } from "../../models/OpenWeather";

export const searchLocation = createAsyncThunk<LocationSearchResult, string>(
  "locations/search",
  getLocationByName
);
