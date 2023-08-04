// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import register from "./Register.module.css";

// import CustomerRegister from "./BuyerRegistration/CustomerRegister";
// // import {SellerRegister} from "./SellerLogin/ProfileForm/SellerRegistration";
// import { StorePage } from "./SellerRegistration/RegistrationPage";

// export const Register = () => {
//   const [selectedLoginType, setSelectedLoginType] = useState("customer");

//   const handleLoginTypeChange = (loginType) => {
//     setSelectedLoginType(loginType);
//   };

//   return (
//     <div className={register.bg}>
//       {/* <img src="../Image/loginHor.jpg" /> */}

//       <div className={register["login-tabs"]}>
//         {/* <form> */}
//         <button
//           className={`login-tab ${
//             selectedLoginType === "customer" && "active"
//           }`}
//           onClick={() => handleLoginTypeChange("customer")}
//         >
//           CUSTOMER REGISTER
//         </button>
//         <br></br>
//         <button
//           className={`login-tab ${selectedLoginType === "seller" && "active"}`}
//           onClick={() => handleLoginTypeChange("seller")}
//         >
//           SELLER REGISTER
//         </button>
//         {/* </form> */}
//       </div>
//       {selectedLoginType === "customer" && (
//         <div className={register["customer-login"]}>
//           <CustomerRegister />
//         </div>
//       )}
//       {selectedLoginType === "seller" && (
//         <div className={register["seller-login"]}>
//           {/* Seller Login Form */}
//           <StorePage />
//           {/* <h1> seller login</h1> */}
//         </div>
//       )}
//       {/* <div>
//         Don't have an account? <Link to="/login/register">Register</Link>
//       </div> */}
//     </div>
//   );
// };

// manu

import React, { useState } from "react";
import { Link } from "react-router-dom";
import register from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import CustomerRegister from "./BuyerRegistration/CustomerRegister";
// import {SellerRegister} from "./SellerLogin/ProfileForm/SellerRegistration";
import { StorePage } from "./SellerRegistration/RegistrationPage";

 const Register = () => {
  const [selectedLoginType, setSelectedLoginType] = useState("customer");
const navigate =useNavigate()
  const handleLoginTypeChange = (loginType) => {
    setSelectedLoginType(loginType);
  };

  function storepage() {
    navigate("/sellerregistration")
  }
  return (
    <div className={register.bg}>
      {/* <img src="../Image/loginHor.jpg" /> */}

      <div className={register["login-tabs"]}>
        {/* <form> */}
        <button
          className={`login-tab ${
            selectedLoginType === "customer" && "active"
          }`}
          onClick={() => handleLoginTypeChange("customer")}
        >
          CUSTOMER REGISTER
        </button>
        <br></br>
        <button
          className={`login-tab ${selectedLoginType === "seller" && "active"}`}
          onClick={() => storepage()}
        >
          SELLER REGISTER
        </button>
        {/* </form> */}
      </div>
      {selectedLoginType === "customer" && (
        <div className={register["customer-login"]}>
          <CustomerRegister />
        </div>
      )}
      {selectedLoginType === "seller" && (
        <div className={register["seller-login"]} onClick={storepage}>
         
        
        
        </div>
      )}
      {/* <div>
        Don't have an account? <Link to="/login/register">Register</Link>
      </div> */}
    </div>
  );
};

export default Register