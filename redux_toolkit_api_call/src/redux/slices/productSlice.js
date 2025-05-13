import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProductData = createAsyncThunk('fetchProducts', async () => {
    const resp = await fetch('https://dummyjson.com/products')
    return resp.json();
})

const productSlice = createSlice({
    name: "Products",
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchProductData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProductData.rejected, (state, action) => {
            console.log("Error: ", action.payload)
            state.isError = true
        })
    }
})

export default productSlice.reducer;