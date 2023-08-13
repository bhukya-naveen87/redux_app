import { combineReducers } from "redux";
import { USER_DETAILS } from "./loginReducer";
import { HANDLE_COUNT } from "./countReducers";

const rootReducer = combineReducers({
    USER_DETAILS: USER_DETAILS,
    HANDLE_COUNT: HANDLE_COUNT
})

export default rootReducer;
