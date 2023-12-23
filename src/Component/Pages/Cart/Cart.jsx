import React from "react";
import { Link, } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { apiURL } from "../../../const/config";
import Styles from "./cart.module.css";
import { BsTrash } from "react-icons/bs";
import httpService from "../../Error Handling/httpService";
// import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { userCartItem } from "../../../Redux/cart/cartAction";

const Cart = () => {
 

  const CartItem = useSelector((state) => state.cartReducer.userCart);

  console.log(CartItem);

  const dispatch = useDispatch();

  const removeFromCart = async (id) => {
    Swal.fire({
      title: "Removing from cart.?",
      // text: "Remove from cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove it",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          };

          httpService
            .delete(`${apiURL}/cart/delete-cart-item/${id}`, config)
            .then((res) => {
              console.log("User CArt", res.data);
              dispatch(userCartItem(res.data));
              Swal.fire(
                "Removed",
                "Your product removed from cart.",
                "success"
              );
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {
          console.error("Error removing item from cart:", error);
        }
      }
    });
  };

  if (CartItem.subTotal === 0) {
    return (
      <div className="text-center">
        <Link to="/shop">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <div style={{ margin: "auto" }}>
              <div>
                <img
                  src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1692603469~exp=1692604069~hmac=6b009cb003b1ee1aad15bfd7eefb475e78ce63efc0f53307b81b1d58ea66b352"
                  alt="Loaded"
                />
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
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className={`h-100 `} style={{ backgroundColor: "white" }}>
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              {CartItem.items?.length ? (
                CartItem.items.map((item) => (
                  <div className="shadow-xl h-25 mb-3" key={item._id}>
                    <div
                      className="card-body p-4"
                      // onClick={() => navigate(`/ViewDetails/${item.productId}`)}
                    >
                      <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                          <img src={item.productDetails.images} alt="item" />
                        </div>

                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <p className="font-bold text-xl text-black">
                            {item.productDetails.brand}
                          </p>

                          <p>
                            <p className="text-muted">
                              {item.productDetails.description}
                            </p>
                          </p>

                          <div>
                            {/* <SizeAndQuantity
                              obj={item.sizeAndQua}
                              select={Styles.select}
                            /> */}
                            Quntities :
                            {Object.entries(item.sizeAndQua)
                              .map(([size, value]) => {
                                return `${size}-${value}`;
                              })
                              .join(", ")}
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

                        <div
                          className="col-md-3 col-lg-3 col-xl-2 d-flex"
                          style={{
                            background: `${item.productDetails.color}`,
                            height: "50px",
                            width: "50px",
                          }}
                        ></div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <div className={Styles.hideprice}>
                            <span className="text-red-600 text-xl font-bold">
                              &#8377;
                              {item.itemPrice}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <button
                            className="btn btn-link px-2 text-red-700"
                            onClick={() => removeFromCart(item._id)}
                          >
                            <BsTrash className="h-10 w-10" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <img
                    src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1692603469~exp=1692604069~hmac=6b009cb003b1ee1aad15bfd7eefb475e78ce63efc0f53307b81b1d58ea66b352"
                    alt="Loaded"
                  />
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

              {CartItem.items?.length && (
                <>
                  <h2 className="text-black font-extrabold">
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
                            fontSize: "19px",
                            borderRadius: "0",
                            width: "300px",
                            padding: "20px",
                          }}
                        >
                          Proceed to Pay
                        </button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
