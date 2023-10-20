import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdDeleteSweep } from "react-icons/md";
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
import httpService from "../../../../Error Handling/httpService";

const BuyerReturn = () => {
  const orders = useSelector((state) => state.orderReducer.order);

  const { id } = useParams();

  const filteredOrders = orders.filter((item) => item._id == id);

  // const [images, setImages] = useState({});
  const [userFilledData, setUserFilledData] = useState({});
  const [images, setImages] = useState([]);

  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate();

  const handleImageSelection = (e) => {
    const selectedImages = e.target.files;
    const previews = [];
    const selected = [];

    for (let i = 0; i < selectedImages.length; i++) {
      selected.push(selectedImages[i]);
      previews.push(URL.createObjectURL(selectedImages[i]));
    }

    setImages((prevImages) => [...prevImages, ...selected]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
  };

  const submitDataHandler = async (e) => {
    e.preventDefault();
    console.log("FILLED DATA",userFilledData);
    if (filteredOrders.length === 0) {
      // Handle the case where no orders were found for the provided id
      console.log("No orders found for the provided ID");
      // You can return an error response or take appropriate action here
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const formData = new FormData();
    for (const file of images) {
      formData.append("images", file);
    }

      formData.append("orderId", filteredOrders[0]._id);
      formData.append("seller", filteredOrders[0].prdData.seller);
      formData.append("amount", filteredOrders[0].ordPrc);
      formData.append("phone", userFilledData.phone);
      formData.append("uname", userFilledData.name);


      formData.append("paymentId", filteredOrders[0].raz_paymentId);
      formData.append("productIssue", userFilledData.productIssue);

      await httpService
        .post(`${apiURL}/return/return-prod`, formData, config)
        .then((res) => {

          // Handle the response
          console.log("RES Order", res.data);
          navigate("/buyerOrder");
        })
        .catch((Err) => {
          console.log(Err);
        });
    } catch (error) {
      console.log("Registration failed:", error);
    }
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

                  {/* <div className="d-flex flex-column align-items-center mb-4">
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
                  </div> */}
                  <div className="bg-white mt-3 p-1">
                    <div style={{ marginTop: "30px" }}>
                      <h3 className="m-1 fw-bold">Product image</h3>

                      <br />
                      <h4>Add the product main image</h4>
                      <div className="flex items-center justify-center w-auto">
                        <label
                          for="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden border-0"
                            name="images"
                            onChange={handleImageSelection}
                            accept="image/*"
                            multiple
                          />
                        </label>
                        <div className="image-previews flex flex-row">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="image-preview">
                              <img
                                src={preview}
                                alt="SDC"
                                style={{
                                  maxWidth: "100px",
                                  maxHeight: "100px",
                                  margin: "10px",
                                }}
                              />
                              <button
                                onClick={() => {
                                  const updatedImages = [...images];
                                  updatedImages.splice(index, 1);
                                  setImages(updatedImages);

                                  const updatedPreviews = [...imagePreviews];
                                  updatedPreviews.splice(index, 1);
                                  setImagePreviews(updatedPreviews);
                                }}
                              >
                                <MdDeleteSweep
                                  style={{
                                    display: "flex",
                                    height: "40px",
                                    alignItems: "center",
                                    color: "red",
                                  }}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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
            </div>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default BuyerReturn;
