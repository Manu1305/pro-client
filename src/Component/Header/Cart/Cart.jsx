import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { apiURL } from "../../../const/config";
import Styles from "./cart.module.css";
import { BsTrash } from "react-icons/bs";
import httpService from "../../Error Handling/httpService";
import { ScaleLoader } from "react-spinners";
 


const Cart = ({ setCartItems }) => {
  const [CartItem, setCartItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const removeFromCart = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await httpService
        .delete(`${apiURL}/cart/delete-cart-item/${id}`, config)
        .then((res) => {
          console.log(res);
          getCarts();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const getCarts = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

     return await httpService
        .get(`${apiURL}/cart/user-cart`, config)
        .then((res) => {
          if (res.data.Message === "Your cart is empty...!") {
            setCartItem([])
          } else {
            console.log(res.data);
            setCartItem(res.data);
          }
        })
        .catch((err) => console.log(err.config.message));
    } catch (error) {
      console.log("API Error", error);
    }
  };

  useEffect(() => {
    getCarts();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (CartItem.subTotal === 0) {
    return (
      <div className="text-center">
        {/* <img
          src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png"
          alt="empty"
          style={{ maxWidth: "100%", height: "auto" }}
        /> */}
        
        <Link to="/shoppingPage">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
             <div style={{margin:'auto'}} >
        {isLoading ? (
         <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
           <ScaleLoader  animation="border" role="status" color="red">
             {/* <span className="visually-hidden">Loading...</span> */}
           </ScaleLoader >
         
         </div>
       ) : (
        <div>
 <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1692603469~exp=1692604069~hmac=6b009cb003b1ee1aad15bfd7eefb475e78ce63efc0f53307b81b1d58ea66b352" alt="Loaded Image" />
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
        
       
       )}
       </div>
           
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
    <div>
      <section className="h-100" style={{ backgroundColor: "white" }}>
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10" >
              {/* <h2>Total {totalPrice}</h2> */}
              {CartItem.items?.length  &&
                CartItem.items.map((item) => (
                  <div className={Styles.cartDiv} key={item._id}>
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
                          <p className="font-bold text-xl text-black">
                            {item.productDetails.barnd}
                          </p>

                          <p>
                            <p className="text-muted">
                              {item.productDetails.description}
                            </p>
                          </p>

                          <div>
                            <label>Size</label>
                            <select
                              className={Styles.select}
                              style={{
                                appearance: "none",
                                width: "100px",
                                marginLeft: "10px",
                                WebkitAppearance: "none",
                              }}
                            >
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
                              <span
                                className="text-muted"
                                // style={{ color: "green" }}
                              >
                                Total quantities {item.totalQuantity}{" "}
                              </span>
                            </div>

                            <div>
                              <span className="text-red-600 text-xl font-bold">
                                price : &#8377;{item.productDetails.price}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex"></div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <div className={Styles.hideprice}>
                            <span className="text-red-600 text-xl font-bold">
                              &#8377;
                              {item.productDetails.price * item.totalQuantity}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <button
                            className="btn btn-link px-2 text-red-700"
                            onClick={() => removeFromCart(item._id)}
                          >
                            <BsTrash className="h-10 w-10" />
                            {/* <i className="fas fa-trash fa-lg"></i> */}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {CartItem.items?.length &&
              <><h2 className="text-black font-extrabold">
              SubTotal: &#8377;{CartItem.subTotal}
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="mt-2">
                <Link to={`/confirm/${CartItem.subTotal}`}>
                  <button
                    type="button"
                    className="btn  btn-block btn-lg"
                    style={{
                      backgroundColor: "#BF0A2A",
                      color: "white",
                      fontSize: "1rem",
                      borderRadius: "0",
                      width: "300px",
                    }}
                  >
                    Proceed to Pay
                  </button>
                </Link>
              </div>
            </div></>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
