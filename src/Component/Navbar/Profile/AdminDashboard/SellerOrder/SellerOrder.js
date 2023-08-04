import React, { useEffect, useState } from "react";
import styles from "./sellerOrder.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { apiURL } from "../../../../../const/config";

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
      const res = await axios
        .get(`${apiURL}/orders/get-all-orders`, config)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
 ;
      setOrders(res);
    } catch (error) {
      console.log(error);
    }
  };

  const addToDelivery = async (id) => {
    await axios
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
          console.log(err)
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={`d-flex flex-wrap ${styles.tableWrapper}`}>
      {orders.map((order, index) => (
        <Card key={index} className={`m-2 ${styles.orderCard}`}>
          <Card.Body>
            <img
              src="../Image/hiLogo.jpg"
              alt=""
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
                  <p className="text-muted mb-0">
                    {order.prdDeta.category}
                  </p>
                </div>
                <label>Select Size</label> 
                <select>
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
              </div>

         
            <div className="mb-3">
              <h6 className="text-green-400">Status: {order.orderStatus}</h6>
            </div>
            <div className="mb-3">
              <h2>Tracking ID: {order.trackId}</h2>
              {order.pType === "cash" ? (
                <h2>Collect {(parseInt(order.ordPrc) * 90)/100}</h2>
              ) : null}
              <h6>Amount: {order.ordPrc}</h6>
            </div>
            <div className="mb-3">
              {order.orderStatus === "Ready To PickUp" ? 
                <button
                  className="btn btn-warning my-2"
                  onClick={() => addToDelivery(order._id)}
                >
                  Assign Delivery
                </button>
               : (

              (  order.orderStatus === "confirm Delivery"  ||  order.orderStatus === "confirm Return") &&
                <button
                  className="btn btn-warning my-2"
                  onClick={() => confirmDelivery(order._id)}
                >
                 Confirm Delivery
                </button>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SellerOrder;