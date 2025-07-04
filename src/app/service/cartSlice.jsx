import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
  },
  reducers: {
    addtoCart: (state, action) => {
      const { id, count } = action.payload;
      const existing = state.items.find(item => item.id === id);

      if (existing) {
        existing.count += count;
      } else {
        state.items.push({ id, count });
      }
    },
    removefrom: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});
export const addtoCart = cartSlice.actions.addtoCart;
export const removefrom = cartSlice.actions.removefrom;
export default cartSlice.reducer;
