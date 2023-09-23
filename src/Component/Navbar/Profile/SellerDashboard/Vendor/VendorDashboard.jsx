import React from "react";
import styles from "./VendorDashboard.module.css";
import Overall from "./VendorComponent/Overall";
import Orders from "./VendorComponent/Orders/Orders";
import Products from "./VendorComponent/Products/Products";
import DashHome from "../../../../Dashboard/OrderHistory/DashHome/DashHome";

function VendorDashboard({handleLoginTypeChange,products}) {

  
  return (
    <div className="container">
      <div className="component">
        <DashHome handleLoginTypeChange={handleLoginTypeChange} products={products} />
      </div>
      <div className="component">
        {/* <Orders /> */}
      </div>
      <div className="component">
        {/* <Products /> */}
      </div>
    </div>
  );
}

export default VendorDashboard;
