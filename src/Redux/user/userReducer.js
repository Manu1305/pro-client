import {  loginSuccess, sellerRegisData } from "../actionContName";

let InitialState = {
  user: {},
  sellerData: {},
  seller: {},
  loading: false,
};

export const userReducer = (state = InitialState, action) => {
  switch (action.type) {
    case sellerRegisData:
      return { ...state, sellerData: action.payload };
    case "SAVE_SELLER_DATA":
      return { ...state, seller: action.payload };

    case loginSuccess:
      console.log("From Redux",action.payload)
      return { ...state, user: action.payload };

    default:
      return state;
  }
};
