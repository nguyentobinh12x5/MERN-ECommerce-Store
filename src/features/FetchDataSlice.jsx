import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  products: [],
  loading: false,
  error: "",
};
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await axios.get("http://localhost:5000/product");
  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});
export const selectData = (state) => state.data.products;
export const selectProductByName = (state, productName) =>
  state.data.products.find((product) => product.name === productName);
export default dataSlice.reducer;
