import { userCartItem, } from './cartAction'

let InitialState = {
    userCartItems: []
};


export const cartReducer = (state = InitialState, action) => {
    switch (action.type) {
        case userCartItem:
            return { ...state, userCartItems: action.payload }
        default:
            return state
    }
}