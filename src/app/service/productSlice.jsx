import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { productsApi } from "./dummyData";


// export const fetchProduct = createAsyncThunk(
//   'product/fetchProduct',
//   async () => {
//     const response = await axios.get('http://109.1.1.21:5000/api/products');
//     return response.data;
//   }
// );
export const STATUSES={
    LOADING:"loading",
    SUCCESS:"succeeded",
    ERROR:"failed"
}

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getAllProduct.matchFulfilled,
         (state, { payload }) => {
        
        state.data = payload?.products
        state.status=STATUSES.SUCCESS
       
      },
    )


      // .addCase(fetchProduct.pending, (state) => {
      //   state.status = STATUSES.LOADING;
      // })
      // .addCase(fetchProduct.fulfilled, (state, action) => {
      //   state.status =STATUSES.SUCCESS;
      //   state.data = action.payload;
      // })
      // .addCase(fetchProduct.rejected, (state, action) => {
      //   state.status = STATUSES.ERROR;
      //   state.error = action.error.message;
      // });
  },
});

export default productSlice.reducer;
