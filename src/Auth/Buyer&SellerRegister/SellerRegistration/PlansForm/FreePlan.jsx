import React, { useState } from "react";
import styles from "./FreePlan.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import httpService from "../../../../Component/Error Handling/httpService";
import { apiURL } from "../../../../const/config";


 const FreeSubscriptionForm = () => {
  const navigate = useNavigate();

  const sellerLoginData = useSelector((state) => state.userReducer.seller);

  const SubmitDataHandler = async (e) => {
  
    e.preventDefault();

    try {
      let loginDetails = await httpService
        .post(`${apiURL}/user/signup`, {
          userData:sellerLoginData
        })
        .then((res) => {
          alert("Got response")
          return res;
        })
        .catch((err) => {
          return err;
        });
 
      if(loginDetails.status === 200){
        navigate("/login");
      } else {
   
        alert("")
      }
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Free Product Listing</h2>
        <p className={styles.content}>Low Visibility & Limited Orders. </p>
      </div>

      <div className={styles.card1}>
        <h5>FREE Plan!!! There is no payment option for this.</h5>

        <button onClick={SubmitDataHandler} className="btn btn-warning">
          PROCEED
        </button>
      </div>
    </div>
  );
};
export default FreeSubscriptionForm