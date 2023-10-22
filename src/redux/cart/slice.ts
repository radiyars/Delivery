import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartItem, CartSliceState } from "./types";
import { calculateTotalCount } from "../../utils/calcTotalCount";
import { calculateTotalPrice } from "../../utils/calcTotalPrice";

const { items, totalPrice, totalCount } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  totalCount,
  items,
};

// const calculateTotalPrice = (items: CartItem[]) =>
//   items.reduce((sum, obj) => {
//     return obj.price * obj.count + sum;
//   }, 0);

// const calculateTotalCount = (items: CartItem[]) =>
//   items.reduce((sum, item) => {
//     return sum + item.count;
//   }, 0);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calculateTotalPrice(state.items);
      state.totalCount = calculateTotalCount(state.items);
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => {
        return obj.id !== action.payload;
      });

      state.totalPrice = calculateTotalPrice(state.items);
      state.totalCount = calculateTotalCount(state.items);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calculateTotalPrice(state.items);
      state.totalCount = calculateTotalCount(state.items);
    },

    clearItems(state) {
      state.items = [];

      state.totalPrice = calculateTotalPrice(state.items);
      state.totalCount = calculateTotalCount(state.items);
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
