import { userCartItem, } from './cartAction'

let InitialState = {
    userCart: []
};


export const cartReducer = (state = InitialState, action) => {
    switch (action.type) {
        case userCartItem:
            return { ...state, userCart: action.payload }
        default:
            return state
    }
}