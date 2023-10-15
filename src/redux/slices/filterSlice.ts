import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// export enum SortByEnum {
//   RATING = "rating",
//   PRICE = "price",
//   TITLE = "title",
// }

export type Sort = {
  name: string;
  sortBy: string;
};

export const SORT_LIST: Sort[] = [
  { name: "популярности", sortBy: "rating" },
  { name: "цене", sortBy: "price" },
  { name: "алфавиту", sortBy: "title" },
];

export interface FilterSliceState {
  currentPage: number;
  searchText: string;
  categoryId: number;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchText: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: SORT_LIST[0].name,
    sortBy: SORT_LIST[0].sortBy,
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },

    setSortType(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },

    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },

    setcurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setFilters(state, action: PayloadAction<FilterSliceState>) {
      // 	state.currentPage = Number(action.payload.currentPage);
      //   state.sort = action.payload.sort;
      //   state.categoryId = Number(action.payload.categoryId);
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: SORT_LIST[0].name,
          sortBy: SORT_LIST[0].sortBy,
        };
      }
    },
  },
});

export const selectFilters = (state: RootState) => state.filters;
export const selectSort = (state: RootState) => state.filters.sort;
export const selectItemsData = (state: RootState) => state.items;

export const {
  setCategoryId,
  setSortType,
  setSearchText,
  setcurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
