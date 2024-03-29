import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useStore } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { apiURL } from "../../../const/config";
import NewAddress from "../NEwAddress/NewAddress";
import { getUserAddress } from "../../../const/api";
import { MDBRadio } from "mdb-react-ui-kit";
import httpService from "../../Error Handling/httpService";
import { toast } from "react-toastify";
import { Triangle, Vortex } from "react-loader-spinner";

const BuyerConfirm = () => {
  const params = useParams();


  // getting user info
  const user = useSelector((state) => state.userReducer.user);

  const [cartItems, setCartItems] = useState([]);

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [payType, setPayType] = useState("");

  const [loader, setLoader] = useState(false);
  // const [paid, setPaid] = useState(params.totalPrice);

  // selected delivery addrees
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [sum, setSum] = useState(0);





  // getting saved addresses

  const getSavedAddress = async () => {
    const ans = await getUserAddress();
    setAddresses(ans);
    setShowForm(false);
  };
  useEffect(() => {
    getSavedAddress();
  }, []);

  const handleAddAddress = () => {
    setShowForm(!showForm);
  };

  const getCartCarts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const apiRes = await httpService
        .get(`${apiURL}/cart/user-cart`, config)
        .then((res) => {
          setCartItems(res.data);

          console.log("User Cart", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      // total quantity
      let allQua = apiRes.items.map((element) => {
        return element.totalQuantity;
      });

      // cart sum
      let totSum = allQua.reduce((curr, next) => curr + next);
      setSum(totSum * 10);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartCarts();
  }, []);

  const totalPrice = Number(params.totalPrice);

  const GST = (5 * totalPrice) / 100;

  const warningMsg = (message) => {
    toast.warning(message);
  };

  // place order
  const placeOrder = async (paymentId, amount) => {
    setLoader(true)
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      let res = await httpService
        .post(
          `${apiURL}/orders/placeOrder`,
          {
            products: cartItems,
            address: deliveryAddress.addressDetails,
            // paymentId,
            // totalAmount: amount,
          },
          config
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          toast.warning(err.response.data.message);
          // return ;
        });
      console.log("ERROR WHILE PLACING", res);
      return res;
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  // payment razorpay
  const makePayment = async (amount) => {
    return await httpService
      .post(`${apiURL}/payment/pay`, { amount })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const placeOrderButton = async () => {

    const valid = Object.keys(deliveryAddress).length > 0;

    try {
      if (valid && payType !== "") {
    setLoader(true);

        const pType = payType === "Cash on delivery" ? "cash" : "online";

        // payment checkout

        const amount =
          payType === "Cash on delivery"
            ? (totalPrice * 10) / 100 +
              sum +
              (((totalPrice * 10) / 100) * 5) / 100
            : parseInt(totalPrice) + GST + sum;
        let payment = await makePayment(amount);

        let orderStoreInDB = await placeOrder(
          payment.data.id,
          payment.data.amount
        );

        console.log("Order Ids", orderStoreInDB);
        console.log("payment", payment);
        setLoader(false);
        const options = {
          key: "rzp_live_m3oBDZHhzp8QRY",
          amount: payment.data.amount,
          currency: "INR",
          name: "Hitech Mart",
          description: "B2B Cloth store",
          image:
            "https://hitecmart.com/wp-content/uploads/2022/10/20221008_194021_0000.png",
          order_id: payment.data.id,
          callback_url: `${apiURL}/payment/payment-verification/${orderStoreInDB.ids}?pType=${pType}`,
          prefill: {
            name: user.name, //login user name
            email: user.email, //login user email
            contact: user.phone, //contact number
            order: orderStoreInDB,
            pTyp: pType,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razor = new window.Razorpay(options);

        if (orderStoreInDB.ids && orderStoreInDB !== undefined) {
          return razor.open();
        }
        razor.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);

          console.log("Resposne", response);
          setLoader(false);
        });
      } else {
        // return  <Alert/>
        warningMsg("Plese selete address or add address");
        setLoader(false);
      }
    } catch (error) {
      console.log("ERORR  ==>", error);
      // alert("refresh the page")
    }
  };

  if (cartItems.length === 0) {
    return (
      <div
        className="spinner-border"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
          width: "50px",
          margin: "auto",
        }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  // calculate Gst
  const calGST = () => {
    // (((parseInt(totalPrice) * 10) / 100) * 5) / 100
    if (payType === "Online Payment") {
      return GST;
    } else {
      return (((parseInt(totalPrice) * 10) / 100) * 5) / 100;
    }
  };

  // paid amount
  const calPaidAmount = () => {
    if (payType !== "Cash on delivery") {
      return parseInt(params.totalPrice) + GST + sum;
    } else {
      const amount =
        (parseInt(params.totalPrice) * 10) / 100 +
        (((parseInt(params.totalPrice) * 10) / 100) * 5) / 100 +
        sum;
      return amount;
    }
  };

  // console.log(calPaidAmount(), "ORDER PRICE");
  return (
    <>
      {loader ? (
        <div
          className="flex justify-center items-center"
          style={{ marginTop: "17%" }}
        >
          <div>
            <Vortex
              visible={true}
              height="80"
              width="80"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={["red", "green", "blue", "yellow", "orange", "purple"]}
            />
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <div className="row" style={{ backgroundColor: "white" }}>
            <div className="col-md-1"></div>

            <div
              className="col-md-6 mb-4 w-50 "
              style={{ overflowX: "auto", backgroundColor: "#eeeeee" }}
            >
              <div
                className="row justify-content-center"
                style={{ marginTop: "45px" }}
              >
                <h1
                  style={{
                    color: "#bf0a2a",
                    fontSize: "30px",
                    fontFamily: "poppins",
                    fontWeight: "bold",
                  }}
                >
                  Deliver to
                </h1>
              </div>

              <div className="card m-2">
                <div className="card-header p-3">
                  <h5 className="mb-0">Select Address or add new address</h5>
                </div>
              </div>
              <button
                className="btn btn-danger w-90 border m-2"
                style={{
                  color: "#fff7e9",
                  borderRadius: "0px",
                  backgroundColor: "#bf0a2a",
                  cursor: "pointer",
                }}
                onClick={handleAddAddress}
              >
                Add new Address
              </button>
              {/* saved Address */}
              <div
                className="card "
                style={{
                  backgroundColor: "#eeeeee",
                  borderRadius: 0,
                  border: 0,
                }}
              >
                {!showForm ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {addresses.map((address) => (
                      <div
                        key={address._id}
                        style={{
                          cursor: "pointer",
                          backgroundColor: "#ffffff",
                          margin: "20px",
                          alignItems: "center",
                        }}
                        // getting address
                        onClick={() => setDeliveryAddress(address)}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            <MDBRadio
                              name={address.area}
                              id={address._id}
                              inline
                              checked={deliveryAddress._id === address._id}
                            />
                          </div>
                          <div className="m-3">
                            <p>
                              <span>Name: {address.addressDetails.name}</span>
                            </p>
                            <p>
                              <span>
                                Locality: {address.addressDetails.locality}
                              </span>
                            </p>
                            <p>
                              <span>Area: {address.addressDetails.area}</span>
                            </p>
                            <p>
                              <span>
                                Landmark: {address.addressDetails.landmark}
                              </span>
                            </p>
                            <p>
                              <span>City: {address.addressDetails.city}</span>
                            </p>
                            <p>
                              <span>State: {address.addressDetails.state}</span>
                            </p>
                            <p>
                              <span>
                                Pincode: {address.addressDetails.pincode}
                              </span>{" "}
                            </p>
                            <p>
                              <span>Phone: {address.addressDetails.phone}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <NewAddress getSavedAddress={getSavedAddress} />
                )}
              </div>
            </div>

            <div className="col-md-4" style={{ borderRadius: 0 }}>
              <div
                className="card "
                style={{
                  backgroundColor: "#EEEEEE",
                  borderRadius: 0,
                  border: 0,
                }}
              >
                <div className="row justify-content-center m-3">
                  <h1
                    style={{
                      color: "#bf0a2a",
                      fontSize: "30px",
                      fontFamily: "poppins",
                      fontWeight: "bold",
                    }}
                  >
                    Pay With
                  </h1>
                </div>
                {["Cash on delivery", "Online Payment"].map((type, index) => (
                  <div
                    style={{
                      display: "flex",
                      margin: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    key={`reverse-${index}`}
                  >
                    <MDBRadio
                      name="inlineRadio"
                      id={`inlineRadio${index}`}
                      value={type}
                      onChange={() => setPayType(type)}
                      inline
                    />
                    <div style={{ display: "flex" }}>{type}</div>
                  </div>
                ))}
              </div>

              {/* Order summary */}
              <div
                className="card"
                style={{
                  backgroundColor: "#EEEEEE",
                  borderRadius: 0,
                  border: 0,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                <div className="container py-5">
                  <div className="row d-flex justify-content-center align-items-center">
                    <div className="row justify-content-center mb-4 mt-0">
                      <h1
                        style={{
                          color: "#bf0a2a",
                          fontSize: "30px",
                          fontFamily: "poppins",
                          fontWeight: "bold",
                        }}
                      >
                        Order Summary
                      </h1>
                    </div>

                    <div className="col-10">
                      <div className="d-flex justify-content-between m-3">
                        <div className="font-weight-bold">Items</div>
                        <div>{totalPrice}</div>
                      </div>

                      {payType === "Cash on delivery" && (
                        <>
                          <div>
                            <hr className="hr" />
                          </div>
                          <div className="d-flex justify-content-between m-3">
                            <div className="font-weight-bold">Items(10%)</div>
                            <div>{(parseInt(totalPrice) * 10) / 100}</div>
                          </div>
                        </>
                      )}

                      <div className="d-flex justify-content-between m-3">
                        <div>Delivery</div>
                        <div>{sum}</div>
                      </div>
                      <div className="d-flex justify-content-between m-3">
                        <div>GST- (5%)</div>
                        <div>{calGST()}</div>
                      </div>
                    </div>
                    <div>
                      <hr className="hr" />
                    </div>
                    <div
                      className="d-flex justify-content-between m-3"
                      style={{ color: "#bf0a2a" }}
                    >
                      <div
                        className="font-weight-bold"
                        style={{ marginLeft: "30px" }}
                      >
                        <b>Order Total:</b>
                      </div>

                      <div
                        className="font-weight-bold"
                        style={{ marginRight: "46px" }}
                      >
                        <b>{calPaidAmount()}</b>
                      </div>
                    </div>
                  </div>
                  {payType === "Cash on delivery" && (
                    <span className="p-3" style={{ fontSize: "13px" }}>
                      For Cash on Delivery You need to pay Minimum 10% of the
                      real product price. + GST + Shippment Charge will be
                      Included
                    </span>
                  )}
                </div>
              </div>

              {!loader && (
                <div>
                  <button
                    className="btn btn-danger w-100 border p-3"
                    style={{
                      color: "#fff7e9",
                      borderRadius: "0px",
                      backgroundColor: "#bf0a2a",
                    }}
                    onClick={placeOrderButton}
                  >
                    Place Order
                  </button>
                </div>
              )}
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyerConfirm;
