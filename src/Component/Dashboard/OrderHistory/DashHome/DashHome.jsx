// import React from "react";
// import Saleandrevenue from "./Saleandrevenue";
// import SaleChart from "./SaleChart";
// import ChartData from "../../Home/ChartData";
// import Recentsales from "./Recentsales";

// function DashHome() {
//   return (
//     <div>
//       <Saleandrevenue />
//       <SaleChart/>
//       {/* <ChartData /> */}
//       <Recentsales />
//     </div>
//   );
// }

// export default DashHome;



import React from "react";
import Saleandrevenue from "./Saleandrevenue";
import SaleChart from "./SaleChart";
import ChartData from "../../Home/ChartData";
import Recentsales from "./Recentsales";
import "./Dhome.css"
import Chart from "./Dashdata/Chart/Chart"
import Topbox from "./Dashdata/TopBox/TopBox";
import BarChart from "./Dashdata/Chart/Barchart";
function DashHome() {
  return (
    <div>
    <div className="home">
      <div className="box box1"> 
      <Topbox/> </div>
      <div className="box box2">box  <Chart/> </div>
      {/* <div className="box box3">box  <BarChart/></div> */}
      <div className="box box4">box  <Chart/> </div>
      <div className="box box5">box  <Chart/> </div>
      <div className="box box6">box   6</div>
      <div className="box box7">box   7</div>
      <div className="box box8">box   8</div>
      <div className="box box9">box   9</div>
      
    </div>
    
    
        </div>
      )
    }


export default DashHome;
