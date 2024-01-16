import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/UseSlice";
import cartReducer from "../features/CartSlice";
import dataReducer from "../features/FetchDataSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    data: dataReducer,
  },
});
