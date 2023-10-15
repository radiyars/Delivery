import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Item = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  count: number;
};

export enum FetchStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface ItemsSliceState {
  items: Item[];
  status: FetchStatus;
}

const initialState: ItemsSliceState = {
  items: [],
  status: FetchStatus.LOADING,
};

// export type SearchItemParams = { currentPage; category; sortProperty; search };

export type FetchItems = {
  currentPage: string;
  categoryId: string;
  search: string;
  sortProperty: string;
};

export const fetchItems = createAsyncThunk<Item[], FetchItems>(
  "items/fetchItemsStatus",
  async (params) => {
    const { currentPage, categoryId, sortProperty, search } = params;
    const { data } = await axios.get<Item[]>(
      `https://64dc883ce64a8525a0f6a48c.mockapi.io/items?page=${currentPage}&limit=4&
		${categoryId}&sortBy=${sortProperty}&${search}`
    );
    return data;
  }
);

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
