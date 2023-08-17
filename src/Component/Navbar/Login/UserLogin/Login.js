import React, { useState } from "react";
import { Link } from "react-router-dom";
import login from "./login.module.css";
import CustomerLogin from "./CustomerLogin";

const Login = () => {
  const [selectedLoginType, setSelectedLoginType] = useState("customer");

  const handleLoginTypeChange = (loginType) => {
    setSelectedLoginType(loginType);
  };

  return (
    <div className={login.bg}>
      <CustomerLogin />
    </div>
  );
};
export default Login;
