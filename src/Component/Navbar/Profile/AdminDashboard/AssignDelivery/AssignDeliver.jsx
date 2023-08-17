import React, { useState, useEffect } from "react";
import styles from "./AssignDelivery.module.css";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";
 const AssignDekivery = () => {
  const [userData, setUserData] = useState([]);

  const addToDelivery = async (id) => {
    await httpService
      .put(`${apiURL}/delivery/assign-delivery-product/${id}`)
      .then((res) => {
   
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const getUser = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await httpService
        .get(`${apiURL}/user/userdata`, config)

        .then((res) => {
   
          const filteredProducts = res.data.filter(
            (product) => product.urType === "delivery"
          );
          setUserData(filteredProducts);
       
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
     <h1>Right</h1>
     <p style={{backgroundColor:"red"}}>AssignDelivery</p>
      <div className={`d-flex flex-wrap ${styles.tableWrapper}`}>
       
        {userData &&
          userData.map((order, index) => (
            <Card key={index} className={`m-2 ${styles.orderCard}`}>
              <Card.Body>
                <Card.Title>{index + 1}</Card.Title>
                <img
                  src="../Image/hiLogo.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className={`rounded-circle ${styles.imgcircle}`}
                />

                <div key={order.id} className="d-flex align-items-center mb-3">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{order.name}</p>
                    <p className="text-muted mb-0">{order.email}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="text-green-500" >Status: {order.orderStatus}</h6>
                </div>
                <div className="mb-3">
                  <h6>Phone: {order.phone}</h6>
                </div>
                <div className="mb-3">
                  <Link to="/deliveryGuys">
                    <button
                      className="btn btn-warning my-2"
                      onClick={() => addToDelivery(order._id)}
                    >
                      Assign Delivery
                    </button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          ))}
      </div>
    </>
  );
};

export default AssignDekivery