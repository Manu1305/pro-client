import { AddProductType,ALL_PRODUCTS } from "../actionContName";

export const addProduct = (item) => {
  
  return { type: AddProductType, payload: item };
};

export const allProducts = (item) => {
  
  return { type: ALL_PRODUCTS, payload: item };
};
