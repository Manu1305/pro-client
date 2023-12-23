
import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styless from "./Payment.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();


  // serach params hook to get params
  const searchQuery = useSearchParams()[0];
  console.log(searchQuery)

  // payment id
  const refernce = searchQuery.get("reference");

  // navigate to orders page
  const takeOrdersPage = () => {
    navigate("/buyerOrder");
  };

  useEffect(() => {
    setTimeout(() => {
      navigate('/buyerOrder')
    },10000)
  })

  return (
    <div className={`${styless.container}`}>
      <div className={`${styless.card}`}>
        <h1 className="text-center font-bold">{refernce ? "Payment Success" : "Order Placed Succefully...!"}</h1>
        <div className={`${styless.customerHeading}`}>
          {refernce && <p>Payment Id: {JSON.stringify(refernce)}</p>}
        </div>
        
        <div className="flex justify-center items-center">
        <button 
        onClick={takeOrdersPage} className="bg-green-200 hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
          Go To Orders
        </button>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;