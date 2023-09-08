import { ALL_PRODUCTS, AddProductType } from "../actionContName";
let InitialState = {
  product: [],
  allProducts: [],
};

export const productReducer = (state = InitialState, action) => {
  switch (action.type) {
    case AddProductType:
      return { ...state, product: action.payload };
    case ALL_PRODUCTS:
      return { ...state, allProducts: action.payload };
    default:
      return state;
  }
};
