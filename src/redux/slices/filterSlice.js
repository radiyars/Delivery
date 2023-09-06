import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    currnetPage: 1,
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
        setCurrnetPage(state, action) {
            state.currnetPage = action.payload;
        },
    },
});

export const { setCategoryId, setSortType, setSearchText, setCurrnetPage } =
    filterSlice.actions;

export default filterSlice.reducer;
