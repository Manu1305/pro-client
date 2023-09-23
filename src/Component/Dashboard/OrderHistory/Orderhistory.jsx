import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Container, Form, Modal, Row } from "react-bootstrap";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";
import DataTable from "../../Reuseable Comp/DataTable";

import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

const OrderHistory = () => {
  const user = useSelector((state) => state.userReducer.user);

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (orderId) => {
    setShow(true);
    setId(orderId);
  };
  const [packageDetails, setPackageDetails] = useState({});
  const changeHandler = (e) => {
    setPackageDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const updateStatus = async (event) => {
    event.preventDefault();
    try {
      await httpService
        .put(`${apiURL}/status/redayToPickup/${id}`, {
          packageDetails,
        })
        .then((res) => {
          handleClose();
          getOrders();
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
          return res;
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
      const filteredProducts = res.data.filter(
        (product) => product.seller === user.email
      );
      console.log("Filtered Products:", filteredProducts);
      setOrders(filteredProducts);
    } catch (error) {
      console.log(error);
      setOrders([]);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getOrders();
  }, []);

  const header = [
    "Product",
    "Order Id",
    "Orderd On",
    "Payment Method",
    "Price",
    "Collect",
    "Delivery Status",
    "Action",
  ].map((ele) => {
    let string = ele;
    string.replace(/^./, string[0].toUpperCase());

    if (ele === "Product") {
      return {
        field: "Product",
        type: "image",

        renderCell: (params) => {
          console.log("parmas*******************", params);
          return (
            <div>
              <img
                src={params.row.Product}
                alt="refresh"
                width={30}
                onClick={() => navigate(`/ViewDetails/${params.row.prdId}`)}
              />
            </div>
          );
        },
      };
    }
    if (ele === "Action") {
      return {
        field: "Action",
        type: "action",
        width: 150,
        renderCell: (params) => {
          console.log("Check KR", params.row);
          return (
            <div style={{ alignItems: "center" }}>
              {params.row["Delivery Status"] === "Placed" && (
                <div>
                  <p
                    className="btn btn-success btn-sm"
                    onClick={() => handleShow(params.row["Order Id"])}
                  >
                    Dipatch
                  </p>
                </div>
              )}

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title className="text-center">
                    Fill Package Details
                  </Modal.Title>
                </Modal.Header>
                <Form className="mt-2 mb-2 border-0">
                  <Container>
                    <Row>
                      <Form.Group className="mt-0">
                        <Form.Label>Size</Form.Label>
                        <Form.Control
                          type="number"
                          name="size"
                          placeholder="Enter size"
                          onChange={changeHandler}
                        />
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-1">
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        type="number"
                        name="weight"
                        placeholder="Enter Weight"
                        onChange={changeHandler}
                      />
                    </Form.Group>

                    <Row>
                      <Form.Group className="mb-1">
                        <Form.Label>Height</Form.Label>
                        <Form.Control
                          type="number"
                          name="height"
                          placeholder="Packge Height"
                          onChange={changeHandler}
                        />
                      </Form.Group>
                    </Row>
                  </Container>

                  <div className=" m-2 d-grid d-md-flex justify-content-md-center align-items-center">
                    <button
                      className="btn btn-primary me-md-2"
                      onClick={updateStatus}
                    >
                      confrim
                    </button>
                    <button
                      className="btn btn-danger me-md-2"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              </Modal>
            </div>
          );
        },
      };
    } else {
      return {
        id: ele,
        field: ele,
        headerName: string,
        width: 150,
        editable: true,
      };
    }
  });

  const rowData = orders.map((ele) => {
    const date = new Date(ele.createdAt).toISOString().split("T")[0];
    const collect =
      (parseInt(ele.ordPrc) * 90) / 100 +
      (((parseInt(ele.ordPrc) * 90) / 100) * 5) / 100;
    return {
      id: ele._id,
      "Order Id": ele._id,
      prdId: ele.productId,
      Product: ele.prdData.images,
      "Orderd On": date,
      Price: ele.ordPrc,
      Collect: ele.pType === "cash" ? collect : null,
      "Payment Method": ele.pType,
      "Delivery Status": ele.orderStatus,
    };
  });

  return (
    <div>
      {/* <h1>Seller</h1> */}
      {rowData.length !== 0 ? (
        <DataTable columns={header} rows={rowData} autoHeight />
      ) : (
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
            </div>
          ) : (
            <img
              src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1692603469~exp=1692604069~hmac=6b009cb003b1ee1aad15bfd7eefb475e78ce63efc0f53307b81b1d58ea66b352"
              alt="Loaded"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
