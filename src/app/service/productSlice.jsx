import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const response = await axios.get('http://109.1.1.21:5000/api/products');
    return response.data;
  }
);
export const STATUSES={
    LOADING:"loading",
    SUCCESS:"succeeded",
    ERROR:"failed"
}

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status =STATUSES.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
