import { AddReqProductType } from "../actionContName";
 let InitialState= {
    productReq:[]
 }

 export const productReqReducer=(productReq= InitialState, action)=>{
   switch(action.type){
      case AddReqProductType:
        return {...productReq, productReq:action.payload } 
        default : 
        return productReq;
   }
 }