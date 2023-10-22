import { configureStore } from "@reduxjs/toolkit";
import filters from "./filter/slice";
import cart from "./cart/slice";
import items from "./item/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filters,
    cart,
    items,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
