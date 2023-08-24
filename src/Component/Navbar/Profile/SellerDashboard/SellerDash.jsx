import React, { useState } from "react";
import { ProductSec } from "./ProductSec/Product";
import dash from "./sellerDash.module.css";
import { ProductRequest } from "../AdminDashboard/ProductReq";

import { useSelector, useDispatch } from "react-redux";

import VendorDashboard from "./Vendor/VendorDashboard";
import UserTable, {
  ReverseWithdrawSec,
} from "./ReverseWithdraw/ReverseWithdrawSec";
import AdminWithdrawControl from "../AdminDashboard/AdminWithdrawSec/AdminWithdrawControl";
import { OrderSec } from "./OrderSec/OrderSec";
import SellerOrder from "../AdminDashboard/SellerOrder/SellerOrder";
import Withdraw from "../../../Dashboard/Withdraw/Withdraw";
import { ReturnReq } from "../AdminDashboard/ReturnReq/ReturnReq";
import { ReturnDelivery } from "../DeliveryDashBoard/ReturnDelivery/ReturnDelivery";

import DeliveryDash from "../DeliveryDashBoard/Deliverydash";
const SellerDashboard = () => {
  const user = useSelector((state) => state.userReducer.user);
  // const dispatch = useDispatch()
  const [selectedLoginType, setSelectedLoginType] = useState("dashboard");

  const handleLoginTypeChange = (loginType) => {
    setSelectedLoginType(loginType);
  };
  return (
    <div className={dash.mainDiv}>
      {/* <div className={dash.body}> */}
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

            {(user?.urType === "seller" || user?.urType === "admin") && (
              <li
                className={dash.item}
                onClick={() => handleLoginTypeChange("product")}
              >
               <i class="fa-brands fa-product-hunt"></i>
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
                <i class="fa-brands fa-first-order"></i>
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

            {(user?.urType === "admin" ) && (
              <li
                className={dash.item}
                onClick={() => handleLoginTypeChange("reversewith")}
              >
                <i class="fa-solid fa-user"></i>
                <span className={dash.nombres}>
                  <button
                    //   to="/product"
                    className={`login-tab ${
                      selectedLoginType === "reversewith" && "active"
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
                <i class="fa-solid fa-rotate-left"></i>
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
               <i class="fa-solid fa-rotate-left"></i>
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
          {selectedLoginType === "dashboard" && (
            <div className={dash["dashboard-login"]}>
              <VendorDashboard />
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
          {selectedLoginType === "reversewith" && (
            <div className={dash["reversewith-login"]}>
              <UserTable />
              {/* reversewithdraw */}
            </div>
          )}
          {selectedLoginType === "order0" && (
            <div
              className={dash["product-login"]}
              style={{ marginLeft: "200px" }}
            >
              <SellerOrder />
            </div>
          )}
          {selectedLoginType === "order" && (
            <div
              className={dash["order-login"]}
              style={{ marginLeft: "200px" }}
            >
              <OrderSec />
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
        </div>
      {/* </div> */}
    </div>
  );
};

export default SellerDashboard;
