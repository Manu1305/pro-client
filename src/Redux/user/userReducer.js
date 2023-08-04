// import { addUserType, sellerRegisData } from "../actionContName";
// // import { updateUserType } from "../actionContName";

// let InitialState = {
//   user: {},
//   sellerData: {},
// };

// export const userReducer = (state = InitialState, action) => {
//   switch (action.type) {
//     case addUserType:
//       return { ...state, user: action.payload };
//     case sellerRegisData:
//       return { ...state, sellerData: action.payload };
//     default:
//       return state;
//   }
// };

import { addUserType, sellerRegisData } from "../actionContName";
// import { updateUserType } from "../actionContName";

let InitialState = {
  user: {},
  sellerData: {},
  seller: {},
};

export const userReducer = (state = InitialState, action) => {
  switch (action.type) {
    case addUserType:
      return { ...state, user: action.payload };
    case sellerRegisData:
      return { ...state, sellerData: action.payload };
    case "SAVE_SELLER_DATA":
      return { ...state, seller: action.payload };
    default:
      return state;
  }
};