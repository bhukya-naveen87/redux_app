const initialState = {
    email: "",
    token: ""
}

export const USER_DETAILS = (state = initialState, action) => {
    switch (action.type) {
        case "USER_DETAILS":
            return action.payload
        default:
            return state;
    }
}