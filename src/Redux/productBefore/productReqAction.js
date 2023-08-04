import { AddReqProductType } from "../actionContName";

export const addReqProduct = (item) => {

  return { type: AddReqProductType, payload: item };
};