import React, { useEffect, useState } from "react";
import styles from "./ReturnDeliver.module.css";
import { Card } from "react-bootstrap";
import Modal from "react-modal";
import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";

export const ReturnDelivery = () => {
  const [orders, setOrders] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderId, setOrderIds] = useState([]);
  const [trackId, setTrackId] = useState(null);
  const [details, setDetails] = useState([]);
  const [pckDet, setPckDet] = useState({ packageDetails: {} });
  const [selectedRow, setSelectedRow] = useState(null);

  const [pckData, setPckData] = useState([]);

  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  // Step 2: Create a function to open the popup with the address details
  const openAddressPopup = (address) => {
    setSelectedAddress(address);
    setShowAddressPopup(true);
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
  const handleCloseModal = () => {
    setSelectedRow(null);
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

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {}, [orderId]);

  const ReturnOrderPkdBtn = async (id) => {
    try {
      await httpService
        .put(`${apiURL}/delivery/return-order-shipped/${id}`)
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

  return (
    <div className={`row ${styles.tableWrapper}`}>
      {orders &&
        orders.map((order, index) => (
          <>
            {order.orderStatus === "Return Initiated" ||
            order.orderStatus === "confirm Return" ||
            order.orderStatus === "Collected Product" ? (
              <div key={index} className="col-md-4">
                <Card key={index} className={`mb-4 ${styles.orderCard}`}>
                  <Card.Body>
                    <Card.Title>{index + 1}</Card.Title>

                    <div key={index} className="col-md-12 mt-1">
                      <img
                        src={order.prdData.images}
                        alt=""
                        className={styles.imges}
                      />
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{order.prdData.barnd}</p>
                      </div>
                    </div>
                    <p className="text-muted mb-0">{order.prdData.category}</p>
                    <p className="text-muted mb-0">
                      {" "}
                      <h2>Pick Up!</h2>
                    </p>
                    <select>
                      {order.sizeWithQuantity &&
                        Object.entries(order.sizeWithQuantity)?.map(
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
                    <div className={`mb-3 ${styles.addressSection}`}>
                      <h6>Phone No.: {order.dlvAddr.phone}</h6>
                      <h6 className="text-muted">
                        Address: {order.dlvAddr.locality}, {order.dlvAddr.area},{" "}
                        {order.dlvAddr.city}, {order.dlvAddr.state},{" "}
                        {order.dlvAddr.pincode}
                      </h6>
                    </div>
                    <div className="mb-3">
                      <h6 className="text-green-500">Status: {order.orderStatus}</h6>
                    </div>
                    <div className="mb-3">
                      <h6>Amount: {order.ordPrc}</h6>
                    </div>
                    <div>
                      <label>Package Detail</label>

                      <button
                        className={styles.button}
                        onClick={() => PckgDetail(order._id)}
                      >
                        Details
                      </button>
                    </div>
                    <hr></hr>
                    <div className="mb-3">
                      <h2>Delivery Location !</h2>
                      <div className={`mb-3 ${styles.addressSection}`}>
                        <h5>Name: {order.pickAdd.name}</h5>
                        <h5>Phone: {order.pickAdd.phone}</h5>
                        <button
                          className="btn btn-primary m-2"
                          onClick={() => openAddressPopup(order.pickAdd)}
                        >
                          View Address
                        </button>
                        <Modal
                          isOpen={showAddressPopup}
                          onRequestClose={() => setShowAddressPopup(false)}
                          contentLabel="Address Popup"
                          className={styles.jjjj}
                        >
                          <div>
                            {/* Render the address details in the popup */}
                            {selectedAddress && (
                              <>
                                <h2>Delivery Location Address</h2>
                                <h5>Name: {selectedAddress.name}</h5>
                                <h5>Phone: {selectedAddress.phone}</h5>
                                <h6 className="text-muted">Address:</h6>
                                <h6>
                                  Locality: {selectedAddress.address.locality}
                                </h6>
                                <h6>Area: {selectedAddress.address.area} </h6>
                                <h6>
                                  City & State: {selectedAddress.address.city},{" "}
                                  {selectedAddress.address.state}{" "}
                                </h6>
                                <h6>
                                  Pincode: {selectedAddress.address.pincode}{" "}
                                </h6>

                                <button
                                  onClick={() => setShowAddressPopup(false)}
                                  className="btn btn-danger"
                                >
                                  Close
                                </button>
                              </>
                            )}
                          </div>
                        </Modal>
                      </div>
                    </div>

                    <div>
                      <label>Tracking ID</label>

                      <input
                        type="number"
                        name="trackId"
                        onChange={(event) => setTrackId(event.target.value)}
                        className="bg-dark text-white"
                      />

                      <button
                        className="btn btn-secondary"
                        onClick={() => trackIdUpd(order._id)}
                      >
                        Submit
                      </button>
                    </div>

                    {order.orderStatus === "Return Initiated" ? (
                      <button
                        className="btn btn-dark my-2"
                        onClick={() => ReturnOrderPkdBtn(orderId[index])}
                      >
                        Order Picked
                      </button>
                    ) : null}
                    {order.orderStatus === "Collected Product" ? (
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
};
