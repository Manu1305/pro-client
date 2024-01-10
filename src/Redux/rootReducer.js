
import { productReducer } from "./product/productReducer";
import { userReducer } from "./user/userReducer";
import { combineReducers } from "redux";
import { orderReducer } from "./order/orderReducer";
import {cartReducer} from './cart/cartReducer'
// import { sellerRegDataReducer } from "./sellerRegist/sellerRegisReducer";
import { productReqReducer } from "./productBefore/productReducer";
import { addProductReducer,updateStepperReducer } from './addProduct/addProdcutReducer';

export const reducers = combineReducers({
    userReducer,productReducer,orderReducer,productReqReducer,cartReducer,addProductReducer,updateStepperReducer
});
