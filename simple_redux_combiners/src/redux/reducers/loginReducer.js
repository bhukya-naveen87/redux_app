const initialState = {
    email: ""
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default loginReducer;