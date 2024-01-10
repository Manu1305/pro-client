export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const UPDATE_STEPS = "UPDATE_STEPS";


export const addProductAction = (item) => {
    alert("step1")
    return { type: ADD_PRODUCT, payload: item }
};


export const updateSteps = (item) => {
    return { type: UPDATE_STEPS, payload: item }
};

