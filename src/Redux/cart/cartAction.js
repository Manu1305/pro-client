export const AddItem = "ADD_CART_ITEM";
export const removeItem = "REMOVE_CART_ITEM";

export const addCartItem = (item) => {
    return { type: AddItem, payload: item }
}

export const removeCartItem = (item) => {
    return { type: removeItem, payload: item }
}

