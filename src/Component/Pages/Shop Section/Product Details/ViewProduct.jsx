import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Product.module.css";
import SellerRelatedPro from "../SellerRelatedProduct/sellerRelatedPro";
import { AiOutlineHeart, AiOutlineMinusCircle } from "react-icons/ai";
import { BiShareAlt } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineShopping, AiFillHeart } from "react-icons/ai";
import { apiURL } from "../../../../const/config";
import httpService from "../../../Error Handling/httpService";
import { BsHandbagFill, BsPlusCircle } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";
import { userCartItem } from "../../../../Redux/cart/cartAction";
import { Footer } from "../../../Footer/Footer";
import axios from "axios";
import { toast } from "react-toastify";
// import { addReqProduct } from "../../../Redux/productBefore/productReqAction";
import Swal from "sweetalert2";
import TruncatedText from "./TruncatedText";

const ViewProduct = ({ getAllProducts }) => {
  const { productId } = useParams();
  const user = useSelector((state) => state.userReducer.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sizeAndQua, setSizeAndQua] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [offerBtn, setofferBtn] = useState(false);
  const [isWishItem, setisWishItem] = useState(false);

  const [imgPreview, setImgPreview] = useState("");
  const [prdDetInd, setPrdDetInd] = useState(0);
  const [product, setProduct] = useState(null);
  // const [, set] = useState(second)

  const getOneProducts = async () => {
    try {
      await axios
        .get(`${apiURL}/product/get-single-products/${productId}`)
        .then((res) => {
          console.log("gggggggggg", res.data);
          // alert("calling api")
          console.log(res.data.productDetails[prdDetInd].images[0]);
          setProduct(res.data);
        })
        .catch((error) => {
          console.error("Error", error);
        });
    } catch (error) {}
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Product Name",
          text: "Check out this amazing product!",
          url: window.location.href,
        })
        .then(() => console.log("Product shared successfully."))
        .catch((error) => console.log("Error sharing product:", error));
    } else {
    }
  };

  const wishUpdate = async (productId) => {
    if (!user?.name) {
      return navigate("/login");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      await httpService.post(
        `${apiURL}/wish/update-wish`,
        {
          productId,
        },
        config
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuantityChange = (event, quantity) => {
    const { name, value } = event.target;

    if (quantity >= value) {
      setSizeAndQua((prev) => {
        // deleting size if quantity is 0

        if (Number(value) === 0) {
          const updatedSizeAndQua = { ...prev };
          delete updatedSizeAndQua[name];
          return updatedSizeAndQua;
        } else {
          return { ...prev, [name]: Number(value) };
        }
      });
    } else {
      toast.warn(" please add available quantity !", {
        position: "top-center",
        autoClose: 4994,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const increaseHandler = (size, quantity) => {
    console.log("quantity", 4 > undefined);

    const flag =
      sizeAndQua[`${size}`] === undefined ? 0 : sizeAndQua[`${size}`];

    if (quantity > flag) {
      setSizeAndQua((prev) => {
        return {
          ...prev,
          [size]: !prev[size] ? 1 : Number(prev[size]) + 1,
        };
      });
    } else {
      toast.warn(" please add available quantity !", {
        position: "top-center",
        autoClose: 4994,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const decreaseHandler = (size) => {
    setSizeAndQua((prev) => {
      return {
        ...prev,
        [size]: !prev[size] && prev[size] === 0 ? 0 : Number(prev[size]) - 1,
      };
    });
  };

  // add to cart button
  const addtoCartButton = async (product) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    console.log(product);

    const { color, images } = product.productDetails[prdDetInd];
    const { brand, sellingPrice, selectedCategory, title, seller } = product;

    console.log("color", color);
    console.log("images", images);

    const item = {
      productId: product._id,
      productDetails: {
        color,
        images: images[0],
        brand,
        category: selectedCategory,
        price: sellingPrice,
        title,
        seller,
      },
      sizeAndQua,
      totalItems,
    };
    console.log(item);

    if (totalItems < 5) {
      toast.warning("Minimum 5 quantity per order", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      try {
        await httpService
          .post(
            `${apiURL}/cart/add-to-cart`,
            {
              ...item,
            },
            config
          )
          .then((res) => {
            console.log(res);
            toast.success("item added to cart");
            dispatch(userCartItem(res.data));
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const offerBtnHandler = async () => {
    try {
      const message = {
        for: "admin",
        heading: `Super Shopper ${user.name}: 100+ Quantity Purchase Unlocked! 🎉🛒`,
        desc: `Admin Action Required: ${user.name} 100+ quansdtities purchase.Reach out to ${user.name} at their contact number: ${user.phone}, or email them at ${user.email} to share the exclusive deal.`,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await httpService
        .post(`${apiURL}/noti/create-noti`, { message }, config)
        .then((res) => {
          console.log(res);
          setofferBtn(false);
          toast.success("Prepare for More: A Call for You – Details Inside!");

          return res;
        })
        .catch((err) => {
          alert(
            "Wanna Inform to admin about your Offer, So they Can assist with your products"
          );
          console.log(err);
          return err;
        });

      console.log("res from", res);
    } catch (error) {
      console.log(error);
    }
  };

  const changeColor = (index) => {
    setPrdDetInd(index);
  };
  useEffect(() => {
    getOneProducts();
  }, []);

  useEffect(() => {
    setImgPreview(null);
  }, [prdDetInd]);

  useEffect(() => {
    const sum = Object.values(sizeAndQua).reduce((acc, cuu) => {
      return acc + cuu;
    }, 0);
    setTotalItems(sum);
  }, [sizeAndQua]);

  useEffect(() => {
    if (totalItems >= 100) {
      setofferBtn(true);
    } else {
      setofferBtn(false);
    }
  }, [totalItems]);

  const unPublishProduct = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Are you sure. You want to ${
        status !== "unPublish" ? "unPublish" : "Publish"
      } this product..?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: status === "Published" ? "Publish" : "unPublish",
    });

    if (result.isConfirmed) {
      await httpService
        .put(`${apiURL}/product/change-product-status/${id}`, {
          status,
        })
        .then((res) => {
          console.log("Prod Req", res.data);
          navigate("/shoppingPage");
          getAllProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={`${styles.card}`}>
      {product !== null && (
        <div className="row">
          <div className={`col-md-6`}>
            <div className={`text-center p-4`}>
              <img
                src={
                  !imgPreview
                    ? product.productDetails[prdDetInd].images[0]
                    : imgPreview
                }
                className={`img-fluid img-responsive rounded product-image object-contain`}
                style={{
                  height: "500px",
                  width: "770px",
                  objectFit: "contain",
                }}
                alt="img"
              />
            </div>
            <div className="ml-5" style={{ display: "flex" }}>
              {product.productDetails[prdDetInd].images.map((img) => (
                <div className="m-2">
                  <img
                    style={{ height: "70px", width: "70px", objectFit:'contain' }}
                    src={img}
                    onClick={() => {
                      setImgPreview(img);
                    }}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <div className={`product`}>
              {user.urType === "admin" && (
                <div className="relative">
                  <div className="absolute right-0">
                    <button
                      className={`btn ${
                        product.status === "Published"
                          ? "btn-danger"
                          : "btn-success"
                      } btn-success m-2`}
                      onClick={() =>
                        unPublishProduct(
                          product._id,
                          product.status === "Published"
                            ? "UnPublish"
                            : "Published"
                        )
                      }
                    >
                      {product.status === "Published" ? "UnPublish" : "Publish"}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/Addproduct/${product._id}`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
              <div className={"mt-4"} style={{ marginLeft: "30px" }}>
                <div className={styles.heads}>
                  <div>
                    <h5 className={`text-uppercase brand ${styles.brand}`}>
                      {product.title}
                    </h5>
                  </div>
                  {user?.email && user?.urType === "buyer" && (
                    <div className={`m-1 ${styles.icons}`}>
                      <div
                        className={styles.wishicon}
                        onClick={() => {
                          wishUpdate(product._id);
                        }}
                      >
                        <div onClick={() => setisWishItem(!isWishItem)}>
                          {isWishItem ? (
                            <AiFillHeart className={styles.mainicon} />
                          ) : (
                            <AiOutlineHeart className={styles.mainicon} />
                          )}
                        </div>
                      </div>
                      <div className={styles.tagandshare}>
                        <BiShareAlt onClick={handleShare} />
                      </div>
                    </div>
                  )}
                </div>

                <span>{product.brand}</span>

                <div
                  className={`mt-4 price d-flex flex-row align-items-center ${styles.price}`}
                >
                  <div>
                    {/* {user && user.email ? ( */}
                    <h5 className="fw-bold text-3xl font-mono">
                      ₹{product.sellingPrice}
                    </h5>
                    {/* //  ):null} */}
                  </div>

                  <div className={styles.starreviewmain}>
                    {user && user.email ? (
                      <div className={styles.star}>
                        <h2 className="line-through">{product.realPrice}</h2>
                      </div>
                    ) : null}
                    <div className={`${styles.review}`}>
                      <BiSolidOffer className="h-15 w-15" />

                      <p className={styles.reviewtext}>
                        {" "}
                        {`${Math.floor(
                          ((product.realPrice - product.sellingPrice) /
                            product.realPrice) *
                            100
                        )}% Off`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={styles.priceandpercentage}>
                  {user?.email && user?.urType === "buyer" && (
                    <div className={styles.percentagetext}>
                      <h5 className="text-success">93%</h5>
                      <p> &nbsp; of buyers have reccomented this.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* color selection */}
              <div style={{ marginTop: "15px" }}>
                <h5
                  style={{
                    fontSize: "18px",
                    fontWeight: 20,
                    marginLeft: "30px",
                  }}
                  className={`about ${styles.about}`}
                >
                  Choose a color
                </h5>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div className={styles.color_Container}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        height: "50px",
                      }}
                    >
                      {product.productDetails?.map((ele, index) => {
                        return typeof ele.color === "object" ? (
                          ele.color.map((item, id) => (
                            <div
                              key={id}
                              className={styles.color_box_border}
                              style={{ borderRadius: `20px solid ${item}` }}
                            >
                              <div
                                className={styles.color_box}
                                style={{ background: `${item}` }}
                                // onClick={() => changeColor(, ele.color)}
                              ></div>
                            </div>
                          ))
                        ) : (
                          <div
                            key={index}
                            className={styles.color_box}
                            style={{ background: `${ele.color}` }}
                            onClick={() => changeColor(index, ele.color)}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red mt-4">
                <div style={{ marginLeft: "30px" }}>
                  {user.email && user.urType === "admin" ? (
                    <label htmlFor="product_size">Stockes available</label>
                  ) : (
                    <label htmlFor="product_size">CHOOSE SIZE</label>
                  )}
                </div>
                <div>
                  {product.productDetails && (
                    <div style={{ marginLeft: "30px" }}>
                      <div className={`mt-1 left-0 ${styles.sizeresponsive}`}>
                        {product.productDetails &&
                          Object.entries(
                            product.productDetails[prdDetInd]?.qtyAndSizes
                          ).map(([size, quantity]) => (
                            <div key={size} className={styles.tottal}>
                              {quantity !== 0 && (
                                <div>
                                  <div
                                    className={styles.desgin}
                                    style={{
                                      borderRadius: "0px",
                                      backgroundColor: "rgb(243,243,243)",
                                      marginRight: "10px",
                                    }}
                                  >
                                    <div>{size}</div>
                                    <div
                                      style={{
                                        fontSize: "11px",
                                        color: "black",
                                      }}
                                    >
                                      {quantity} left
                                    </div>
                                  </div>
                                  {/* {user?.email && user?.urType === "buyer" && ( */}
                                  <div className="mt-1 ml-3 d-flex flex-row align-items-center sm: ml-8">
                                    <div>
                                      <AiOutlineMinusCircle
                                        onClick={() => decreaseHandler(size)}
                                      />
                                    </div>

                                    <div
                                      style={{
                                        width: "20px",
                                      }}
                                    >
                                      <input
                                        type="text"
                                        placeholder="0"
                                        style={{
                                          width: "20px",
                                          textAlign: "center",
                                        }}
                                        value={sizeAndQua[size]}
                                        name={size}
                                        onChange={(e) =>
                                          handleQuantityChange(e, quantity)
                                        }
                                      />
                                    </div>

                                    <div>
                                      <BsPlusCircle
                                        onClick={() =>
                                          increaseHandler(size, quantity)
                                        }
                                      />
                                    </div>
                                  </div>
                                  {/* // )} */}
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className={`mb-3 mt-4 align-items-center`}>
                    <>
                      {user?.email && user?.urType === "buyer" && (
                        <button
                          className={`text-uppercase mr-2 ${styles.add_to_cart}`}
                          onClick={() => addtoCartButton(product)}
                        >
                          <BsHandbagFill className="mb-1 mr-3" />
                          Add to Cart
                        </button>
                      )}
                    </>
                    {offerBtn ? (
                      <div className="container m-4">
                        <div className="row justify-content-center">
                          <div className="col-md-6 text-center">
                            <h3 className="text-danger">
                              Your Bulk Buying Deal Is a Click Away - Don't Miss
                              Out!
                            </h3>
                          </div>
                          <div className="col-md-6 text-center">
                            <button
                              className="btn btn-success"
                              onClick={offerBtnHandler}
                            >
                              Offers
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {user?.email && user?.urType === "buyer" && (
                <div
                  className={`${styles.lasthead}`}
                  style={{ marginLeft: "10px" }}
                >
                  <div className={styles.headone}>
                    <div className={styles.oneone}>
                      <TbTruckDelivery />
                    </div>
                    <div>
                      <h4 className="font-bold mt-4">
                        Delivery with in 5 days
                      </h4>
                    </div>
                  </div>

                  <div className={styles.headone}>
                    <div className={styles.oneone}>
                      <AiOutlineShopping />
                    </div>
                    <div className={styles.onetwo}>
                      <h4 className="font-bold mt-4">Return delivery</h4>
                      <span>Free 3 days Delivery Return</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="m-5 mb-2">
              <h3 className={styles.activeHeading}>Description</h3>
            </div>
            <div
              style={{
                borderTop: "0.4rem solid rgb(243,243,243)",
                width: "94%",
                margin: "auto",
                left: 0,
              }}
            ></div>

            <div className={styles.descrip}>
              <div>
                <p className={`about m-1 ${styles.about}`}>
                  Product description
                </p>
                <div className={styles.descPara}>
                  <TruncatedText text={product.description} maxLines={50} />
                </div>
              </div>
            </div>

            {/* info */}
            <div className={styles.descrips}>
              <p className={`about ${styles.about}`}>Product Details</p>
              <div className="ml-20 d-flex">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // marginTop: "30px",
                    width: "30%",
                  }}
                  className={styles.sidee}
                >
                  <div className={`m-2  ${styles["text1"]}`}>
                    <b className="mr-4">Material</b>{" "}
                  </div>
                  <div className={`m-2 ${styles["text1"]}`}>
                    <b className="mr-4">Fit</b>
                  </div>
                  <div className={`m-2 ${styles["text1"]}`}>
                    <b className="mr-4">Ideal for</b>{" "}
                  </div>
                  <div className={`m-2 ${styles["text1"]}`}>
                    <b className="mr-4">Pack off</b>
                  </div>
                  <div className={`m-2 ${styles["text1"]}`}>
                    <b className="mr-4">Pattern</b>
                  </div>
                  <div className={`m-2 ${styles["text1"]}`}>
                    <b className="mr-4">Washcare</b>{" "}
                  </div>
                  <div className={`m-2 ${styles["text1"]}`}>
                    <b className="mr-4">Convertible</b>{" "}
                  </div>
                  <div className={`m-2 ${styles["text1"]}`}>
                    <b className="mr-4">Closure</b>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "30px",
                  }}
                >
                  <div className={`m-2 ${styles["text1"]}`}>
                    {product.productInfo.Material}
                  </div>
                  <div className={`m-2 ${styles["text1"]}`}>
                    {product.productInfo.Fit}
                  </div>
                  <div className={`m-2 ${styles["text1"]}`}>
                    {product.productInfo.Idealfor}
                  </div>
                  <div className={`m-2 ${styles["text1"]}`}>
                    {product.productInfo.Packoff}
                  </div>
                  <div className={`m-2 ${styles["text1"]}`}>
                    {product.productInfo.Pattern}
                  </div>
                  <div className={`m-2 ${styles["text1"]}`}>
                    {product.productInfo.Washcare}
                  </div>
                  <div className={`m-2 ${styles["text1"]}`}>
                    {product.productInfo.Convertible}
                  </div>
                  <div className={`m-2 w-50 ${styles["text1"]}`}>
                    {product.productInfo.Closure}
                  </div>
                </div>
              </div>
            </div>

            {/* more */}
            {/* {product.MoreDetails !== null && (
              <div className={styles.descrip}>
                <p className={`about mt-3 ${styles.about}`}>More Details</p>
                <div className={`m-2 w-70 ${styles["text1"]}`}>
                  {product.MoreDetails}
                </div>
              </div>
            )} */}
          </div>
          <h2 className={styles.relatdd}>Related Product</h2>
          {
            <SellerRelatedPro
              prodd={product.collections}
              productId={product._id}
            />
          }
        </div>
      )}

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default ViewProduct;
