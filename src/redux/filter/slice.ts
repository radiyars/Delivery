import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterSliceState, SORT_LIST, Sort } from "./types";

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

export const {
  setCategoryId,
  setSortType,
  setSearchText,
  setcurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
