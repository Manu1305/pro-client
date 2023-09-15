import { ALL_PRODUCTS, AddProductType, SEARCH } from "../actionContName";
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
    case SEARCH:
      const temp = [...state.allProducts];
      temp.filter((product) => {

        if (
          // product.selectedCategory.toLowerCase().includes(action.payload) ||
          // product.selectedSubcategory.toLowerCase().includes(action.payload) ||
          product.brand.toLowerCase().includes(action.payload)) {
          return product
        }
      })

      return { ...state, allProducts: temp };
    default:
      return state;
  }
};
