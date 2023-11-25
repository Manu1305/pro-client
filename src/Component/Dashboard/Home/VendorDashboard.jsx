import React from "react";
import DashCharts from "./Charts/DashCharts";

function VendorDashboard({handleLoginTypeChange,products}) {

  
  return (
    <div className="container">
      <div className="component">
        <DashCharts handleLoginTypeChange={handleLoginTypeChange} products={products} />
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
