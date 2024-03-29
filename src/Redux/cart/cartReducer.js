import { USER_CART } from './cartAction';

const initialState = {
    userCart: {},
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_CART:
            console.log("Reducer",action.payload)
            return {
                ...state,
                userCart: { ...action.payload }, 
            };
        default:
            return state;
    }
};
