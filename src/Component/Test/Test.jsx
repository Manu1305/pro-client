import React, { useEffect, useState } from "react";
import styles from "./Test.module.css";
import { BiSolidUserCircle } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { BsTelephoneFill } from "react-icons/bs";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { apiURL } from "../../const/config";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Test() {
  const { orderId } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const steps = [
    {
      label: "Order Placed",
      description: `your order successfully placed at ${order?.createdAt.slice(
        0,
        10
      )}`,
    },
    {
      label: "Order packed",
      // description: `your order successfully shipped at ${order.updatedAt.slice(0,10)}`,
    },
    {
      label: "Shipping",
      description: `Order is being packed.`,
    },
    {
      label: " Delivered",
      description: `Order Delivered.`,
    },
  ];

  const handleNext = () => {
    if (order !== null) {
      if (order.orderStatus === "Placed") {
        setActiveStep(0);
      }
      if (order.orderStatus === "Dispatched 1") {
        setActiveStep(1);
      }

      if (order.orderStatus === "confirm Delivery") {
        setActiveStep(2);
      } else if (order.orderStatus === "Delivered") {
        setActiveStep(4);
      } else {
        console.log("errror");
      }
    }
  };
  useEffect(() => {
    handleNext();
  }, [order]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const user = useSelector((state) => state.userReducer.user);

  console.log("dwvkb", user);

  const getOrderDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios
        .get(`${apiURL}/orders/getSingleorder/${orderId}`, config)
        .then((res) => {
          console.log("singleOrder", res.data);
          // alert("worked")

          setOrder(res.data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    } catch (error) {
      console.log(error, "its new errror");
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const taxRate = 0.15;
  const orderPrice = order?.ordPrc;

  const tax = orderPrice * taxRate;
  const subtotal = orderPrice - tax;
  console.log("Tax:", tax);

  return (
    <>
      {order !== null && (
        <div style={{ backgroundColor: "#F7FBFF", width: "100%" }}>
          <div className={styles.headingdiv}>
            <h3>Order Id : {order._id}</h3>
          </div>
          <div className={styles.secondiv}>
            <div className={styles.insidediv}>
              <div className={styles.boxheading}>
                <h3>Customer details</h3>
              </div>
              <hr className={styles.line} />
              <div>
                <div className="flex flex-row ml-3 mt-3">
                  <BiSolidUserCircle className="h-5 w-5" />

                  <p className="ml-1"> {order.dlvAddr.name}</p>
                </div>
                {user.email && user.urType === "buyer" ? (
                  <div className="flex flex-row ml-3 mt-3">
                    <TfiEmail className="h-5 w-5" />

                    <p className="ml-1"> {user.email}</p>
                  </div>
                ) : null}

                <div className="flex flex-row ml-3 mt-3">
                  <BsTelephoneFill className="h-5 w-5" />

                  <p className="ml-1"> {order.dlvAddr.phone}</p>
                </div>
              </div>
            </div>
            <div className={styles.insidediv}>
              <div className={styles.boxheading}>
                <h3>Shipping address</h3>
              </div>
              <hr className={styles.line} />
              <div>
                <div className="flex flex-row ml-3 mt-3">
                  <p className="ml-1">Locality :{order.dlvAddr.locality}</p>
                </div>
                <div className="flex flex-row ml-3 mt-3">
                  <p className="ml-1">Area :{order.dlvAddr.area}</p>
                </div>
                <div className="flex flex-row ml-3 mt-3">
                  <p className="ml-1">City :{order.dlvAddr.city}</p>
                </div>
                <div className="flex flex-row ml-3 mt-3">
                  <p className="ml-1"> State :{order.dlvAddr.state}</p>
                  <div className="flex flex-row ml-3 mt-3">
                    {/* <p className="ml-1">Landmark :{order.dlvAddr.landmark === "" ? "":order.dlvAddr.landmark } </p> */}
                  </div>
                </div>
                <div className="flex flex-row ml-3 mt-3">
                  <p className="ml-1">Pincode :{order.dlvAddr.pincode}</p>
                </div>
              </div>
            </div>
            <div className={styles.insidediv}>
              <div className={styles.boxheading}>
                <h3>Payment details</h3>
              </div>
              <hr className={styles.line} />
              <div>
                <div className="flex flex-row ml-3 mt-3">
                  <p className="ml-1">Transaction: {order.raz_paymentId}</p>
                </div>
                <div className="flex flex-row ml-3 mt-3">
                  <p className="ml-1"> Payment method:{order.pType}</p>
                </div>
                {/* <div className="flex flex-row ml-3 mt-3">
              <p className="ml-1">CardholderName:</p>
            </div>
            <div className="flex flex-row ml-3 mt-3">
              <p className="ml-1">Card number :</p>
            </div> */}
                <div className="flex flex-row ml-3 mt-3">
                  <p className="ml-1">Total amount: {order.ordPrc}</p>
                </div>
                {user.email && user.urType === "admin" ? (
                  <div className="flex flex-row ml-3 mt-3">
                    <p className="ml-1 text-red-600 font-bold">
                      Amount need to collect from customer:
                      





                      
                      {order.pType === "cash" ? (parseInt(order.ordPrc) * 90) / 100 +
                      (((parseInt(order.ordPrc) * 90) / 100) * 5) / 100 : 0}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className={styles.productdetailDiv}>
            <div>
              <p className={styles.boxheading}>Product details</p>
              <table className={`${styles.table}`}>
                <tr style={{ backgroundColor: "white" }}>
                  <th className="bg-white">Product</th>
                  {/* <th className="bg-white">Product Id</th> */}
                  <th className="bg-white">Price</th>
                  {/* <th className="bg-white">Quantity</th> */}
                  <th className="bg-white w-7">Total amount</th>
                  <th className="bg-white w-20">Size and quantity</th>
                  <tr />
                  <tr>
                    <td className={styles.table1}>
                      <img
                        src={order.prdData.images}
                        alt="hello"
                        className="h-10 w-10 "
                      />
                      {order.prdData.title}
                    </td>
                    {/* <td>{order.productId}</td> */}
                    <td>{order.prdData.price}</td>
                    {/* <td>{order.quantity}</td> */}
                    <td>{order.ordPrc}</td>
                    <td>
                      {Object.entries(order.sizeAndQua)
                        .map(([size, value]) => {
                          return `${size}-${value}`;
                        })
                        .join(", ")}
                    </td>
                  </tr>
                </tr>
                <hr />
              </table>
            </div>
          </div>

          <div className={styles.four}>
            <div className={styles.logisticdetailsdiv}>
              <p className="ml-3 mt-1 font-bold">Logistic Details</p>

              <div
                style={{
                  width: "100%",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* <img src="https://media.tenor.com/WYKoRh1NGPEAAAAM/truck-delivery.gif" style={{ fontSize: "30px", color: "green", margin: "auto" }} alt="" /> */}
                <LocalShippingOutlinedIcon
                  style={{ fontSize: "70px", color: "green", margin: "auto" }}
                />
              </div>
              <div className="ml-2 leading-10">
                <h4 className="mt-4">Certon exports</h4>
                <p>info@certonexport.com</p>
                <p>+91 96488 74887</p>
                {/* <p>id:sdsdfsfv</p>
                <p>Amount charged:43</p>
                <p>Payment method:cash</p> */}
              </div>
            </div>

            <div className={styles.totalbill}>
              <p className="ml-3 mt-1 font-bold">Total Bill</p>
              <div className="ml-3">
                <div className="flex flex-row">
                  <p>Subtotal : </p>
                  <p style={{ marginLeft: "65px" }}>{subtotal}</p>
                </div>

                {/* <div className="flex flex-row">
              <p>Discount : </p>
              <p style={{marginLeft:'63px'}}>2323</p>
            </div> */}
                <div className="flex flex-row">
                  <p>Logistics : </p>
                  <p style={{ marginLeft: "64px" }}>0 </p>
                </div>
                <div className="flex flex-row">
                  <p>tax : </p>
                  <p style={{ marginLeft: "104px" }}>{tax}</p>
                </div>

                <div className="flex flex-row mt-3">
                  <p className="font-bold">Total Amount : </p>
                  <p style={{ marginLeft: "22px", fontWeight: "bold" }}>
                    {order.ordPrc}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {user.email && user.urType === "buyer" ? (
            <div className={styles.five}>
              <div className={styles.stepper}>
                <p className="font-bold mt-2 ml-2">Order Status</p>
                <Box sx={{ maxWidth: 400 }}>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel
                          optional={
                            index === 2 ? (
                              <Typography variant="caption"></Typography>
                            ) : null
                          }
                        >
                          {step.label}
                        </StepLabel>
                        <StepContent>
                          <Typography>{step.description}</Typography>
                          <Box sx={{ mb: 2 }}>
                            {/* <div>
                              <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                                style={{ backgroundColor: "orange" }}
                              >
                                {index === steps.length - 1 ? "Finish" : "Continue"}
                              </Button>
                              <Button
                                disabled={index === 0}
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                Back
                              </Button>
                            </div> */}
                          </Box>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                  {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                      <Typography>Product delivered&apos;</Typography>
                      {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                          </Button> */}
                    </Paper>
                  )}
                </Box>
              </div>
              {/* <div className={styles.prevOrder}>
                    <h1>No previous Order from this customer</h1>
                  </div> */}
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Test;
