import React from "react";
import DashCharts from "./Charts/DashCharts";

function VendorDashboard({handleLoginTypeChange,products}) {

  return (
    <div className="container">
      <div className="component">
        <DashCharts handleLoginTypeChange={handleLoginTypeChange} products={products} />
      </div>
      
    </div>
  );
}

export default VendorDashboard;
