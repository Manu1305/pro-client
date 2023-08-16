
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
      <h2 >Login</h2>
   
      {selectedLoginType === "customer" && (
        <div className="customer-login">
          <CustomerLogin/>
        </div>
      )}
         
    </div>
  );
};
export default Login


 
