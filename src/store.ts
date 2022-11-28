import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import locationsReducer from "./features/locations/locations";
import { save, load } from "redux-localstorage-simple";

const reducer = combineReducers({
  locations: locationsReducer,
});
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save()),
    preloadedState,
  });
};

export const store = setupStore(load());
export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
