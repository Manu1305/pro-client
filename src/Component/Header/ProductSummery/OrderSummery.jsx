import React, { useEffect, useState } from "react";
import styless from "./OrderSummery.module.css";
import { positions } from "@mui/system";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import styless from "./NewArrival.module.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";

export const OrderSummery = () => {
  // const navigate = useNavigate();
  const [CartItem, setCartItem] = useState([]);
  const [count, setCount] = useState(0);
  const totalPrice = CartItem.reduce(
    (price, item) => price + item.quantity * item.sellingPrice,
    0
  );

  const userId = useSelector((state) => state.userReducer.user);
  

  
  const getCartCarts = async (req, res) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    await httpService.get(`${apiURL}/cart/cart`, config).then((res) => {
      setCartItem(res.data);
     
    });
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
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
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
                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
              </div>
              {CartItem.map((item) => (
                <div className="card rounded-3 mb-4" key={item._id}>
                  <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                      <div className="col-md-2 col-lg-2 col-xl-2">
                        <Slider {...settings}>
                          {item.images.map((img, index) => {
                            return (
                              <img
                                key={index}
                                src={img}
                                className="img-fluid img-responsive rounded product-image"
                                // className="img-fluid rounded-3"
                                // alt={img.productDetail.brand}
                              />
                            );
                          })}
                        </Slider>
                      </div>

                      <div className="col-md-3 col-lg-3 col-xl-3">
                      <div>
       <label>Select Size</label>
       <select  >
         <option value="option1">Option 1</option>
         <option value="option2">Option 2</option>
         <option value="option3">Option 3</option>
         <option value="option4">option 4</option>

      </select>
       {/* <p>Selected option: {selectedOption}</p> */}
     </div>
                        <p className="lead fw-normal mb-2">
                          {item.productDetail.brand}
                        </p>

                        <p>
                          <span
                            className="text-muted"
                            style={{ color: "green" }}
                          >
                            {item.title}{" "}
                          </span>

                          <p className="text-muted">
                            {/* {item.productDetail.description} */}
                          </p>
                        </p>
                        <p>Product price :{item.sellingPrice}</p>
                        {/* <h1>{item.quantity}</h1> */}
                      </div>
                      {/* <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button
                          className="btn btn-link px-2"
                          onClick={() => decreaseQty(item._id)}
                        >
                          <i className="fas fa-minus"></i>
                        </button>

                        <input
                          id={`form${item.id}`}
                          min="0"
                          name="quantity"
                          value={item.quantity}
                          type="number"
                          className="form-control form-control-sm"
                          style={{ color: "black" }}
                        />

                        <button
                          className="btn btn-link px-2"
                          onClick={() => increaseQun(item._id)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div> */}
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 className="mb-0">
                          {item.sellingPrice * item.quantity}
                        </h5>
                      </div>
                      {/* <div className="col-md-1 col-lg-1 col-xl-1 text-end">
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
              ))}
              <h2>Total {totalPrice}</h2>

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
                  {/* <Link to={`/confirm/${totalPrice}`}>
                    <button
                      // onClick={() => {
                      //   paymentPage()
                      // }}
                      type="button"
                      className="btn btn-warning btn-block btn-lg"
                    >
                      Proceed to Pay
                    </button>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};