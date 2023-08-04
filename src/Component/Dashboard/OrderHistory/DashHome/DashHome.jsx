import React from "react";
import Saleandrevenue from "./Saleandrevenue";
import SaleChart from "./SaleChart";
import ChartData from "../../Home/ChartData";
import Recentsales from "./Recentsales";

function DashHome() {
  return (
    <div>
      <Saleandrevenue />
      {/* <SaleChart/> */}
      {/* <ChartData /> */}
      <Recentsales />
    </div>
  );
}

export default DashHome;
