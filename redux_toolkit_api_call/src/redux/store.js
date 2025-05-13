import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../redux/slices/productSlice'
import cartSlice from '../redux/slices/cartSlice'

const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice
    }
})
export default store;