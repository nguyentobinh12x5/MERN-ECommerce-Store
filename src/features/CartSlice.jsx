import { createSlice } from "@reduxjs/toolkit";
const cart =
  localStorage.getItem("cartList") !== null
    ? JSON.parse(localStorage.getItem("cartList"))
    : [];
const totalAmount =
  localStorage.getItem("cartTotal") !== null
    ? JSON.parse(localStorage.getItem("cartTotal"))
    : 0;
const totalQuantity =
  localStorage.getItem("cartQuantity") !== null
    ? JSON.parse(localStorage.getItem("cartQuantity"))
    : 0;

// adding this function to prevent repear code
const setCartListFunc = (cart, totalAmount, totalQuantity) => {
  localStorage.setItem("cartList", JSON.stringify(cart));
  localStorage.setItem("cartTotal", JSON.stringify(totalAmount));
  localStorage.setItem("cartQuantity", JSON.stringify(totalQuantity));
};
const initialState = {
  cart: cart,
  totalAmount: totalAmount,
  totalQuantity: totalQuantity,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      const newItem = action.payload.item;
      const newQuantity = action.payload.quantity;
      const existingItem = state.cart.find(
        (item) => item.name === newItem.name
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.cart.push({
          ...newItem,
          quantity: newQuantity,
          productTotal: newItem.price * newQuantity,
        });
      } else {
        existingItem.quantity = existingItem.quantity + newQuantity;
        existingItem.productTotal =
          Number(existingItem.productTotal) + Number(newItem.price);
      }
      state.totalAmount = state.cart.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setCartListFunc(
        state.cart.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },
    increaseTocart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find(
        (item) => item.name === newItem.name
      );
      state.totalQuantity = state.totalQuantity + 1;
      existingItem.quantity = existingItem.quantity + 1;
      existingItem.productTotal =
        Number(existingItem.productTotal) + Number(newItem.price);
      state.totalAmount = state.cart.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setCartListFunc(
        state.cart.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },
    decreaseTocart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find(
        (item) => item.name === newItem.name
      );
      state.totalQuantity = state.totalQuantity - 1;
      existingItem.quantity = existingItem.quantity - 1;
      existingItem.productTotal =
        Number(existingItem.productTotal) - Number(newItem.price);
      state.totalAmount = state.cart.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setCartListFunc(
        state.cart.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },
    deleteTocart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find(
        (item) => item.name === newItem.name
      );
      state.totalQuantity = state.totalQuantity - existingItem.quantity;
      const filterCart = state.cart.filter(
        (item) => item.name !== existingItem.name
      );
      state.totalAmount =
        state.totalAmount - existingItem.price * existingItem.quantity;
      existingItem.quantity = 0;
      localStorage.clear();
      state.cart = [...filterCart];
      setCartListFunc(
        state.cart.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      setCartListFunc(
        state.cart.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },
  },
});

export const {
  addTocart,
  deleteTocart,
  decreaseTocart,
  increaseTocart,
  clearCart,
} = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;
export const selectAmount = (state) => state.cart.totalAmount;
export default cartSlice.reducer;
