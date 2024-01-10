import React, { useEffect } from "react";
import StepperComponent from "./Stepper";
import { Outlet, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import httpService from "../../Error Handling/httpService";
import { apiURL } from "../../../const/config";
import { useDispatch } from "react-redux";
import { addProductAction } from "../../../Redux/addProduct/addProductAction";

function AddProduct() {
  let { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProductForEdit = async () => {
      alert("Called")
      try {
        await httpService
          .get(`${apiURL}/product/get-single-products/${productId}`)
          .then((res) => {
            console.log("res  ==>", res.data);
            dispatch(addProductAction(res.data));
          })
          .catch((err) => {
            alert("ERROR OCCURED");
          });
      } catch (error) {
        alert("Error", JSON.stringify(error));
      }
    };

    productId && getProductForEdit();
  }, []);

  return (
    <div style={{ background: "rgb(247, 251, 255)" }}>
      <div className="bg-white p-3 shadow-md">
        <StepperComponent stepCount={2} />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AddProduct;
