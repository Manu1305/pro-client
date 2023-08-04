// import React from "react";
// import styless from "./Payment.module.css"
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";

// function PaymentSuccess() {
//   const navigate = useNavigate();

//   //   serach params hook to get params
//   const searchQuery = useSearchParams()[0];

//   // payment id
//   const refernce = searchQuery.get("reference");

// //   navigate to oreders page
//   const takeOredersPage = () => {
//     navigate("/buyerOrder");
//   };

//   return (
//     <div className={styless.design}>

//       {/* <h1>payment Successfull</h1>
//       <p>Payment Id : {JSON.stringify(refernce)}</p>
//       <button className="btn btn-primary" onClick={takeOredersPage}>
//         Go To Orders
//       </button> */}
//     </div>
//   );
// }

// export default PaymentSuccess;
// import React from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import styless from "./Payment.module.css";
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";

// const PaymentSuccess = () => {
//   const navigate = useNavigate();

//   //   serach params hook to get params
//   const searchQuery = useSearchParams()[0];

//   // payment id
//   const refernce = searchQuery.get("reference");

//   //   navigate to oreders page
//   const takeOredersPage = () => {
//     navigate("/buyerOrder");
//   };

//   return (
//     <div className={`${styless.bg}`}>
//       <h2>Payment Success</h2>
//       <div className={`${styless.sliderContainer}`}>
//         <div className="">
//           <div className={styless.customerheading}>
//             <p>Payment Id : {JSON.stringify(refernce)}</p>
//           </div>
//           {/* <h5 className={styless.title}>{productItems.title}</h5> */}
//           <button className="btn btn-primary" onClick={takeOredersPage}>
//             Go To Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default PaymentSuccess;

import React from "react";
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