import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { apiURL } from "../../../const/config";

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

  const [shippingAddress, setShippingAddress] = useState({});

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);
  // seleted delivery addrees
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [pType, setPType] = useState("");
  const [sum, setSum] = useState(0);

  // getting saved addresses
  const getSavedAddress = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.get(
        `${apiURL}/address/savedaaddress`,
        config
      );

      setAddresses(response.data);
    } catch (error) {
      console.log("API Error", error);
    }
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

  const onChangeHandler = (e) => {
    setAddress((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const saveAddressHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios
        .post(
          `${apiURL}/address/add-address`,
          {
            addressDetails: address,
          },
          config
        )
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });

      setShippingAddress(response.addressDetails);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
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

      let allQua = apiRes.items.map((element) => {
        console.log(element.totalQuantity);
        // allQua+ element.totalQuantity
        return element.totalQuantity;
      });
      let totSum = allQua.reduce((curr, next) => curr + next);
      console.log("Check here", totSum);
      setSum(totSum * 10);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartCarts();
  }, []);

  const totalPrice = Number(params.totalPrice);

  const shippingPrice = 100;
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

  const cashOnDelv = async () => {
    setPType("cash");
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
  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col-md-6 mb-4">
          <div className="card mb-4">
            <div className="card-header py-3">
              <h5 className="mb-0">Billing Details</h5>
            </div>

            {/* saved address */}
            <div style={{ overflowX: "auto" }}>
              <h5 className="mb-0">Saved Address</h5>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedAddress && selectedAddress.id === address.id
                          ? "white"
                          : "white",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "10px",
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    // getting address
                    onClick={() => {
                      setDeliveryAddress(address.addressDetails);
                    }}
                  >
                    <button
                      onClick={() => handleAddressSelection(address)}
                      style={{
                        marginRight: "5px",
                        backgroundColor: "red",
                        border: "none",
                        padding: 0,
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Select ~
                    </button>

                    <div>
                      <p>
                        <strong>Locality:</strong>{" "}
                        {address.addressDetails.locality}
                      </p>
                      <p>
                        <strong>Area:</strong> {address.addressDetails.area}
                      </p>
                      <p>
                        <strong>Landmark:</strong>{" "}
                        {address.addressDetails.landmark}
                      </p>
                      <p>
                        <strong>City:</strong> {address.addressDetails.city}
                      </p>
                      <p>
                        <strong>State:</strong> {address.addressDetails.state}
                      </p>
                      <p>
                        <strong>Pincode:</strong>{" "}
                        {address.addressDetails.pincode}
                      </p>
                      <p>
                        <strong>Phone:</strong> {address.addressDetails.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* saved address */}
              {selectedAddress && (
                <div>
                  <h5>Selected Address:</h5>
                  <p>
                    <strong>Locality:</strong>{" "}
                    {selectedAddress.addressDetails.locality}
                  </p>
                  <p>
                    <strong>Area:</strong> {selectedAddress.addressDetails.area}
                  </p>
                  <p>
                    <span>Landmark:</span>{" "}
                    {selectedAddress.addressDetails.landmark}
                  </p>
                  <p>
                    <strong>City:</strong> {selectedAddress.addressDetails.city}
                  </p>
                  <p>
                    <strong>State:</strong>{" "}
                    {selectedAddress.addressDetails.state}
                  </p>
                  <p>
                    <strong>Pincode:</strong>{" "}
                    {selectedAddress.addressDetails.pincode}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {selectedAddress.addressDetails.phone}
                  </p>
                </div>
              )}
            </div>

            {/* saved address end */}

            <button
              onClick={handleAddAddress}
              style={{ backgroundColor: "red" }}
            >
              Add new address
            </button>

            {showForm && (
              <div className="card-body">
                <form style={{ border: "solid" }}>
                  <div className="row mb-4">
                    <div className="col">
                      <div className="form-outline">
                        <h4>{user.name}</h4>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-outline">
                        <h4>{user.phone}</h4>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Number input --> */}
                  <div className="form-outline mb-4">
                    <input
                      type="number"
                      id="form7Example3"
                      className="form-control"
                      value={address.pincode}
                      name="pincode"
                      onChange={onChangeHandler}
                    />
                    <label className="form-label" for="form7Example3">
                      Pincode
                    </label>
                  </div>

                  {/* <!-- locality input --> */}
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="form7Example4"
                      className="form-control"
                      value={address.locality}
                      name="locality"
                      onChange={onChangeHandler}
                    />
                    <label className="form-label" for="form7Example4">
                      Locality
                    </label>
                  </div>

                  {/* <!-- area input --> */}
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="form7Example5"
                      className="form-control"
                      value={address.area}
                      name="area"
                      onChange={onChangeHandler}
                    />
                    <label className="form-label" for="form7Example5">
                      Address(Area and street)
                    </label>
                  </div>

                  {/* <!-- Number input --> */}
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="form7Example6"
                      className="form-control"
                      value={address.city}
                      name="city"
                      onChange={onChangeHandler}
                    />
                    <label className="form-label" for="form7Example6">
                      City/DIstrict/Town
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="form7Example6"
                      className="form-control"
                      value={address.state}
                      name="state"
                      onChange={onChangeHandler}
                    />
                    <label className="form-label" for="form7Example6">
                      State
                    </label>
                  </div>
                  {/* <!-- Message input --> */}
                  <div className="form-outline mb-4">
                    <input
                      className="form-control"
                      id="form7Example7"
                      rows="4"
                      value={address.landmark}
                      name="landmark"
                      onChange={onChangeHandler}
                    ></input>
                    <label className="form-label" for="form7Example7">
                      Landmart(optional)
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      className="form-control"
                      id="form7Example7"
                      rows="4"
                      value={address.phone}
                      name="phone"
                      onChange={onChangeHandler}
                    ></input>
                    <label className="form-label" for="form7Example7">
                      AlternatePhone(optional)
                    </label>
                  </div>
                  {/* <!-- Checkbox --> */}
                  <button
                    style={{ backgroundColor: "green", borderRadius: "30px" }}
                    onClick={saveAddressHandler}
                  >
                    save
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card mb-4">
            <section
              className="h-100"
              style={{ backgroundColor: "#eee", marginTop: "100px" }}
            >
              <div className="container h-100 py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-10">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h3 className="fw-normal mb-0 text-black">
                        Products
                      </h3>
                    </div>
                    {cartItems.items.map((item) => {
                      return (
                        <div className="card rounded-3 mb-4" key={item._id}>
                          <div className="card-body p-4">
                            <div className="row d-flex justify-content-between align-items-center">
                              <div className="col-md-2 col-lg-2 col-xl-2">
                                <Slider {...settings}>
                                  <img
                                    className="img-fluid img-responsive rounded product-image h-32 w-32"
                                    src={item.productDetails.images}
                                    alt="img"
                                  />
                                </Slider>
                              </div>

                              <div className="col-md-3 col-lg-3 col-xl-3">
                                {/* <div>
                                  <select>
                                    <option value="option1">Option 1</option>
                                    <option value="option2">Option 2</option>
                                    <option value="option3">Option 3</option>
                                    <option value="option4">option 4</option>
                                  </select>
                                </div> */}
                                <p className="lead fw-normal mb-2">
                                  {item.productDetails.barnd}
                                </p>

                                <p>
                                  <span
                                    className="text-muted"
                                    style={{ color: "green" }}
                                  >
                                    Category:
                                    {item.productDetails.category}{" "}
                                  </span>
                                </p>
                                <p>
                                  Product price :{item.productDetails.price}
                                </p>
                                {/* <h1>{item.quantity}</h1> */}
                              </div>
                              {/* <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 className="mb-0">
                                  {item.productDetails.price *
                                    item.totalQuantity}
                                </h5>
                                <button
                                  className="btn btn-link px-2"
                                  onClick={() => removeFromCart(item._id)}
                                >
                                  <i className="fas fa-trash fa-lg"></i>
                                </button>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <h2>Total {totalPrice}</h2>
                    <div className="card">
                      <div className="card-body"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="card-header py-3">
              <h5 className="mb-0">Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products
                  <span>{totalPrice}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>{sum}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  GST- (5%)
                  <span>{GST}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p className="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span>
                    <strong>{parseInt(totalPrice) + GST + sum}</strong>
                  </span>
                </li>
              </ul>
              {Object.keys(deliveryAddress).length ? (
                <>
                  <h5 className="text-red-600"> 
                    For Cash on Delivery You need to pay Minimum 10% of the real
                    Product Price. GST + Shippment Charge will be Included
                  
                  </h5>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg btn-block text-black"
                    onClick={cashOnDelv}
                  >
                    CashOnDelivery
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block mx-2 text-black"
                    onClick={placeOrderButton2}
                  >
                    Make purchase
                  </button>
                </>
              ) : (
                <h1>Please Fill or Select the Address</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerConfirm;
