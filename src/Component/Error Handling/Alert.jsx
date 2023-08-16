import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Alert = ({}) => {

  const msg = useSelector()
  console.log("Alert")
  const notify = () => toast(msg);
  useEffect(() => {
    notify()
  },[])

  return (
    <div>
      <ToastContainer />
    </div>
  );
};
