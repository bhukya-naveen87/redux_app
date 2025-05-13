import { createSelector, createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "Cart",
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
    },
    extraReducers: (builder)=>{
        
    }
})

// export const getCartproducts = createSelector(state => state.cart, state => state);
export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer;