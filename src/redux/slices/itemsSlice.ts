import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk(
  "items/fetchItemsStatus",
  async ({ currentPage, category, sortProperty, search }) => {
    const { data } = await axios.get(
      `https://64dc883ce64a8525a0f6a48c.mockapi.io/items?page=${currentPage}&limit=4&
		${category}&sortBy=${sortProperty}&${search}`
    );
    return data;
  }
);

type Item = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  count: number;
};

interface ItemsSliceState {
  items: Item[];
  status: "loading" | "success" | "error";
}

const initialState: ItemsSliceState = {
  items: [],
  status: "loading",
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchItems.pending]: (state) => {
      state.items = [];
      state.status = "loading";
    },
    [fetchItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchItems.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
  },
});

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
