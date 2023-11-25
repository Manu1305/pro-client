import React, { useState } from "react";
import { ProductSec } from "../../../Dashboard/Product/Product";
import dash from "./sellerDash.module.css";
import { ProductRequest } from "../../../Dashboard/Product Request/ProductReq";
import { useSelector } from "react-redux";
import VendorDashboard from "../../../Dashboard/Home/VendorDashboard";
import { AllUsers } from "../../../Dashboard/User Management/AllUsers";
import AdminWithdrawControl from "../../../Dashboard/Withdraw/Admin/AdminWithdrawControl";
import SellerOrder from "../../../Dashboard/Order/SellerOrder/SellerOrder";
import Withdraw from "../../../Dashboard/Withdraw/Withdraw";
import { ReturnReq } from "../../../Dashboard/Return Request/ReturnReq/ReturnReq";
import { ReturnDelivery } from "../../../Dashboard/Delivery/Return Delivery/ReturnDelivery";
import DeliveryDash from "../DeliveryDashBoard/Deliverydash";
import OrderHistory from "../../../Dashboard/Order/Orderhistory";
// import AddProduct from "./ProductSec/Addproduct";
import { PremiumSellers } from "../../../Dashboard/User Management/seller/PremiumSeller";

const SellerDashboard = ({ products }) => {
  const user = useSelector((state) => state.userReducer.user);
  const [selectedLoginType, setSelectedLoginType] = useState("dashboard");

  const handleLoginTypeChange = (loginType) => {
    setSelectedLoginType(loginType);
  };
  return (
    <div className={dash.mainDiv}>
      <div className={dash.sidebar}>
        <div className={dash.sidebar_items}>
          {(user?.urType === "admin" || user?.urType === "seller") && (
            <li
              className={dash.item}
              onClick={() => handleLoginTypeChange("dashboard")}
            >
              <i className="fa fa-dashboard"></i>
              <span className={dash.nombres}>
                <button
                  className={`login-tab ${
                    selectedLoginType === "dashboard" && "active"
                  }`}
                >
                  Dashboard
                </button>
              </span>
            </li>
          )}
          {user?.urType === "admin" && (
            <li
              className={dash.item}
              onClick={() => handleLoginTypeChange("productReq")}
            >
              <i className="fa-solid fa-box-open"></i>
              <span className={dash.nombres}>
                <button
                  className={`login-tab ${
                    selectedLoginType === "productReq" && "active"
                  }`}
                >
                  ProductRequest
                </button>
              </span>
            </li>
          )}

          {user?.urType === "admin" && (
            <li
              className={dash.item}
              onClick={() => handleLoginTypeChange("premium")}
            >
              <i className="fa fa-star" aria-hidden="true"></i>
              <span className={dash.nombres}>
                <button
                  className={`login-tab ${
                    selectedLoginType === "premium" && "active"
                  }`}
                >
                  Premium Sellers
                </button>
              </span>
            </li>
          )}

          {(user?.urType === "seller" || user?.urType === "admin") && (
            <li
              className={dash.item}
              onClick={() => handleLoginTypeChange("product")}
            >
              <i className="fa-brands fa-product-hunt"></i>
              <span className={dash.nombres}>
                <button
                  className={`login-tab ${
                    selectedLoginType === "product" && "active"
                  }`}
                >
                  Product
                </button>
              </span>
            </li>
          )}
          {(user?.urType === "admin" || user?.urType === "seller") && (
            <li
              className={dash.item}
              onClick={() => handleLoginTypeChange("AddProduct")}
            >
              <i className="fa fa-cart-plus" aria-hidden="true"></i>
              <span className={dash.nombres}>
                <button
                  className={`login-tab ${
                    selectedLoginType === "AddProduct" && "active"
                  }`}
                >
                  Add Product
                </button>
              </span>
            </li>
          )}
          {user?.urType === "admin" && (
            <li
              className={dash.item}
              onClick={() => handleLoginTypeChange("order0")}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span className={dash.nombres}>
                <button
                  className={`login-tab ${
                    selectedLoginType === "order0" && "active"
                  }`}
                >
                  SellerOrder
                </button>
              </span>
            </li>
          )}
          {(user?.urType === "admin" || user?.urType === "seller") && (
            <li
              className={dash.item}
              onClick={() => handleLoginTypeChange("order")}
            >
              <i className="fa-brands fa-first-order"></i>
              <span className={dash.nombres}>
                <button
                  className={`login-tab ${
                    selectedLoginType === "order" && "active"
                  }`}
                >
                  Orders Request
                </button>
              </span>
            </li>
          )}

          {user?.urType === "seller" && (
            <li
              className={dash.item}
              onClick={() => handleLoginTypeChange("Withdraw")}
            >
              <i className="fa-sharp fa-solid fa-sack-dollar"></i>
              <span className={dash.nombres}>
                <button
                  className={`login-tab ${
                    selectedLoginType === "Withdraw" && "active"
                  }`}
                >
                  Withdraw
                </button>
              </span>
            </li>
          )}
          {user?.urType === "admin" && (
            <li
              className={dash.item}
              onClick={() => handleLoginTypeChange("Withdrawdetails")}
            >
              <i className="fa-sharp fa-solid fa-sack-dollar"></i>
              <span className={dash.nombres}>
                <button
                  className={`login-tab ${
                    selectedLoginType === "Withdrawdetails" && "active"
                  }`}
                >
                  Withdraws Details
                </button>
              </span>
            </li>
          )}

          {user?.urType === "admin" && (
            <li
              className={dash.item}
              onClick={() => handleLoginTypeChange("usermanagement")}
            >
              <i className="fa-solid fa-user"></i>
              <span className={dash.nombres}>
                <button
                  //   to="/product"
                  className={`login-tab ${
                    selectedLoginType === "usermanagement" && "active"
                  }`}
                >
                  UserManagement
                </button>
              </span>
            </li>
          )}

          {user?.urType === "delivery" && (
            <li
              className={dash.item}
              onClick={() => handleLoginTypeChange("settings")}
            >
              <i className="fa-sharp fa-solid fa-gears"></i>
              <span className={dash.nombres}>
                <button
                  //   to="/product"
                  className={`login-tab ${
                    selectedLoginType === "product" && "active"
                  }`}
                >
                  DeliveryDash
                </button>
              </span>
            </li>
          )}

          {user?.urType === "delivery" && (
            <li
              className={dash.item}
              onClick={() => handleLoginTypeChange("returndel")}
            >
              <i className="fa-solid fa-rotate-left"></i>
              <span className={dash.nombres}>
                <button
                  //   to="/product"
                  className={`login-tab ${
                    selectedLoginType === "returndel" && "active"
                  }`}
                >
                  Return Orders
                </button>
              </span>
            </li>
          )}
          {user?.urType === "admin" && (
            <li
              className={dash.item}
              onClick={() => handleLoginTypeChange("return")}
            >
              <i className="fa-solid fa-rotate-left"></i>
              <span className={dash.nombres}>
                <button
                  //   to="/product"
                  className={`login-tab ${
                    selectedLoginType === "return" && "active"
                  }`}
                >
                  Return Req
                </button>
              </span>
            </li>
          )}
        </div>
      </div>
      <div className={dash.content}>
        <div>
          {selectedLoginType === "dashboard" && (
            <div className={dash["dashboard-login"]}>
              <VendorDashboard
                handleLoginTypeChange={handleLoginTypeChange}
                products={products}
              />
            </div>
          )}
          {selectedLoginType === "product" && (
            <div className={dash["product-login"]}>
              <ProductSec />
            </div>
          )}
          {selectedLoginType === "return" && (
            <div className={dash["return-login"]}>
              <ReturnReq />
            </div>
          )}
          {selectedLoginType === "Withdrawdetails" && (
            <div className={dash["Withdrawdetails-login"]}>
              <AdminWithdrawControl />
            </div>
          )}
          {selectedLoginType === "usermanagement" && (
            <div className={dash["reversewith-login"]}>
              <AllUsers />
              {/* reversewithdraw */}
            </div>
          )}
          {selectedLoginType === "order0" && (
            <div className={dash["product-login"]}>
              <SellerOrder />
            </div>
          )}
          {selectedLoginType === "order" && (
            <div className={dash["order-login"]}>
              <OrderHistory />
            </div>
          )}
          {selectedLoginType === "Withdraw" && (
            <div className={dash["Withdraw-login"]}>
              <Withdraw />
            </div>
          )}
          {selectedLoginType === "settings" && (
            <div className={dash["Settings"]}>
              <DeliveryDash />
            </div>
          )}
          {selectedLoginType === "returndel" && (
            <div className={dash["returndel"]} style={{ marginLeft: "200px" }}>
              <ReturnDelivery />
            </div>
          )}

          {selectedLoginType === "productReq" && (
            <div className={dash["productRequest"]}>
              <ProductRequest />
            </div>
          )}
          {selectedLoginType === "AddProduct" && (
            <div className={dash["AddProduct"]}>
              {/* <AddProduct /> */}
            </div>
          )}
          {selectedLoginType === "premium" && (
            <div className={dash["AddProduct"]}>
              <PremiumSellers />
            </div>
          )}
        </div>
      </div>

      {/* </div> */}
    </div>
  );
};

export default SellerDashboard;
