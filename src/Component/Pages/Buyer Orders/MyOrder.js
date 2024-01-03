import React, { useEffect, useState } from "react";
import styles from "./MyOrder.module.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import Swal from "sweetalert2";
import httpService from "../../Error Handling/httpService";
import { apiURL } from "../../../const/config";
import { addorder } from './../../../Redux/order/orderAction';

const BuyerOrder = () => {
  const dispatch = useDispatch();

  // const orderss = useSelector((state) => state.orderReducer.order);
  //
  const [orders, setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.userReducer.user);

  const returnButton = (order) => {
    alert(order.updatedAt);

    const currentDate = new Date();

    console.log(order.updatedAt);
    console.log(currentDate);
    console.log("Check difference ", currentDate < order.updatedAt);
  };

  // const user = useSelector((state) => state.userReducer.user)
  console.log("user", user);
  const getOrders = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await httpService
        .get(`${apiURL}/orders/get-all-orders`, config)
        .then((res) => {
          setIsLoading(false);

          console.log(res.data + "orders csdc");
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
      console.log(res);
      dispatch(addorder(res));

      if (res.length == 0) {
        setOrders([]);
      } else {
        setOrders(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getOrders()
    getOrders();
  }, []);

  function cancelorder(id) {
    Swal.fire({
      title: "Are you sure to cancel this order?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        axios
          .put(`${apiURL}/orders/update-order/${id}`, config)
          .then((res) => {
            getOrders();
            Swal.fire("!", "Your Order cancelled successfully...", "success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  return (
    <div className={`d-flex flex-wrap ${styles.tableWrapper}`}>
      {orders.length === 0 ? (
        <div style={{ margin: "auto" }}>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ScaleLoader animation="border" role="status" color="red">
                <span className="visually-hidden">Loading...</span>
              </ScaleLoader>
              <p>Loading orders...</p>
            </div>
          ) : (
            <img
              src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1692603469~exp=1692604069~hmac=6b009cb003b1ee1aad15bfd7eefb475e78ce63efc0f53307b81b1d58ea66b352"
              alt="Loaded"
            />
          )}
        </div>
      ) : (
        orders.length !== 0 && 
        orders.map((order, index) => {
          // const dateString = "2023-08-01T:36:25.914+00:00";
          const dateFromISOString = new Date(order?.ordRetData?.retExpDate);
          const isExpRet = dateFromISOString > new Date();
          return (
            <Card key={index} className={`m-2 ${styles.orderCard}`}>
              <Card.Body>
                <Card.Title>Order: {index + 1}</Card.Title>
                {/* <img
                  src={imge}
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                  className={`rounded-circle ${styles.imgcircle}`}
                /> */}
                <div key={order.id} className="d-flex align-items-center mb-3">
                  <Link to={`/orderDetails/${order._id}`}>
                    <img
                      src={order.prdData.images}
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                  </Link>

                  <div className="ms-3">
                    <p className="fw-bold mb-1">{order.brand}</p>
                    <p className="text-muted mb-0">{order.category}</p>
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

                <div className={`mb-3 ${styles.addressSection}`}>
                  <h6 className="my-2">Tracking ID: {order.trackId}</h6>
                  <h6 className="text-muted">Address:</h6>
                  <h6>Locality: {order.dlvAddr.locality} </h6>
                  <h6>Area: {order.dlvAddr.area} </h6>
                  <h6>
                    City & State: {order.dlvAddr.city}, {order.dlvAddr.state}
                  </h6>
                  <h6>Pincode: {order.dlvAddr.pincode} </h6>
                </div>
                <div className="mb-3">
                  <h6>
                    Status:{" "}
                    {order.orderStatus === "confirm Delivery"
                      ? "Shipped"
                      : order.orderStatus}
                  </h6>
                </div>
                <div className="mb-3">
                  <h6>Amount: {order.ordPrc}</h6>
                </div>
                <div className="mb-3">
                  {order.orderStatus !== "Shipped" &&
                    order.orderStatus !== "Dispatched 1" &&
                    order.orderStatus !== "Dispatced 1" &&
                    order.orderStatus !== "Delivered" &&
                    order.orderStatus !== "confirm Delivery" &&
                    order.orderStatus !== "Return Successful" &&
                    order.orderStatus !== "confirm Return" && (
                      <>
                        {/* <button className="btn btn-warning my-2">
                          CHANGE ADDRESS
                        </button> */}
                      {order.orderStatus !== "Cancelled" || order.orderStatus =="Pending"  ? (
                          <button
                            onClick={() => cancelorder(order._id)}
                            className="btn btn-danger"
                          >
                            CANCEL ORDER
                          </button>
                        ) : null}
                      </>
                    )}

                  {order.orderStatus === "Delivered" && isExpRet ? (
                    <Link to={`/returnPro/${order._id}`}>
                      <button
                        onClick={() => returnButton(order)}
                        className="btn btn-warning my-2"
                      >
                        RETURN ORDER
                      </button>
                    </Link>
                  ) : null}
                </div>
              </Card.Body>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default BuyerOrder;
