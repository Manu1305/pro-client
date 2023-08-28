import { AddItem, removeItem } from './cartAction'

let InitialState = {
    cart: []
};


export const cartReducer = (state = InitialState, action) => {
    switch (action.type) {
        case AddItem:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case removeItem:
            return state
        default:
            return state
    }
}