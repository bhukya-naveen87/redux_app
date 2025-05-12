const initialState = {
    count: 0
}

export const HANDLE_COUNT = (state = initialState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                count: action.payload + 1
            }
        case "DECREMENT":
            return {
                ...state,
                count: action.payload - 1
            }
        default:
            return state;
    }
}