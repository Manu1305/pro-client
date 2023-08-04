import { AddProductType } from "../actionContName";

export const addProduct = (item) => {
  
  return { type: AddProductType, payload: item };
};
