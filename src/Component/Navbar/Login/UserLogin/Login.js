import React from "react";
import login from "./login.module.css";
import CustomerLogin from "./CustomerLogin";

const Login = () => {
  
  return (
    <div className={login.bg}>
      <CustomerLogin />
    </div>
  );
};
export default Login;
