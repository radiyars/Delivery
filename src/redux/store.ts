import { configureStore } from "@reduxjs/toolkit";
import filters from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import items from "./slices/itemsSlice";
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
