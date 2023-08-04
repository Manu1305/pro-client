import { sellerRegisData } from "../actionContName"; 


export const sellerRegistration = ( item ) => {
    return {type:sellerRegisData, payload: item}
}