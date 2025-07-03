import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from './service/dummyData'
import productSlice from './service/productSlice'
import { authApi } from './service/authData';
import authSlice from './service/authSlice'
import cartSlice from './service/cartSlice'



export const store=configureStore({
    reducer:{
        [productsApi.reducerPath]:productsApi.reducer,
        [authApi.reducerPath]:authApi.reducer,
        product:productSlice,
        auth:authSlice,
        cart:cartSlice
        
        
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware,authApi.middleware)
    
    
});
setupListeners(store.dispatch)