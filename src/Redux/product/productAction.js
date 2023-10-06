import { AddProductType,ALL_PRODUCTS,SEARCH } from "../actionContName";

export const addProduct = (item) => {
  
  return { type: AddProductType, payload: item };
};

export const allProducts = (item) => {
  
  return { type: ALL_PRODUCTS, payload: item };
};


export const searcProducts = (item) => {
  
  return { type: SEARCH, payload: item };
};
