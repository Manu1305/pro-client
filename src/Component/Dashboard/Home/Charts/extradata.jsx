import React, { useEffect, useState } from "react";
import httpService from "../../../Error Handling/httpService";
import { apiURL } from "../../../../const/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ExtraData({
  Allproductlength,
  productrequestlength,
  handleLoginTypeChange,
}) {
  const user = useSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  const [ordersLength, setOrdersLength] = useState([]);
  const [totalsales, setTotalSales] = useState("");
  const [userLength, setUsersLength] = useState("");

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
      // setOrders(res.data)
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
    getUsers();
  }, []);

  const data = [
    {
      icon: "fa-solid fa-person-half-dress fa-3x text-danger",
      label: "Total Products",
      value: Allproductlength,
      link: "/dashboard/all-products",
    },
    {
      icon: "fa-solid fa-list-check fa-3x text-danger",
      label: "Pending Req",
      value: productrequestlength,
      link: "/dashboard/product-requsets",
    },
    {
      icon: "fa fa-chart-area fa-3x text-danger",
      label: "Total Orders",
      value: ordersLength,
      link: "/dashboard/my-orders",
    },
  ];
  if (user && user.urType != "seller") {
    data.push({
      icon: "fa-solid fa-users fa-3x text-danger",
      label: "Total Users",
      value: userLength,
      link: "/dashboard/user-management",
    });
  }

  return (
    <div>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          {data.map((item, index) => (
            <div className="col-sm-6 col-xl-3" key={index}>
              <div
                className="bg-light rounded d-flex align-items-center justify-content-between p-4"
                onClick={() => {
                  navigate(item.link);
                }}
                style={{ backgroundColor: "#D9D3D3" }}
              >
                <i className={item.icon}></i>
                <div className="ms-3">
                  <p
                    className="mb-2"
                    style={{ fontWeight: "bolder", color: "black" }}
                  >
                    {item.label}
                  </p>
                  <h6 className="mb-0">{item.value}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExtraData;
