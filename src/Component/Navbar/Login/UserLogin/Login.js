
import React, { useState } from "react";
import { Link } from "react-router-dom";
import login from "./login.module.css"
import CustomerLogin from './CustomerLogin'


const Login = () => {
  const [selectedLoginType, setSelectedLoginType] = useState("customer");
  

 

  const handleLoginTypeChange = (loginType) => {
    setSelectedLoginType(loginType);
  };

  return (
    <div className={login.bg}>
      {/* <img src="../Image/loginHor.jpg"/> */}
      <h2 className="mt-5">Login</h2>
   
      {selectedLoginType === "customer" && (
        <div className="customer-login">
          <CustomerLogin/>
        </div>
      )}
      {selectedLoginType === "seller" && (
        <div className={login.bg["seller-login"]}>
          <h1> seller login</h1>
        </div>
      )}
   
    </div>
  );
};
export default Login


 
