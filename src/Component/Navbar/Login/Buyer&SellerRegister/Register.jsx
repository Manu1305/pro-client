import React, { useState } from "react";
import register from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import CustomerRegister from "./BuyerRegistration/CustomerRegister";
// import {SellerRegister} from "./SellerLogin/ProfileForm/SellerRegistration";

const Register = () => {
  const [selectedLoginType, setSelectedLoginType] = useState("customer");
  const navigate = useNavigate();
  const handleLoginTypeChange = (loginType) => {
    setSelectedLoginType(loginType);
  };

  function storepage() {
    navigate("/sellerregistration");
  }
  return (
    <div className={register.bg}>

      <div className={register["login-tabs"]}>
        
        <div className="p-4 d-flex justify-around">
          <div>
            <button
              className={`${
                selectedLoginType === "customer" && "active"
              }`}
              onClick={() => handleLoginTypeChange("customer")}
            style={{backgroundColor:'orangered',borderRadius:'5px'}}
            >
              CUSTOMER REGISTER
            </button>
          </div>
          <div>
            <button
              className={` ${
                selectedLoginType === "seller" && "active"
              }`}
              onClick={() => storepage()}
              style={{backgroundColor:'orangered',borderRadius:'5px'}}
            >
              SELLER REGISTER
            </button>
          </div>
        </div>
        {/* </form> */}
      </div>
      {selectedLoginType === "customer" && (
        <div className={register["customer-login"]}>
          <CustomerRegister />
        </div>
      )}
      {selectedLoginType === "seller" && (
        <div className={register["seller-login"]} onClick={storepage}></div>
      )}
     
    </div>
  );
};

export default Register;
