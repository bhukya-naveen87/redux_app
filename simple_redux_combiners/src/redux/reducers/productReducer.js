import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/products/productTypes";

const initialState = []
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [
                ...state,
                action.payload
            ]
        case REMOVE_FROM_CART:
            let removedData = 0
            const restData = []
            state.forEach(each => {
                if(removedData == 0 && each.id === action.payload.id){
                    removedData = 1;
                }else{
                    restData.push(each)
                }
            })
            return [
                ...restData
            ]
        default:
            return state;
    }
}

export default productReducer;