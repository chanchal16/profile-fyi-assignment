import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartStatus: "Idle",
  totalPrice: 0,
  totalItems: 0,
  discount: 0,
  discountType: null, // "fixed" or "percentage"
  finalPrice: 0, // Final price after applying discount
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
      state.finalPrice = calculateFinalPrice(
        state.totalPrice,
        state.discount,
        state.discountType
      );
    },
    REMOVE_FROM_CART: (state, action) => {
      const productId = action.payload.id;
      const productToRemove = state.cart.find((item) => item.id === productId);

      if (productToRemove) {
        state.cart = state.cart.filter((item) => item.id !== productId);
        state.totalItems -= productToRemove.quantity;
        state.totalPrice -= productToRemove.price * productToRemove.quantity;
        state.finalPrice = calculateFinalPrice(
          state.totalPrice,
          state.discount,
          state.discountType
        );
      }
    },
    INCREASE_QTY: (state, action) => {
      state.cart = state.cart.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      });
      state.totalPrice = state.totalPrice + action.payload.price;
      state.finalPrice = calculateFinalPrice(
        state.totalPrice,
        state.discount,
        state.discountType
      );
    },
    DECREASE_QTY: (state, action) => {
      state.cart = state.cart.map((item) => {
        return item.id === action.payload.id
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      });
      state.totalPrice = state.totalPrice - action.payload.price;
      state.finalPrice = calculateFinalPrice(
        state.totalPrice,
        state.discount,
        state.discountType
      );
    },
    APPLY_FIXED_DISCOUNT: (state, action) => {
      state.discount = action.payload;
      state.discountType = "fixed";
      state.finalPrice = calculateFinalPrice(
        state.totalPrice,
        state.discount,
        state.discountType
      );
    },
    APPLY_PERCENTAGE_DISCOUNT: (state, action) => {
      state.discount = action.payload;
      state.discountType = "percentage";
      state.finalPrice = calculateFinalPrice(
        state.totalPrice,
        state.discount,
        state.discountType
      );
    },
    RESET_DISCOUNT: (state) => {
      state.discount = 0;
      state.discountType = null;
      state.finalPrice = state.totalPrice;
    },
  },
});

const calculateFinalPrice = (totalPrice, discount, discountType) => {
  if (discountType === "fixed") {
    return Math.max(0, totalPrice - discount); // prevent negative value
  } else if (discountType === "percentage") {
    return totalPrice - totalPrice * (discount / 100);
  }
  return totalPrice;
};

export const {
  GET_CART_ITEMS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QTY,
  DECREASE_QTY,
  APPLY_FIXED_DISCOUNT,
  APPLY_PERCENTAGE_DISCOUNT,
  RESET_DISCOUNT,
} = cartSlice.actions;

export default cartSlice.reducer;
