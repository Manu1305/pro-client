import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Component/App";
import { Provider } from "react-redux";
import store from "./Redux/store";
import "./index.css";
import Dashnew from "./Component/Navbar/Profile/SellerDashboard/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
   <App/>
   {/* <Dashnew/> */}

  </Provider>
);
