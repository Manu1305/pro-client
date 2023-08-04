import React, { useState, useEffect } from "react";
import styles from "./ReturnReq.module.css";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Slider from "react-slick";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

import axios from "axios";
import { apiURL } from "../../../../../const/config";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles["control-btn"]} onClick={onClick}>
      <button className={styles.next}>
        <MdNavigateNext className={styles.icon} />
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles["control-btn"]} onClick={onClick}>
      <button className={styles.prev}>
        <GrFormPrevious className={styles.icon} />
      </button>
    </div>
  );
};

export const ReturnReq = () => {
  const [userData, setUserData] = useState([]);



  const getReturnReq = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await axios
        .get(`${apiURL}/return/returnReq`, config)
        .then((res) => {
       
          setUserData(res.data);
        
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReturnReq();
  }, []);


  const removeFromReq = async (id) => {
    await axios
      .delete(`${apiURL}/return/remove-requested-return/${id}`)
      .then((res) => {
      
        getReturnReq();
    
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const AssignReturnDelivery = async (id) => {
    await axios
      .put(`${apiURL}/delivery/assign-return-delivery-order/${id}`)
      .then((res) => {
        
        Swal.fire('Return Assigned')
      })
      
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
   
      {/* <p style={{ backgroundColor: "red" }}>AssignDelivery</p> */}
      <div className={`row ${styles.tableWrapper}`}>
        {userData &&
          userData.map((order, index) => (
            <div key={index} className="col-md-4">
              <Card className={`mb-4 ${styles.orderCard}`}>
                <Card.Body>
                  <Card.Title>{index + 1}</Card.Title>
         
                  <div className="col-md-12 mt-1">
                    <Slider {...settings}>
                      {order.images.map((image, index) => {
                        return <img key={index} src={image} />;
                      })}
                    </Slider>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{order.uname}</p>
                      <p className="text-muted mb-0">{order.email}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <h6>OrderId: {order.orderId}</h6>
                    <span>
                      <h6>Product Issue:</h6> {order.productIssue}
                    </span>
                  </div>
                  <div className="mb-3">
                    <h6>Phone: {order.phone}</h6>
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-danger my-2"
                      onClick={() => removeFromReq(order._id)}                    >
                      Cancel Request
                    </button>
                   

                      <button 
                        className="btn btn-warning my-2"
                 
                        onClick={() => AssignReturnDelivery(order.orderId)}
                      >
                        Assign Delivery
                      </button>
                   
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </>
  );
};