import { createSelector, createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: "Product",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload)
            return state;
        },
        removeFromCart: (state, action) => {
            let removedData = 0
            const restData = []
            state.forEach(each => {
                if (removedData == 0 && each.id === action.payload.id) {
                    removedData = 1;
                } else {
                    restData.push(each)
                }
            })
            state = [...restData];
            return state;
        }
    }
})

export const getCartproducts = createSelector(state => state.product, state => state);
export const { addToCart, removeFromCart } = productSlice.actions

export default productSlice.reducer;