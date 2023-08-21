
import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styless from "./Payment.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();


  // serach params hook to get params
  const searchQuery = useSearchParams()[0];

  // payment id
  const refernce = searchQuery.get("reference");

  // navigate to orders page
  const takeOrdersPage = () => {
    navigate("/buyerOrder");
  };

  useEffect(() => {
    setTimeout(() => {
      navigate('/buyerOrder')
    },5000)
  })

  return (
    <div className={`${styless.container}`}>
      <div className={`${styless.card}`}>
        <h2>Payment Success</h2>
        <div className={`${styless.customerHeading}`}>
          <p>Payment Id: {JSON.stringify(refernce)}</p>
        </div>
        <button className={`${styless.button}`} onClick={takeOrdersPage}>
          Go To Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;