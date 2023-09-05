import React, { useEffect, useState } from "react";
// import styles from "./Orderhistory.module.css";
import styles from "./Orderhistory.module.css";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import RedyToPick from "./seller/RedyToPick";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";

const OrderHistory = () => {
  const user = useSelector((state) => state.userReducer.user);

  const [orders, setOrders] = useState([]);

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
      const filteredProducts = res.data.filter(
        (product) => product.seller === user.email
      );
      console.log("Filtered Products:", filteredProducts);
      setOrders(filteredProducts);
    } catch (error) {
      console.log(error);
      setOrders([]);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={styles.tableWrapper}>
    <div className={`d-flex  ${styles.tableWrapper}`}>
      {orders.length === 0 ? (
        <div className="text-center">
          <img
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=740&t=st=1692361382~exp=1692361982~hmac=ad51a1df0bb656b800860f3339a091ebf21dc19e7d3d334f2db23126f6c863e5" // Replace with the path to your empty image
            alt="No orders"
           
          />
          <p>No orders available.</p>
        </div>
      ) : (
        orders.map((order, index) => (
          <Card key={index} className={`m-2 ${styles.orderCard}`}>
            <Card.Body>
              <Card.Title>Order: {index + 1}</Card.Title>
              <img
                src="../Image/hiLogo.jpg"
                alt=""
                style={{ width: "45px", height: "45px" }}
                className={`rounded-circle ${styles.imgcircle}`}
              />
              <div className="d-flex align-items-center mb-3">
                <img
                  src={order.prdData.images}
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />

                <div className="ms-3">
                  <p className="fw-bold mb-1">{order.prdData.brand}</p>
                  <p className="text-muted mb-0">{order.prdData.category}</p>
                </div>
                <select>
                  {order.sizeWithQuantity &&
                    Object.entries(order.sizeWithQuantity).map(
                      ([key, value]) => (
                        <option key={key} value={key}>
                          {value.selectedSizes ? (
                            <p
                              style={{
                                fontSize: 13,
                                color: "GrayText",
                              }}
                            >
                              {value.selectedSizes}
                            </p>
                          ) : null}{" "}
                          -
                          {value.quantities ? (
                            <p
                              style={{
                                fontSize: 13,
                                color: "GrayText",
                              }}
                            >
                              {value.quantities}
                            </p>
                          ) : null}
                        </option>
                      )
                    )}
                </select>
              </div>
              {user.urType === "admin" ? (
                <div className={`mb-3 ${styles.addressSection}`}>
                  <h6 className="text-muted">
                    Address: {order.dlvAddr.locality}, {order.dlvAddr.area},{" "}
                    {order.dlvAddr.city}, {order.dlvAddr.state},{" "}
                    {order.dlvAddr.pincode}
                  </h6>
                </div>
              ) : null}
              <div className="mb-3">
                <h6 className="text-green-500">Status: {order.orderStatus}</h6>
                <h2>Tracking ID: {order.trackId}</h2>
                {order.pType === "cash" ? (
                  <h2>Collect {(parseInt(order.ordPrc) * 90) / 100}</h2>
                ) : null}
              </div>
              <div className="mb-3">
                <h6>Amount: {order.ordPrc}</h6>
              </div>
              {order.orderStatus === "Placed" && (
                <RedyToPick id={order._id} getOrders={getOrders} />
              )}
            </Card.Body>
          </Card>
        )))}
      </div>
    </div>
  );
};

export default OrderHistory;
