import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { apiURL } from "../../../const/config";
import NewAddress from "../NEwAddress/NewAddress";
import { getUserAddress } from "../../../const/api";

const BuyerConfirm = () => {
  const navigate = useNavigate();
  const params = useParams();

  // getting user info
  const user = useSelector((state) => state.userReducer.user);

  const [cartItems, setCartItems] = useState([]);

  const [address, setAddress] = useState({
    pincode: "",
    locality: "",
    area: "",
    city: "",
    state: "",
    landmark: "",
    phone: null,
  });

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // seleted delivery addrees
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

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
  };

  const handleAddAddress = () => {
    setShowForm(true);
  };

  const getCartCarts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const apiRes = await axios
        .get(`${apiURL}/cart/user-cart`, config)
        .then((res) => {
          setCartItems(res.data);
          // console.log("Quantity",res.data.items[0].totalQuantity)
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

  const placeOrderButton = async (paymentId, amount) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      let res = await axios
        .post(
          `${apiURL}/orders/placeOrder`,
          {
            products: cartItems,
            address: deliveryAddress,
            paymentId,
            orderStatus: "Success",
            totalAmount: amount,
          },
          config
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      return res;
    } catch (error) {
      console.log(error);
    }
  };

  // get api key
  const getApiKey = async () => {
    return await axios
      .get(`${apiURL}/payment/get-api-key`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // payment
  const makePayment = async (amount) => {
    return await axios
      .post(`${apiURL}/payment/pay`, { amount })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromCart = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios
        .delete(`${apiURL}/cart/delete-cart-item/${id}`, config)
        .then((res) => {
          getCartCarts();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
    navigate("/shoppingPage");
  };

  // cash on delivery
  const cashOnDelv = async () => {
    let keys = getApiKey();

    let cashbaby = (totalPrice * 10) / 100 + sum + GST;

    let payment = await makePayment(parseInt(cashbaby));

    let orderStoreInDB = await placeOrderButton(
      payment.data.id,
      payment.data.amount
    );

    const options = {
      key: keys.key,
      amount: payment.data.amount,
      currency: "INR",
      name: "Hitech Mart",
      description: "B2B Cloth store",
      image:
        "https://hitecmart.com/wp-content/uploads/2022/10/20221008_194021_0000.png",
      order_id: payment.data.id,
      callback_url: `${apiURL}/payment/payment-verification/${orderStoreInDB.ids}?pType=cash`,
      prefill: {
        name: user.name, //login user name
        email: user.email, //login user email
        contact: user.phone, //contact number
        order: orderStoreInDB,
        pTyp: "Cash",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);

    if (orderStoreInDB.ids) {
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
    });
  };

  // online payment
  const placeOrderButton2 = async () => {
    // api keys
    let keys = getApiKey();

    // payment checkout
    let payment = await makePayment(parseInt(totalPrice) + GST + sum);

    let orderStoreInDB = await placeOrderButton(
      payment.data.id,
      payment.data.amount
    );

    const options = {
      key: keys.key,
      amount: payment.data.amount,
      currency: "INR",
      name: "Hitech Mart",
      description: "B2B Cloth store",
      image:
        "https://hitecmart.com/wp-content/uploads/2022/10/20221008_194021_0000.png",
      order_id: payment.data.id,
      callback_url: `${apiURL}/payment/payment-verification/${orderStoreInDB.ids}?pType=online`,
      prefill: {
        name: user.name, //login user name
        email: user.email, //login user email
        contact: user.phone, //contact number
        order: orderStoreInDB,
        pTyp: "online",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);

    if (orderStoreInDB.ids) {
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
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center" style={{ marginTop: "40px" }}>
        <img
          src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png"
          alt="img"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <Link to="/shoppingPage">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <button
              style={{
                backgroundColor: "green",
                height: "50px",
                width: "100px",
                borderRadius: "40px",
              }}
            >
              Shop Now
            </button>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "yellow" }}>
      <div
        className="row"
        style={{ marginTop: "100px", backgroundColor: "white" }}
      >
        {/* <div style={{ display: "flex" }}>
        
      </div> */}
        <div className="col-md-1"></div>
        <div
          className="col-md-6 mb-4 mw-100"
          style={{ overflowX: "auto", backgroundColor: "#eeeeee" }}
        >
          <div
            className="row justify-content-center"
            style={{ marginTop: "45px" }}
          >
            <h1 style={{ color: "#bf0a2a", fontSize: "23px" }}>Deliver to</h1>
          </div>
          <button onClick={handleAddAddress} className="btn btn-primary">
            Add new
          </button>
          {/* saved Address */}
          <div
            className="card mb-4"
            style={{ backgroundColor: "#eeeeee", borderRadius: 0, border: 0 }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {addresses.map((address) => (
                <div
                  key={address.id}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#ffffff",
                    margin: "20px",
                    alignItems: "center",
                  }}
                  // getting address
                  onClick={() => {
                    setDeliveryAddress(address.addressDetails);
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      className="form-check"
                      onClick={() => handleAddressSelection(address)}
                      style={{
                        // margin:"10px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        className="form-check-input m-2"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                    </div>
                    <div className="m-3">
                      <p>
                        <span>Locality: {address.addressDetails.locality}</span>
                      </p>
                      <p>
                        <span>Area: {address.addressDetails.area}</span>
                      </p>
                      <p>
                        <span>Landmark: {address.addressDetails.landmark}</span>
                      </p>
                      <p>
                        <span>City: {address.addressDetails.city}</span>
                      </p>
                      <p>
                        <span>State: {address.addressDetails.state}</span>
                      </p>
                      <p>
                        <span>Pincode: {address.addressDetails.pincode}</span>{" "}
                      </p>
                      <p>
                        <span>Phone: {address.addressDetails.phone}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* saved address */}
            {selectedAddress && (
              <div>
                <h5>Selected Address:</h5>
                <p>
                  <span>Locality:</span>{" "}
                  {selectedAddress.addressDetails.locality}
                </p>
                <p>
                  <span>Area:</span> {selectedAddress.addressDetails.area}
                </p>
                <p>
                  <span>Landmark:</span>{" "}
                  {selectedAddress.addressDetails.landmark}
                </p>
                <p>
                  <span>City:</span> {selectedAddress.addressDetails.city}
                </p>
                <p>
                  <span>State:</span> {selectedAddress.addressDetails.state}
                </p>
                <p>
                  <span>Pincode:</span> {selectedAddress.addressDetails.pincode}
                </p>
                <p>
                  <span>Phone:</span> {selectedAddress.addressDetails.phone}
                </p>
              </div>
            )}
            {showForm && <NewAddress getSavedAddress={getSavedAddress} />}
          </div>
          <div className="card mb-4">
            <div className="card-header py-3">
              <h5 className="mb-0">Select Address or add new address</h5>
            </div>

            {showForm && <NewAddress getSavedAddress={getSavedAddress} />}
          </div>
        </div>

        {/* Order summary */}
        <div className="col-md-4" style={{ borderRadius: 0 }}>
          <div
            className="card "
            style={{ backgroundColor: "#EEEEEE", borderRadius: 0, border: 0 }}
          >
            <div className="row justify-content-center mb-4" >
              <h1 style={{ color: "#bf0a2a", fontSize: "23px", }}>Pay With</h1>
            </div>
          </div>

          {/* order summ */}
          <div
            className="card mb-4"
            style={{ backgroundColor: "#EEEEEE", borderRadius: 0, border: 0 }}
          >
            <div className="container h-100 py-5">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="row justify-content-center mb-4 mt-0">
                  <h1 style={{ color: "#bf0a2a", fontSize: "23px" }}>
                    Order Summary
                  </h1>
                </div>
                <div className="col-10">
                  <div className="d-flex justify-content-between m-3">
                    <div className="font-weight-bold">Items</div>
                    <div>12345</div>
                  </div>
                  <div className="d-flex justify-content-between m-3">
                    <div>Delivery</div>
                    <div>200</div>
                  </div>
                  <div className="d-flex justify-content-between m-3">
                    <div>GST</div>
                    <div>100</div>
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
                    <b>₹ 100235</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="btn btn-danger w-100 border p-3"
            style={{ borderRadius: "0px", backgroundColor: "#bf0a2a" }}
          >
            <span style={{ color: "#fff7e9" }}>Place Order</span>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
};

export default BuyerConfirm;
