import { configureStore } from "@reduxjs/toolkit";
import filters from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import items from "./slices/itemsSlice";

export const store = configureStore({
    reducer: {
        filters,
        cart,
        items,
    },
});
