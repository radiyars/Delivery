import { RootState } from "../store";

export const selectFilters = (state: RootState) => state.filters;
export const selectSort = (state: RootState) => state.filters.sort;
export const selectItemsData = (state: RootState) => state.items;
