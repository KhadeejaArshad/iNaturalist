import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:'product',
    initialState:{
        ids:[]
    },
    reducers:{
        addtoCart:(state,action) =>{
            state.ids.push(action.payload)

        },
        removefrom:(state,action) =>{
            state.ids.splice(state.ids.indexOf(action.payload),1)
        }
    }

})
export const addtoCart = cartSlice.actions.addtoCart;
export const removefrom= cartSlice.actions.removefrom;
export default cartSlice.reducer;