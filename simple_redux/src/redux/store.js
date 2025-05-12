import { createStore } from 'redux'

const reducer = (state=0, action)=>{
    switch (action.type) {
        case "INCREMENT":
            return state + action.payload;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;