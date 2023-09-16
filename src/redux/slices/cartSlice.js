import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    totalCount: 0,
    items: [],
};

const calculateTotalPrice = (items) =>
    items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
    }, 0);

const calculateTotalCount = (items) =>
    items.reduce((sum, item) => {
        return sum + item.count;
    }, 0);

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }

            state.totalPrice = calculateTotalPrice(state.items);
            state.totalCount = calculateTotalCount(state.items);
        },

        removeItem(state, action) {
            state.items = state.items.filter((obj) => {
                return obj.id !== action.payload.id;
            });

            state.totalPrice = calculateTotalPrice(state.items);
            state.totalCount = calculateTotalCount(state.items);
        },

        minusItem(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );

            if (findItem && findItem.count > 0) {
                findItem.count--;
            }

            state.totalPrice = calculateTotalPrice(state.items);
            state.totalCount = calculateTotalCount(state.items);
        },

        clearItems(state) {
            state.items = [];

            state.totalPrice = calculateTotalPrice(state.items);
            state.totalCount = calculateTotalCount(state.items);
        },
    },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
