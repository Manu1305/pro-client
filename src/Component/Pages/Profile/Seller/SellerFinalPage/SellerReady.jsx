import React from "react";
import {Link} from "react-router-dom"
import ready from "./SellerReady.module.css";
export const SellerReady = () => {
  return (
    <div className={ready.container}>
      <h2>Welcome to HiTech Mart!</h2>
      <p>
        Thank you for choosing HiTec Mart! This quick setup wizard will help you
        yo configure the basic settings & you will have store ready in no time.{" "}
        <br></br> If you don't want to go through the wizard right now, you can
        skip & return to the dashboard. You setup your store from dashboard
        setting anytime!
      </p>
    <div className={ready.container1}>
      <div className="row">
        <div className="col-md-12">
        <Link to="/dashboard">  <button  className={ready.btn1}>Let's go to the Dashboard</button></Link>
        </div>
        {/* <div className="col-md-6">
        <button  className={ready.btn2}>Not right now!</button>

        </div> */}

      </div>
    </div>

    </div>
  );
};
