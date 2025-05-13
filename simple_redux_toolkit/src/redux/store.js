import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../redux/slices/productSlices'

const store = configureStore({
    reducer: {
        product: productSlice
    }
})
export default store;