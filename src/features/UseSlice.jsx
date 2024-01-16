import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      // payload nhận vào là uid và email
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { logout, login } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
