import React, { useEffect, useState } from "react";
import styles from "./sellerOrder.module.css";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";

const SellerOrder = () => {
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
      const res = await httpService
        .get(`${apiURL}/orders/get-all-orders`, config)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });

      setOrders(res);
    } catch (error) {
      console.log(error);
    }
  };

  const addToDelivery = async (id) => {
    await httpService
      .put(`${apiURL}/delivery/assign-delivery-product/${id}`)
      .then((res) => {
        getOrders();
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const confirmDelivery = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await fetch(
        `${apiURL}/delivery/delivered/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
        config
      )
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          getOrders();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div  className={styles.tableContainer}>
      <Table striped bordered hover width={'auto'}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Select Size</th>
            <th>Status</th>
            <th>Tracking ID</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>
                <img
                  src={order.prdDeta.images}
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
              </td>
              <td>{order.prdDeta.category}</td>
              <td>
              <select className={styles.selectStyle}>

                  {order.sizeWithQuantity &&
                    Object.entries(order.sizeWithQuantity).map(([key, value]) => (
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
                    ))}
                </select>
              </td>
              <td>
                <h6 className="text-green-400">Status: {order.orderStatus}</h6>
              </td>
              <td>{order.trackId}</td>
              <td>
                {order.pType === "cash" ? (
                  <h2>Collect {(parseInt(order.ordPrc) * 90) / 100}</h2>
                ) : (
                  <h6>Amount: {order.ordPrc}</h6>
                )}
              </td>
              <td>
                {order.orderStatus === "Ready To PickUp" ? (
                  <button
                    className="btn btn-warning my-2"
                    onClick={() => addToDelivery(order._id)}
                  >
                    Assign Delivery
                  </button>
                ) : order.orderStatus === "confirm Delivery" || order.orderStatus === "confirm Return" ? (
                  <button
                    className="btn btn-warning my-2"
                    onClick={() => confirmDelivery(order._id)}
                  >
                    Confirm Delivery
                  </button>
                ) :  <p> View </p> }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SellerOrder;
