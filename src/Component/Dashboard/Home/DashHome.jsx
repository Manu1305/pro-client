import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./dashboard.css";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Badge } from "@mui/material";

function DashHome() {
  const user = useSelector((state) => state.userReducer.user);

  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  const dashboardList = [
    {
      id: 1,
      list: "Dashboard",
      to: "/dashboard/chart-deatils",
      icon: <HomeIcon />,
    },
    {
      id: 2,
      list: "Product Requests",
      to: "/dashboard/product-requsets",
      icon: <CallReceivedIcon />,
    },
    {
      id: 3,
      list: "Add Product",
      to: "/dashboard/add-products",
      icon: <ControlPointIcon />,
    },
    {
      id: 4,
      list: "Products",
      to: "/dashboard/all-products",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
    },
    {
      id: 5,
      list: "My Orders",
      to: "/dashboard/my-orders",
      icon: <LocalMallIcon />,
    },
    {
      id: 6,
      list: "All Orders",
      to: "/dashboard/all-orders",
      icon: <AllInboxIcon />,
    },
    {
      id: 7,
      list: "Withdraw",
      to: "/dashboard/withdraw-details",
      icon: <AccountBalanceIcon />,
    },
    {
      id: 8,
      list: "Return Requests",
      to: "/dashboard/return-order-requests",
      icon: <KeyboardReturnIcon />,
    },
    {
      id: 9,
      list: "Users Management",
      to: "/dashboard/user-management",
      icon: <SupervisedUserCircleIcon />,
    },
    {
      id: 10,
      list: "Seller Management",
      to: "/dashboard/premium-sellers",
      icon: <ManageAccountsIcon />,
    },
    {
      id: 11,
      list: "Deliver Deatils",
      to: "/dashboard/assign-delivery-order",
      icon: <ManageAccountsIcon />,
    },
  ];

  const sellerDashboard = [
    {
      id: 1,
      list: "Dashboard",
      to: "/dashboard/chart-deatils",
      icon: <HomeIcon />,
    },
    {
      id: 2,
      list: "Notification",
      to: "/dashboard/notifications",
      icon: (
        <Badge color="secondary" badgeContent={10}>
          <NotificationsIcon />
        </Badge>
      ),
    },
    {
      id: 3,
      list: "Add Product",
      to: "/dashboard/add-products",
      icon: <ControlPointIcon />,
    },
    {
      id: 4,
      list: "Products",
      to: "/dashboard/all-products",
      icon: <i className="fa-solid fa-cart-shopping"></i>,
    },
    {
      id: 5,
      list: "My Orders",
      to: "/dashboard/my-orders",
      icon: <LocalMallIcon />,
    },
    {
      id: 6,
      list: "Withdraw",
      to: "/dashboard/withdraw-details",
      icon: <AccountBalanceIcon />,
    },
  ];

  const deliveryDashboard = [
    {
      id: 1,
      list: "Assign Delivery",
      to: "/dashboard/assign-return-delivery",
      icon: <LocalShippingIcon />,
    },
    {
      id: 2,
      list: "Return Delivery",
      to: "/dashboard/assign-delivery",
      icon: <LocalShippingIcon style={{ transform: 'scaleX(-1)' }}/>,
    },
  ];

  return (
    <div>
      <div class="dash-sidebar">
        {/* <div className="Link "> */}
        {user.urType === "admin"
          ? dashboardList.map((item) => (
              <>
                <Link
                  to={item.to}
                  className={
                    "/" + splitLocation[1] + "/" + splitLocation[2] === item.to
                      ? "active"
                      : ""
                  }
                  key={item.id}
                >
                  {item.icon}
                  <span className="dash-icon-item">{item.list}</span>
                </Link>
              </>
            ))
          : user.urType === "seller"
          ? sellerDashboard.map((item) => (
              <Link
                to={item.to}
                className={
                  "/" + splitLocation[1] + "/" + splitLocation[2] === item.to
                    ? "active"
                    : ""
                }
                key={item.id}
              >
                {item.icon}
                <span className="dash-icon-item">{item.list}</span>
              </Link>
            ))
          : deliveryDashboard.map((item) => (
              <Link
                to={item.to}
                className={
                  "/" + splitLocation[1] + "/" + splitLocation[2] ===
                  item.to
                    ? "active"
                    : ""
                }
              >
                {item.icon}
                <span className="dash-icon-item">{item.list}</span>
              </Link>
            ))}
        {/* </div> */}
      </div>
      <div className="dash-content">
        <Outlet />
      </div>
    </div>
  );
}

export default DashHome;
