import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
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
    },
});

export const { setCategoryId, setSortType, setSearchText } =
    filterSlice.actions;

export default filterSlice.reducer;
