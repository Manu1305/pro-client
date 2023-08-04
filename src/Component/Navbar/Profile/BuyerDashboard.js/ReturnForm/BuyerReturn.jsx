import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { apiURL } from "../../../../../const/config";

const BuyerReturn = () => {
  const orders = useSelector((state) => state.orderReducer.order);

  const { id } = useParams();

  const filteredOrders = orders.filter((item) => item._id == id);

  const [images, setImages] = useState({});
  const [userFilledData, setUserFilledData] = useState({});

  const navigate = useNavigate();

  const submitDataHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await axios
        .post(
          `${apiURL}/return/return-prod`,
          {
            ...userFilledData,
            images,
            orderId: filteredOrders[0]._id,
            seller: filteredOrders[0].prdDeta.seller,
            amount: filteredOrders.ordPrc,
            paymentId: filteredOrders[0].raz_paymentId,
            // seller: "",
          },
          config
        )
        .then((res) => {})
        .catch((Err) => {
          console.log(Err);
        });
    } catch (error) {
      console.log("Registration failed:", error);
    }

    navigate("/");
  };

  const convertToBase64 = (event) => {
    const { name } = event.target;
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      setImages({ ...images, [name]: reader.result });
    };

    reader.onerror = (error) => {
      console.log("ERROR", error);
    };
  };

  useEffect(() => {}, [images]);

  const onchangeHandler = (event) => {
    const { name, value } = event.target;

    setUserFilledData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <div>
              <MDBCol md="6">
                <MDBCardBody className="d-flex flex-column">
                  <div className="d-flex flex-row mt-2">
                    <span className="h1 fw-bold mb-0">HitecMart</span>
                  </div>
                  <h5
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Return Form
                  </h5>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <label
                      htmlFor="formControlLg"
                      className="form-label me-3 w-25"
                    >
                      Name
                    </label>
                    <div className="w-85">
                      <MDBInput
                        id="formControlLg"
                        type="text"
                        size="lg"
                        name="uname"
                        onChange={onchangeHandler}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <label
                      htmlFor="formControlLg"
                      className="form-label me-3 w-25"
                    >
                      Email
                    </label>
                    <MDBInput
                      id="formControlLg"
                      type="email"
                      size="lg"
                      name="email"
                      onChange={onchangeHandler}
                      className="w-85"
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <label
                      htmlFor="formControlLg"
                      className="form-label me-3 w-25"
                    >
                      Phone No.
                    </label>
                    <MDBInput
                      id="formControlLg"
                      type="number"
                      size="lg"
                      name="phone"
                      onChange={onchangeHandler}
                      className="w-85"
                    />
                  </div>

                  <div className="d-flex flex-column align-items-center mb-4">
                    <label htmlFor="">Main image</label>
                    <input
                      type="file"
                      accept="image/png/jpg/jpeg"
                      name="img1"
                      onChange={convertToBase64}
                    />
                    <label htmlFor="">2nd image</label>
                    <input
                      type="file"
                      accept="image/png/jpg/jpeg"
                      name="img2"
                      onChange={convertToBase64}
                    />
                    <label htmlFor="">3rd image</label>
                    <input
                      type="file"
                      accept="image/png/jpg/jpeg"
                      name="img3"
                      onChange={convertToBase64}
                    />
                    <label htmlFor="">4th image</label>
                    <input
                      type="file"
                      accept="image/png/jpg/jpeg"
                      name="img4"
                      onChange={convertToBase64}
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <label
                      htmlFor="formControlLg"
                      className="form-label me-3 w-25"
                    >
                      Product Issue
                    </label>
                    <div className="w-75">
                      <textarea
                        id="formControlLg"
                        className="form-control form-control-lg"
                        rows="4"
                        name="productIssue"
                        onChange={onchangeHandler}
                      ></textarea>
                    </div>
                  </div>

                  <button
                    className="btn btn-dark"
                    color="dark"
                    size="lg"
                    onClick={submitDataHandler}
                  >
                    Return
                  </button>
                </MDBCardBody>
              </MDBCol>
              <MDBCol md="6">
                <h1>uiydrxfghvh</h1>
              </MDBCol>
            </div>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default BuyerReturn;
