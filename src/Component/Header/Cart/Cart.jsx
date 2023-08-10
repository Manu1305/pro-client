
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { apiURL } from "../../../const/config";


const Cart = ({setCartItems}) => {
  const [CartItem, setCartItem] = useState([]);

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
          console.log(res);
          getCartCarts();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error removing item from cart:", error);
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

      await axios
        .get(`${apiURL}/cart/user-cart`, config)
        .then((res) => {
       
          setCartItem(res.data);
          setCartItems(res.data.items.length)
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("API Error", error);
    }
  };

 
  useEffect(() => {
    getCartCarts();
  }, []);

  if (CartItem.length === 0) {
    return (
      <div className="text-center" style={{ marginTop: "40px" }}>
        <img
          src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png"
          alt="empty"
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
  };

  return (
    <>
      <section
        className="h-100"
        style={{ backgroundColor: "#eee", marginTop: "100px" }}
      >
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                {/* <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3> */}
              </div>

              {/* <h2>Total {totalPrice}</h2> */}
              {CartItem.items.length > 0 &&
                CartItem.items.map((item) => (
                  <div className="card rounded-3 mb-4" key={item._id}>
                    <div className="card-body p-4">
                      <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <Slider {...settings}>
                            <img
                              src={item.productDetails.images}
                              className="img-fluid img-responsive rounded product-image"
                              alt="img"
                            />
                          </Slider>
                        </div>

                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <p className="lead fw-normal mb-2">
                            {item.productDetails.barnd}
                          </p>

                          <p>
                            <p className="text-muted">
                              {item.productDetails.description}
                            </p>
                          </p>

                          <div>
       
                            <label>Select Size</label>
                            <select>
                              {Object.entries(item.sizeWithQuantity).map(
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

                            <div>
                              <span>price :{item.productDetails.price}</span>
                            </div>

                            <div>
                              <span
                                className="text-muted"
                                // style={{ color: "green" }}
                              >
                                Total quantities {item.totalQuantity}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                       
                        </div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <button
                            className="btn btn-link px-2"
                            onClick={() => removeFromCart(item._id)}
                          >
                            <i className="fas fa-trash fa-lg"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              <h2>Total {CartItem.subTotal}</h2>

              {/* <div className="card mb-4">
                <div className="card-body p-4 d-flex flex-row">
                  <div className="form-outline flex-fill">
                    <input
                      type="text"
                      id="form1"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="form1">
                      Discount code
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-warning btn-lg ms-3"
                  >
                    Apply
                  </button>
                </div>
              </div> */}

              <div className="card">
                <div className="card-body">
                  <Link to={`/confirm/${CartItem.subTotal}`}>
                    <button
                      type="button"
                      className="btn btn-warning btn-block btn-lg"
                    >
                      Proceed to Pay
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart
