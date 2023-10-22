import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchItems } from "./asyncActions";
import { FetchStatus, Item, ItemsSliceState } from "./types";

const initialState: ItemsSliceState = {
  items: [],
  status: FetchStatus.LOADING,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Item[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.items = [];
      state.status = FetchStatus.LOADING;
    });

    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = FetchStatus.SUCCESS;
    });

    builder.addCase(fetchItems.rejected, (state) => {
      state.items = [];
      state.status = FetchStatus.ERROR;
    });
  },
});

export const { setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
