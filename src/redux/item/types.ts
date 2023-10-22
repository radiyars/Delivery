export type Item = {
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

export interface ItemsSliceState {
  items: Item[];
  status: FetchStatus;
}

export type FetchItems = {
  currentPage: string;
  categoryId: string;
  search: string;
  sortProperty: string;
};