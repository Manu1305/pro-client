import { ADD_PRODUCT, EDIT_PRODUCT, UPDATE_STEPS } from './addProductAction';

const initialState = {
    product: {},
    steps:0
};

export const addProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {...state, product: action.payload };
        default:
            return state;
    }
};

export const updateStepperReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STEPS:
            return {...state, steps: action.payload };
        default:
            return state;
    }
};