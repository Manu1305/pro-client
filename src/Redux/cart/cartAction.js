export const USER_CART = "USER_CART";
export const removeItem = "REMOVE_CART_ITEM";

export const userCartItem = (item) => {
    console.log("Action Payload",item)
    return { type: USER_CART, payload: item }
};




