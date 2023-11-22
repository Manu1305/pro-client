import React from "react";
import { BrowserRouter, Link, Outlet } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "../Navbar/Profile/SellerDashboard/ProductSec/Addproduct";
import "./dashboard.css";
import Dash from "./Dash";
import { ProductRequest } from "../Navbar/Profile/AdminDashboard/ProductReq";
import Product from './../Navbar/Profile/SellerDashboard/Vendor/VendorComponent/Products/Products';
import { PremiumSellers } from "../Navbar/Profile/SellerDashboard/PremiumSellers/PremiumSeller";
import { WithdrawSec } from './../Navbar/Profile/SellerDashboard/WithdrawSec/WithdrawSec';

function DashHome() {
  const dashboardList = [
    {
      id: 1,
      list: "Dashboard",
      to: "/dashboard",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
    },
    {
      id: 2,
      list: "Product Requests",
      to: "/dashboard/product-requsets",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
    },
    {
      id: 3,
      list: "Add Product",
      to: "/dashboard/add-products",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
    },
    {
      id: 4,
      list: "Products",
      to: "/dashboard/products",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
    },
    {
      id: 5,
      list: "Orders",
      to: "/dashboard/orders",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
    },
    {
      id: 6,
      list: "Seller Orders",
      to: "/dashboard/seller-orders",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
    },
    {
      id: 7,
      list: "Withdraw",
      to: "/dashboard/withdraw-details",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
    },
    {
      id: 8,
      list: "Return Requests",
      to: "/dashboard/return-requests",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
    },
    {
      id: 9,
      list: "User Management",
      to: "/dashboard/user-management",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
    },
    {
      id: 10,
      list: "Withdraw",
      to: "/dashboard/premium-sellers",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
    },
  ];

  return (
    <div>
      <div class="dash-sidebar">
        {dashboardList.map((item) => (
          <div className="flex" key={item.id}>
            <div>
              <Link to={item.to}>{item.icon}</Link>
            </div>
            <div>{item.list}</div>
          </div>
        ))}
      </div>
      <div className="dash-content">
      <Outlet/>
      </div>
    </div>
  );
}

export default DashHome;
