export type Sort = {
  name: string;
  sortBy: string;
};

export interface FilterSliceState {
  currentPage: number;
  searchText: string;
  categoryId: number;
  sort: Sort;
}

export const SORT_LIST: Sort[] = [
  { name: "популярности", sortBy: "rating" },
  { name: "цене", sortBy: "price" },
  { name: "алфавиту", sortBy: "title" },
];
