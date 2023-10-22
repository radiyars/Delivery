import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

const calculateTotalPrice = (items: CartItem[]) =>
  items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);

const calculateTotalCount = (items: CartItem[]) =>
  items.reduce((sum, item) => {
    return sum + item.count;
  }, 0);

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

      //   if (findItem && findItem.count > 0) {
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

export const selectCart = (state: RootState) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
