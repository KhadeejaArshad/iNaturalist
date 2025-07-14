import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authData";
export const STATUSES={
    LOADING:"loading",
    SUCCESS:"succeeded",
    ERROR:"failed"
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    
    status: "idle",
    error: null,
    useName:null,
    token:null
  },
  reducers: {
   
    logout: (state) => {
      state.token = null;
      state.userName = null;
      state.status = "idle";

  }
},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
         (state, { payload }) => {
        
        state.token = payload?.token
        state.userName=payload?.data?.name
        state.status=STATUSES.SUCCESS
       
      },
    )


  
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
