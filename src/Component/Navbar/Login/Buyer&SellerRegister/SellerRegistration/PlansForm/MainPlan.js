import React from "react";
import plans from "./planSec.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const MainPlan = ({subHandler}) => {
  const sellerLoginData = useSelector((state) => state.userReducer.seller);
  console.log(sellerLoginData)
  return (
    <div className={plans.dooll} >
      <div className={plans.card}>
        <h2 className={plans.abt}>Prime Listing</h2>
        <div className={plans["card-content"]}>
          <h6 className={plans.desp}>
            Every day deal sale, Hot Promotions, SEO, Facebook Ads, Google Ads,
            High Visibility etc.
          </h6>
          <h2 className={plans.abt1}>Rs. 9,999</h2>

          <button className={plans.buttt} onClick={subHandler}>SUBSCRIBE NOW!</button>
        </div>
      </div>

      {/* extra */}
      <Link to="/free">
      <div className={plans.card}>
        <h2 className={plans.abt}>1 Month Free Subscription</h2>
        <div className={plans["card-content"]}>
          <h6 className={plans.desp}>
            Low Visibility & Limited Orders, Applied for 1 Month only
          </h6>
          <h2 className={plans.abt1}>Rs. 00.00</h2>

          <button className={plans.buttt}>NORMAL PLAN!</button>
        </div>
      </div>
      </Link>
    </div>
  );
};
