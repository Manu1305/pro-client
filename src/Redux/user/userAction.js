import {
  loginSuccess,
  sellerRegisData,
} from "../actionContName";

export const currentUserData = (item) => {
  return { type: loginSuccess, payload: item };
};

export const addSeller = (item) => {
  return { type: sellerRegisData, payload: item };
};

// seller registration details
export const saveSellerData = (item) => {
  return { type: "SAVE_SELLER_DATA", payload: item };
};
