import React, { useEffect, useState } from "react";
import styles from "./Singleorder.module.css";
import { BiSolidUserCircle } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { BsTelephoneFill } from "react-icons/bs";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { apiURL } from "../../../../const/config";

function SingleOrder() {
  const { orderId } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [order, setOrder] = useState(null);
  const [show, setShow] = useState(false);
  const [seller, setseller] = useState(null);
  const [Selleremail, setSelleremail] = useState("");

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
          setSelleremail(res.data.seller);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    } catch (error) {
      console.log(error, "its new errror");
    }
  };

  const getSellerDetails = async () => {
    console.log(Selleremail);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios
        .get(`${apiURL}/user/singleUserData/${Selleremail}`, config)
        .then((res) => {
          console.log("singleseller", res.data);

          setseller(res.data);
          console.log(res.data + "this is seller data");
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

  const taxRate = 0.05;
  const orderPrice = order?.ordPrc;

  const tax = orderPrice * taxRate;

  const shipping = order?.quantity * 10;
  const totalAmount = orderPrice + tax + shipping;

  // cash
  // paid amount  ==>   
  const casTax = orderPrice * 0.1 * 0.05; // gst = 10% of order amount + 5%
  
  const paidAmount = orderPrice * 0.1 + casTax + shipping;

  // remaining amount
  const remainingAmount = totalAmount - paidAmount;

  return (
    <>
      {order !== null && (
        <div
          style={{
            backgroundColor: "#F7FBFF",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <div className={styles.headingdiv}>
            <h3 className="font-bold ">
              Order Id : HTM-{order._id.substr(order._id.length - 6)}
            </h3>
          </div>
          <div className={styles.secondiv}>
            {user.urType !== "seller" && (
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
            )}

            {user.urType !== "seller" && (
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
                    <div className="flex flex-row ml-3 mt-3"></div>
                  </div>
                  <div className="flex flex-row ml-3 mt-3">
                    <p className="ml-1">Pincode :{order.dlvAddr.pincode}</p>
                  </div>
                </div>
              </div>
            )}
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
                  <p className="ml-1">Total amount: {totalAmount}</p>
                </div>
                {user.email && user.urType === "admin" ? (
                  <div className="flex flex-row ml-3 mt-3 border border-black">
                    <p className="ml-1 text-green-600 font-bold ">
                      Customer paid amount:
                      {order.pType === "cash"
                        ? paidAmount.toFixed(2)
                        : totalAmount}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row ml-3 mt-3 border border-black">
                    <p className="ml-1 text-green-600 font-bold ">
                      paid amount:
                      {order.pType === "cash"
                        ? paidAmount.toFixed(2)
                        : totalAmount}
                    </p>
                  </div>
                )}

                {user.email && user.urType === "admin" ? (
                  <div className="flex flex-row ml-3 mt-3 border border-black">
                    <p className="ml-1 text-red-600 font-bold">
                      Amount need to collect from customer:
                      {order.pType === "cash" ? remainingAmount : 0}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row ml-3 mt-3 border border-black">
                    <p className="ml-1 text-red-600 font-bold">
                      Pending amount:
                      {order.pType === "cash" ? remainingAmount : 0}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.productdetailDiv}>
            <div>
              <p className={styles.boxheading}>Product details</p>
              <table className={`${styles.table}`}>
                <tr style={{ backgroundColor: "white" }}>
                  <th className="bg-white">Product</th>
                  <th className="bg-white">Single product price</th>
                  <th className="bg-white ">Order Price</th>
                  <th className="bg-white"> size and quantity</th>
                  <tr />
                  <tr>
                    <td className={styles.table1}>
                      <Link to={`/ViewDetails/${order.productId}`}>
                        <img
                          src={order.prdData.images}
                          alt="hello"
                          className="h-10 w-10 "
                        />
                      </Link>
                      {order.prdData.title}
                    </td>
                    {/* <td>{order.productId}</td> */}
                    <td>&#8377; {order.prdData.price}</td>
                    {/* <td>{order.quantity}</td> */}
                    <td>&#8377;{order.ordPrc}</td>
                    <td className="font-bold border border-blue-500 ">
                      {Object.entries(order.sizeAndQua)
                        .map(([size, value]) => {
                          return `${size}-${value}`;
                        })
                        .join(", ")}
                    </td>
                    {user.email && user.urType === "admin" ? (
                      <td>
                        <button
                          className="bg-green-500 rounded"
                          onClick={() => {
                            setShow(true);
                            getSellerDetails();
                          }}
                        >
                          {" "}
                          view Seller details
                        </button>
                      </td>
                    ) : null}
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
                  <p>Order Price : </p>
                  <p style={{ marginLeft: "43px" }}>{orderPrice}</p>
                </div>

                <div className="flex flex-row">
                  <p>Logistics : </p>
                  <p style={{ marginLeft: "64px" }}>{shipping} </p>
                </div>
                <div className="flex flex-row">
                  <p>tax : </p>
                  <p style={{ marginLeft: "104px" }}>{tax}</p>
                </div>

                <div className="flex flex-row mt-3">
                  <p className="font-bold">Total Amount : </p>
                  <p style={{ marginLeft: "22px", fontWeight: "bold" }}>
                    {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {user.email && user.urType != "seller" ? (
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

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Seller details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <table style={{ height: "100%" }}>
              <tr>
                <th>Name:</th>
                <td>{seller?.name}</td>
              </tr>
              <tr>
                <th>Phone:</th>
                <td>{seller?.phone}</td>
              </tr>
              <tr>
                <th>email</th>
                <td>{seller?.email} </td>
              </tr>
              <tr>
                <th>Subscription</th>
                <td>{seller?.subscription?.subsStatus}</td>
              </tr>
              <tr>
                <th>Gst:</th>
                <td>{seller?.gst}</td>
              </tr>
              <tr>
                <th>Shop name</th>
                <td>{seller?.shopName} </td>
              </tr>

              <tr>
                <th>State</th>
                <td>{seller?.address?.state} </td>
              </tr>
              <tr>
                <th>City</th>
                <td>{seller?.address?.city} </td>
              </tr>
              <tr>
                <th>Area</th>
                <td>{seller?.address?.area} </td>
              </tr>
              <tr>
                <th>pincode</th>
                <td>{seller?.address?.pincode} </td>
              </tr>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SingleOrder;
