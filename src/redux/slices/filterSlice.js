import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    currentPage: 1,
    sortType: {
        name: "популярности",
        sortProperty: "rating",
    },
    searchText: "",
};

export const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortType(state, action) {
            state.sortType = action.payload;
        },
        setSearchText(state, action) {
            state.searchText = action.payload;
        },
        setcurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
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
