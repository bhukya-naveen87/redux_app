import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import productReducer from "./productReducer";

const reducer = combineReducers({
    login: loginReducer,
    product: productReducer
})

export default reducer;