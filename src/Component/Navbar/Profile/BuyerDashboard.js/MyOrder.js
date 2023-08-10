import React, { useEffect, useState } from "react";
import styles from "./MyOrder.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addorder } from "../../../../Redux/order/orderAction";
import { apiURL } from "../../../../const/config";

const BuyerOrder = () => {
  const dispatch = useDispatch();

  const orderss = useSelector((state) => state.orderReducer.order);
  const [orders, setOrders] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [updatedAddress, setUpdatedAddress] = useState({});
  const [updatedStatus, setUpdatedStatus] = useState("");
  const user = useSelector((state) => state.userReducer.user);
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setUpdatedAddress({
      city: orders[index].address.city,
      state: orders[index].address.state,
    });
    setUpdatedStatus(orders[index].status);
  };
  const handleAddressChange = (event) => {
    setUpdatedAddress({
      ...updatedAddress,
      [event.target.name]: event.target.value,
    });
  };

  const handleStatusChange = (event) => {
    setUpdatedStatus(event.target.value);
  };

  const handleSaveClick = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index] = {
      ...updatedOrders[index],
      address: { ...updatedAddress },
      status: updatedStatus,
    };

    setOrders(updatedOrders);

    setEditingIndex(-1);
    setUpdatedAddress({});
    setUpdatedStatus("");
  };

  const returnButton = (order) => {
    alert(order.updatedAt);

    const currentDate = new Date();

    console.log(order.updatedAt);
    console.log(currentDate);
    console.log("Check difference ", currentDate < order.updatedAt);
  };

  const getOrders = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await axios
        .get(`${apiURL}/orders/get-all-orders`, config)
        .then((res) => {
          console.log(res)
          return res.data
        })
        .catch((err) => {
          console.log(err);
        });
        console.log(res)
        debugger
      dispatch(addorder(res));
      setOrders(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={`d-flex flex-wrap ${styles.tableWrapper}`}>
      {orders.length && orders.map((order, index) => {
          // const dateString = "2023-08-01T:36:25.914+00:00";
          const dateFromISOString = new Date(order?.ordRetData?.retExpDate);
          const isExpRet = dateFromISOString > new Date();
          return (
            <Card key={index} className={`m-2 ${styles.orderCard}`}>
              <Card.Body>
                <Card.Title>Order: {index + 1}</Card.Title>
                <img
                  src="../Image/hiLogo.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className={`rounded-circle ${styles.imgcircle}`}
                />
                <div key={order.id} className="d-flex align-items-center mb-3">
                  <img
                    src={order.prdDeta.images}
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />

                  <div className="ms-3">
                    <p className="fw-bold mb-1">{order.prdDeta.barnd}</p>
                    <p className="text-muted mb-0">{order.prdDeta.category}</p>
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
                      ? "Dispatced 1"
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
                        <button className="btn btn-warning my-2">
                          CHANGE ADDRESS
                        </button>
                        <button className="btn btn-danger">CANCEL ORDER</button>
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
        })}
    </div>
  );
};

export default BuyerOrder;
