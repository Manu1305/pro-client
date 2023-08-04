// import { addUserType, sellerRegisData } from "../actionContName";

// export const addUser = ( item ) => {
//     return {type:addUserType, payload: item}
// }
// export const addSeller = ( item ) => {
//     return {type:sellerRegisData, payload: item}
// }
import { addUserType, sellerRegisData } from "../actionContName";

export const addUser = ( item ) => {
    return {type:addUserType, payload: item}
}
export const addSeller = ( item ) => {
    return {type:sellerRegisData, payload: item}
};

// seller registration details 
export const saveSellerData = (item) => {
  
    return { type: "SAVE_SELLER_DATA", payload: item };
  };