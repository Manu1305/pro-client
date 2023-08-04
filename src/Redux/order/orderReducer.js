import { addOrder } from "../actionContName";
 let InitialState= {
    order:[]
 }

 export const orderReducer=(order= InitialState, action)=>{
   switch(action.type){
      case addOrder:
        return {...order, order:action.payload } 
        default : 
        return order;
   }
 }