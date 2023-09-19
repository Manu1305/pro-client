import React, { useEffect, useState } from "react";
import styles from "./DeliveryDash.module.css";
import { Card } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { apiURL } from "../../../../const/config";
import httpService from "../../../Error Handling/httpService";

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
const DeliveryDash = () => {
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderId, setOrderIds] = useState([]);
  const [trackId, setTrackId] = useState(null);
  // const [pckDet ,setPckDet] = useState({})
  const [pckDet, setPckDet] = useState({ packageDetails: {} });
  const [pckData, setPckData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [button, setButton] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState(null);
  const [buttonStates, setButtonStates] = useState({});

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };
  const sendOtp = (phone) => {
    alert("otp sended to this" + phone);
    httpService
      .post(`${apiURL}/user/send-otp`, { phone })
      .then((response) => {
        console.log(response.data);
        alert("got");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalIsOpen(false);
  };
  let ids;
  const getOrders = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await httpService
      .get(`${apiURL}/delivery/dashboradDlvData`, config)
      .then((res) => {
        console.log("jjjjjj", res.data);
        setOrders(res.data);

        ids = res.data.map((ele) => {
          return ele._id;
        });
        setOrderIds(ids);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const orderPkdBtn = async (id) => {
    try {
      await httpService
        .put(`${apiURL}/delivery/order-shipped/${id}`)
        .then((res) => {
          getOrders();
        })
        .catch((Err) => {
          console.log(Err);
        });
    } catch (error) {
      console.log("api error", error);
    }
  };
  const deliveredBtn = async (id) => {
    try {
      await httpService
        .put(`${apiURL}/delivery/order-deliverd/${id}`)
        .then((res) => {
          getOrders();
        })
        .catch((Err) => {
          console.log(Err);
        });
    } catch (error) {
      console.log("api error", error);
    }
  };

  const trackIdUpd = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await httpService
        .put(
          `${apiURL}/delivery/update-trackId-request/${id}`,
          { trackId },
          config
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });

      setDetails(res.data);
    } catch (error) {
      console.log(error);
      setDetails([]);
    }
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };
  const PckgDetail = async (orderId) => {
    setSelectedRow(orderId);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await httpService
        .get(`${apiURL}/delivery/PckgDetail/${orderId}`, config)
        .then((res) => {
          setPckDet(res.data[0]);
          console.log("cvccvbcv", res.data);
          return res;
        })
        .catch((err) => {
          console.log(err);
        });

      setPckData(res.data);
    } catch (error) {
      console.log(error);
      setDetails([]);
    }
  };

  const verifyOtp = async (phone, orderId) => {
    console.log(phone, "====", phoneOtp);
    await httpService
      .post(`${apiURL}/user/verify-otp`, { phone, phoneOtp })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "approved") {
          setButtonStates((prevStates) => ({
            ...prevStates,
            [orderId]: true,
          }));
        } else {
          alert("wrong otp");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {}, [orderId]);


  return (
    <div className={`row ${styles.tableWrapper}`}>
      {orders &&
        orders.map((order, index) => (
          <>
            {order.orderStatus === "Dispatched 1" ||
            order.orderStatus === "Shipped" ||
            order.orderStatus === "confirm Delivery" ? (
              <div key={index} className="col-md-6">
                <Card key={index} className={`mb-4 ${styles.orderCard}`}>
                  <Card.Body>
                    <Card.Title>{index + 1}</Card.Title>

                    <div key={index} className={styles.topic}>
                      <h2 className={styles.ssss}> Pick Up !</h2>

                      <img
                        src={order.prdData.images}
                        alt=""
                        // className={styles.imges}
                      />
                      <p className={`fw-bold mb-1 ${styles.branddd}`}>
                        {order.prdData.brand}
                      </p>
                      <div className="mb-3">
                        <h6 className={`text-green-500 ${styles.topicinfos}`}>
                          Status: {order.orderStatus}
                        </h6>
                      </div>
                      <div>
                      <h5 className={styles.amtt}>Cash to Collect: {order.pType=== "cash" ?  ((parseInt(order.ordPrc) * 90) / 100) + (((parseInt(order.ordPrc) * 90) / 100)*5)/100 :  "Paid"}</h5>

                      </div>
                      <div className={styles.topicinfo}>

                        {/* <label>Tracking ID</label> */}
                        {order.trackId ? (
                          order.trackId
                        ) : (
                          <input
                            type="number"
                            name="trackId"
                            placeholder="Tracking ID"
                            onChange={(event) => setTrackId(event.target.value)}
                            className="bg-white text-dark"
                          />
                        )}
                        <button
                          className={styles.fjfj}
                          onClick={() => trackIdUpd(order._id)}
                        >
                          Submit
                        </button>
                      </div>
                    </div>

                    <div className={styles.topic1}>
                      <div className={`mb-3 ${styles.addressSection}`}>
                        <h5>Name: {order.pickAdd.name}</h5>
                        <h5>Phone: {order.pickAdd.phone}</h5>

                        <h6 className="text-muted">
                          Address:
                          {order.pickAdd.locality}, {order.pickAdd.address.area}
                          , {order.pickAdd.address.city},{" "}
                          {order.pickAdd.address.state},{" "}
                          {order.pickAdd.address.pincode}
                        </h6>
                      </div>
                    </div>
                    <div className={styles.gap}>
                      <hr className={styles.gap}></hr>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <div className="ms-3">
                        <p className="text-muted mb-0">
                          <h2 className={styles.dddd}>Delivery Location!</h2>
                        </p>
                      </div>
                    </div>

                    <div key={index} className={styles.topic}>
                      {/* <h2 className={styles.ssss}> Pick Up !</h2> */}

                      <img
                        src={order.prdData.images}
                        alt=""
                        // className={styles.imges}
                      />
                      <p className={`fw-bold mb-1 ${styles.branddd}`}>
                        {order.prdData.brand}
                      </p>

                      <div className="mb-3">
                        <h6 className={`text-green-500 ${styles.topicinfossss}`}>
                          Status: {order.orderStatus}
                        </h6>
                      </div>
                      <div className={styles.topicinfoss}>
                        <label>Package Detail</label>

                        <button
                          className={styles.button}
                          onClick={() => PckgDetail(order._id)}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                    <div className={styles.topicinfos}>
                      {order.orderStatus === "Shipped" ? (
                        <button
                          className={styles.rrrr}
                          onClick={() => sendOtp(order.dlvAddr.phone)}
                        >
                          Send otp
                        </button>
                      ) : null}
                      <input
                        type="number"
                        placeholder="enter the otp"
                        style={{ backgroundColor: "#fff" }}
                        onChange={(e) => {
                          setPhoneOtp(e.target.value);
                        }}
                      />
                      <button
                        className={styles.rrrr}
                        onClick={() =>
                          verifyOtp(order.dlvAddr.phone, order._id)
                        }
                      >
                        Submit
                      </button>
                    </div>
                    {/* <p className="text-muted mb-0">{order.prdData.category}</p> */}

                    <div className={styles.topic1}>
                      <div className={`mb-3 ${styles.addressSection}`}>
                        <h6>Phone No.: {order.dlvAddr.phone}</h6>
                        <h6 className="text-muted">
                          Address: {order.dlvAddr.locality},{" "}
                          {order.dlvAddr.area}, {order.dlvAddr.city},{" "}
                          {order.dlvAddr.state}, {order.dlvAddr.pincode}
                        </h6>
                      </div>
                    </div>
                    <div className="mb-3">
                      <h6>Amount: {order.pType=== "cash" ?  ((parseInt(order.ordPrc) * 90) / 100) + (((parseInt(order.ordPrc) * 90) / 100)*5)/100 :  "Paid"}</h6>
                    </div>

                    <hr className={styles.gap}></hr>

                    {order.orderStatus === "Dispatched 1" ? (
                      <button
                        className="btn btn-dark my-2"
                        onClick={() => orderPkdBtn(orderId[index])}
                      >
                        Order Picked
                      </button>
                    ) : null}

                    {buttonStates[order._id] ? (
                      <button
                        className="btn btn-secondary m-2"
                        onClick={() => deliveredBtn(order._id)}
                      >
                        Order Delivered
                      </button>
                    ) : null}
                  </Card.Body>
                </Card>
              </div>
            ) : null}

            {selectedRow !== null && pckDet.packageDetails && (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                  {console.log("Size:", pckDet.packageDetails.size)}
                  <h2>Package Details</h2>
                  <h3>Size of Product: {pckDet.packageDetails.size}</h3>
                  <h3>Height of Product: {pckDet.packageDetails.height}</h3>
                  <h3>Weight of Product: {pckDet.packageDetails.weight}</h3>

                  <p>{details[selectedRow]?.additionalDetails}</p>

                  <button
                    className={styles.closeButton}
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        ))}
    </div>
  );
            }
export default DeliveryDash