import { userCartItem } from './cartAction';

const initialState = {
    userCart: {},
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case userCartItem:
            return {
                ...state,
                userCart: { ...action.payload }, 
            };
        default:
            return state;
    }
};
