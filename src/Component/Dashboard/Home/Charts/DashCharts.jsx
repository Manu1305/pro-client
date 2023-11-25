import React, { useEffect, useState } from "react";
import Saleandrevenue from "./Saleandrevenue";
import SaleChart from "./SaleChart";
import Recentsales from "./Recentsales";
import ExtraData from "./extradata";
import httpService from "../../../Error Handling/httpService";
import { apiURL } from "../../../../const/config";
import CategoryPieChart from "./CategoryPieChart";
import { useSelector } from "react-redux";
import styles from "./DashCharts.module.css";
import Adminfee from "../Admin Fee/Adminfee";

function DashCharts({ handleLoginTypeChange, products }) {
  const [orders, setOrders] = useState([]);
  const [ordersLength, setOrdersLength] = useState([]);
  const [totalsales, setTotalSales] = useState("");
  const [userLength, setUsersLength] = useState("");
  const [customerLength, setCustomerLength] = useState("");
  const [sellerLength, setSellerLength] = useState("");
  const [productrequestlength, setproductrequestlength] = useState("");
  const [fee, setFee] = useState();

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
      setOrders(res.data);

      const orders = res.data;
      const totalorderlength = res.data.length;
      // const filteredProducts = res.data.filter(

      //   (product) => product.seller === user.email
      // );
      setOrdersLength(totalorderlength);
      console.log("Products:", orders);
      const totalProductPrice = res.data.reduce((total, product) => {
        return total + product.ordPrc;
      }, 0);
      setTotalSales(totalProductPrice);

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
      if (res.data.urType == "buyer") {
        setCustomerLength(res.data.length);
      }
      if (res.data.urType == "seller") {
        setSellerLength(res.data);
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
    getProductrequest();
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
        <SaleChart />
        {user.urType === "admin" && <Adminfee fee={fee} />}
      </div>

      <ExtraData
        Allproductlength={products}
        productrequestlength={productrequestlength}
        handleLoginTypeChange={handleLoginTypeChange}
      />
      <div className={styles.dives}>
        <Recentsales />
        <CategoryPieChart />
      </div>
    </div>
  );
}

export default DashCharts;
