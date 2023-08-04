import { AddProductType } from "../actionContName";
 let InitialState= {
    product:[]
 }

 export const productReducer=(product= InitialState, action)=>{
   switch(action.type){
      case AddProductType:
        return {...product, product:action.payload } 
        default : 
        return product;
   }
 }