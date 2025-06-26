import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { productsApi } from './service/dummyData'
import productSlice from './service/productSlice'


export const store=configureStore({
    reducer:{
        [productsApi.reducerPath]:productsApi.reducer,
        product:productSlice
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware)
    
});
setupListeners(store.dispatch)