import { addOrder } from "../actionContName";

export const addorder = (item) => {
  
    return { type: addOrder, payload: item };
  };