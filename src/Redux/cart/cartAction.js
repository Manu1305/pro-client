export const USER_CART = "USER_CART";
export const removeItem = "REMOVE_CART_ITEM";

export const userCartItem = (item) => {
    return { type: USER_CART, payload: item }
}



