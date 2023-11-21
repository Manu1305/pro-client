import React, { useEffect, useState } from "react";
import Saleandrevenue from "./Saleandrevenue";
import SaleChart from "./SaleChart";
import Recentsales from "./Recentsales";
import ExtraData from "./extradata";
import httpService from "../../../Error Handling/httpService";
import { apiURL } from "../../../../const/config";
import CategoryPieChart from "./Dashdata/CategoryPieChart";
import { useSelector } from "react-redux";
import styles from './DashHome.module.css'
import Adminfee from "./Dashdata/Adminfee";

function DashHome({handleLoginTypeChange,products}) {
  const [orders,setOrders]=useState([])
  const [ordersLength, setOrdersLength] = useState([]);
const [totalsales,setTotalSales]=useState('')
const [userLength,setUsersLength]=useState('')
const[customerLength,setCustomerLength]=useState('')
const[sellerLength,setSellerLength]=useState('')
const[Allproductlength,setAllproductlength]=useState('')
const[productrequestlength,setproductrequestlength]=useState('')
const [fee,setFee]=useState()

  const user = useSelector((state) => state.userReducer.user);
  const getOrders = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await httpService.get( 
        `${apiURL}/orders/get-all-orders`,
        config
      );
      console.log("mmmmmmm", res.data);
      setOrders(res.data)
      
      const orders = res.data
     const totalorderlength= res.data.length
      // const filteredProducts = res.data.filter(
        
      //   (product) => product.seller === user.email
      // );
      setOrdersLength(totalorderlength)
      console.log("Products:", orders);
      const totalProductPrice = res.data.reduce((total, product) => {
        return total + product.ordPrc;
      }, 0);
      setTotalSales(totalProductPrice)
  
      console.log("Total Product Price:", totalProductPrice);
      // setOrders(orders);
      
    } catch (error) {
      console.log(error);
      // setOrders([]);
    }
  };
  const getUsers = async () => {
    try {
      const res = await httpService.get(`${apiURL}/user/allUserData`);
      console.log("users", res.data);
      setUsersLength(res.data.length);
      if(res.data.urType=='buyer'){
        setCustomerLength(res.data.length)
      }
      if(res.data.urType=='seller'){
        setSellerLength(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  const getProductrequest = async () => {
    await httpService
      .post(`${apiURL}/product/requested-Products`, {
        type: user.urType,
        seller: user.email,        
      })
      .then((res) => {
       
        setproductrequestlength(res.data.length);
      })
      .catch((Err) => console.log(Err));
  };

  useEffect(() => {
    getOrders();
    getUsers();
    getProductrequest()
  }, []);

  return (
    <div>
      <Saleandrevenue
        userLength={userLength}
        totalsales={totalsales}
        ordersLength={ordersLength}
        handleLoginTypeChange={handleLoginTypeChange}
      />
      <div className="flex flex-row">
      <SaleChart  />
      {user.urType === "admin" && <Adminfee fee={fee}/>}
      </div>
      
      <ExtraData Allproductlength={products} 
       productrequestlength={productrequestlength}
        handleLoginTypeChange={handleLoginTypeChange} />
<div  className={styles.dives}>
<Recentsales />
      <CategoryPieChart/>
</div>
{/* <UserChart customerLength={customerLength} sellerLength={sellerLength}/> */}
    </div>
  );
}

export default DashHome;

// import React from "react";
// import Saleandrevenue from "./Saleandrevenue";
// import SaleChart from "./SaleChart";
// import ChartData from "../../Home/ChartData";
// import Recentsales from "./Recentsales";
// import "./Dhome.css"
// import Chart from "./Dashdata/Chart/Chart"
// import Topbox from "./Dashdata/TopBox/TopBox";
// import BarChart from "./Dashdata/Chart/Barchart";
// function DashHome() {
//   return (
//     <div>
//     <div className="home">
//       <div className="box box1">
//       <Topbox/> </div>
//       <div className="box box2">box  <Chart/> </div>
//       {/* <div className="box box3">box  <BarChart/></div> */}
//       <div className="box box4">box  <Chart/> </div>
//       <div className="box box5">box  <Chart/> </div>
//       <div className="box box6">box   6</div>
//       <div className="box box7">box   7</div>
//       <div className="box box8">box   8</div>
//       <div className="box box9">box   9</div>

//     </div>

//         </div>
//       )
//     }

// export default DashHome;
