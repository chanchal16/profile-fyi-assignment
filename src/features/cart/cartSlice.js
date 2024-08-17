import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartStatus: "Idle",
  totalPrice: 0,
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    GET_CART_ITEMS: (state, action) => {
      state.cart = action.payload;
    },
    ADD_TO_CART: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += item.price;
      } else {
        state.cart.push({
          ...item,
          quantity: 1,
          totalPrice: item.price,
        });
      }
      state.totalItems += 1;
      state.totalPrice += item.price;
    },
    REMOVE_FROM_CART: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.totalItems = state.totalItems - 1;
    },
    INCREASE_QTY: (state, action) => {
      state.cart = state.cart.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
      state.totalPrice = state.totalPrice + action.payload.price;
    },
    DECREASE_QTY: (state, action) => {
      state.cart = state.cart.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      });
      state.totalPrice = state.totalPrice - action.payload.price;
    },
  },
});

export const {
  GET_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QTY,
  DECREASE_QTY,
} = cartSlice.actions;

export default cartSlice.reducer;
