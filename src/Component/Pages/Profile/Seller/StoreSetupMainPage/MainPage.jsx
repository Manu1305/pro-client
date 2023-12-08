import React from "react";
import {Link} from "react-router-dom"
import mainPge from "./mainPage.module.css";
 const MainPage = () => {
  return (
    <div className={mainPge.container}>
      <h2>Welcome to HiTech Mart!</h2>
      <p>
        Thank you for choosing HiTec Mart! This quick setup wizard will help you
        yo configure the basic settings & you will have store ready in no time.{" "}
        <br></br> If you don't want to go through the wizard right now, you can
        skip & return to the dashboard. You setup your store from dashboard
        setting anytime!
      </p>
    <div className={mainPge.container1}>
      <div className="row">
        <div className="col-md-6">
        {/* <Link to="/store">  <button  className={mainPge.btn1}>Let's go!</button></Link> */}
        </div>
        <div className="col-md-6">
        <button  className={mainPge.btn2}>Not right now!</button>

        </div>

      </div>
    </div>

    </div>
  );
};


export default MainPage