import { Link } from "react-router-dom";
import React from "react";
import { MainPlan } from "./MainPlan";
import plans from "./planSec.module.css";
import { useSelector } from "react-redux";
import { apiURL } from "../../../../../../const/config";
import httpService from "../../../../../Error Handling/httpService";

const Plans = () => {
  const seller = useSelector((state) => state.userReducer.seller);

  const getApiKey = async () => {
    let res;
    try {
      res = await httpService
        .get(`${apiURL}/payment/get-api-key`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    return res;
  };

  // raz_sub_pay
  const subButton = async () => {
    // return
    let res;
    try {
      res = await httpService
        .post(`${apiURL}/subscription/subscriptions`, {
          userData: seller,
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
    return res;
  };

  const subHandler = async () => {
    try {
      //get Razorpay api key
      let raz_api_key = await getApiKey();

      // razorpay checkout
      let raz_sub_pay = await subButton();

      // razorpay verification and callback
      const options = {
        key: "rzp_live_m3oBDZHhzp8QRY",
        currency: "INR",
        name: "Hitech Mart",
        subscription_id: raz_sub_pay.razAck.id,
        description: "B2B Cloth store",
        image:
          "https://hitecmart.com/wp-content/uploads/2022/10/20221008_194021_0000.png",
        callback_url: `${apiURL}/subscription/subscription-verfivation/${raz_sub_pay.razAck.id}?userId=${raz_sub_pay.userAck._id}`,
        prefill: {
          name: seller.name,
          email: seller.email,
          contact: seller.phone,
        },
        notes: {
          name: seller.name,
          email: seller.email,
          contact: seller.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      // created rzaopay instinace
      const razor = new window.Razorpay(options);

      // wait tiil reslove all promises
      let confirmPromise = Promise.all([raz_api_key, raz_sub_pay])
        .then((res) => {
          return res;
        })
        .catch((err) => false);

      if (confirmPromise) {
        // open razorpay modal
        razor.open();
      } else {
        window.location.reload();
      }

      razor.on("raz_sub_pay.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.raz_sub_pay_id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={plans.App}>
      <div className={plans["card-container"]}>
        <div onClick={subHandler}>
          <MainPlan
            about="Prime Listing"
            title="9,999"
            description="Every day deal sale, Hot Promotions, SEO, Facebook Ads, Google Ads, High Visibility etc."
            buttonText="SUBSCRIBE NOW!"
          />
        </div>
        <Link to="/free">
           {/* <MainPlan
            about="1 Month Free Subscription"
            title="00.00"
            description="Low Visibility & Limited Orders, Applied for 1 Month only"
            buttonText="NORMAL PLAN!"
          /> */}
        </Link>
      </div>
    </div>
  );
};

export default Plans;
