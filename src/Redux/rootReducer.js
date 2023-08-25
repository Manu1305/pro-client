
import { productReducer } from "./product/productReducer";
import { userReducer } from "./user/userReducer";
import { combineReducers } from "redux";
import { orderReducer } from "./order/orderReducer";
// import { sellerRegDataReducer } from "./sellerRegist/sellerRegisReducer";
import { productReqReducer } from "./productBefore/productReducer";
export const reducers = combineReducers({
    userReducer,productReducer,orderReducer,productReqReducer
});
