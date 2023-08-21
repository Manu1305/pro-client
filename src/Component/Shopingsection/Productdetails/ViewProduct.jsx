import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { GrFormPrevious } from "react-icons/gr";
// import {  MdNavigateNext } from "react-icons/md";
import styles from "./Product.module.css";
import SellerRelatedPro from "../SellerRelatedProduct/sellerRelatedPro";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { BiShareAlt } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineShopping, AiFillHeart } from "react-icons/ai";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";
import { Footer } from "../../Footer/Footer";

// const SampleNextArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div className={styles["control-btn"]} onClick={onClick}>
//       <button className={styles.next}>
//         <MdNavigateNext className={styles.icon} />
//       </button>
//     </div>
//   );
// };

// const SamplePrevArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div className={styles["control-btn"]} onClick={onClick}>
//       <button className={styles.prev}>
//         <GrFormPrevious className={styles.icon} />
//       </button>
//     </div>
//   );
// };

const ViewProduct = ({ setCartItems }) => {
  const categorySizes = {
    Men: ["S", "M", "L", "XL"],
    Womens: ["XS", "S", "M", "L"],
    Kids: ["3-4 Yr", "5-6 Yr", "7-8 Yr", "9-10 Yr"],
    size: ["size1", "size2", "size3", "size4"],
  };
  const { productId } = useParams();
  const user = useSelector((state) => state.userReducer.user);
  console.log(user);

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [offerBtn, setofferBtn] = useState(false);
  const [isWishItem, setisWishItem] = useState(false);

  const [imgPreview, setimgPreview] = useState("");

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
  useEffect(() => {
    if (totalQuantity >= 100) {
      setofferBtn(true);
    } else {
      setofferBtn(false);
    }
  }, [totalQuantity]);

  const wishUpdate = async (productId) => {
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

  const handleQuantityChange = (size, event) => {
    const { value } = event.target;
    const updatedQuantities = { ...quantities, [size]: value };
    setQuantities(updatedQuantities);

    let sum = 0;
    for (const size in updatedQuantities) {
      sum += Number(updatedQuantities[size]);
    }
    setTotalQuantity(sum);
  };
  const storedProductData = useSelector(
    (state) => state.productReducer.product
  );

  const productDetails = storedProductData.filter(
    (product) => product._id === productId
  );

  console.log("+_+_+_+__+========-=-", productDetails);
  // const settings = {
  //   infinite: true,
  //   speed: 500,
  //   dots: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
  // };
  const addtoCartButton = async (product) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const sizeWithQuantity = {};
    Object.keys(quantities).forEach((key, index) => {
      const sizeKey = `size${index + 1}`;

      sizeWithQuantity[sizeKey] = {
        selectedSizes: key,
        quantities: parseInt(quantities[key]),
      };
    });

    try {
      await httpService
        .post(
          `${apiURL}/cart/add-to-cart`,
          {
            productId: product._id,
            sizeWithQuantity: sizeWithQuantity,
            quantity: totalQuantity,
          },
          config
        )
        .then((err) => {
          console.log(err);

          setCartItems(err.data.items.length);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const offerBtnHandler = async () => {
    try {
      const message = {
        for: "admin",
        heading: `Super Shopper ${user.name}: 100+ Quantity Purchase Unlocked! 🎉🛒`,
        desc: `Admin Action Required: ${user.name} 100+ quantities purchase.Reach out to ${user.name} at their contact number: ${user.phone}, or email them at ${user.email} to share the exclusive deal.`,
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
          alert("Prepare for More: A Call for You – Details Inside!");

          return res;
        })
        .catch((err) => {
          alert("URL DATA");
          console.log(err);
          return err;
        });

      console.log("res from", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    <div className={`card ${styles.card}`}>
      {productDetails.map((product) => (
        <div className="row">
          <div className={`col-md-6 ${styles.images}`}>
            <div className={`text-center p-4`}>
              <img
                src={!imgPreview ? product.images[0] : imgPreview}
                className={`img-fluid img-responsive rounded product-image ${styles.image} `}
                style={{ height: "400px", width: "770px" }}
                alt="img"
              />
            </div>
            <div className="ml-5" style={{ display: "flex" }}>
              {product.images.map((img) => (
                <div className="m-2">
                  <img
                    style={{ height: "70px", width: "70px" }}
                    src={img}
                    onClick={() => setimgPreview(img)}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <div className={`product`}>
              <div className={"mt-4"}>
                <div className={styles.heads}>
                  <h5 className={`text-uppercase brand ${styles.brand}`}>
                    {product.productDetail.brand}
                  </h5>
                  <div className={styles.icons}>
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
                      <BsBookmark />
                    </div>
                    <div className={styles.tagandshare}>
                      <BiShareAlt onClick={handleShare} />
                    </div>
                  </div>
                </div>

                <span>{product.productDetail.description}</span>

                <div
                  className={`mt-4 price d-flex flex-row align-items-center ${styles.price}`}
                >
                  <h5 className={styles["act-price"]}>
                    ₹{product.sellingPrice}
                  </h5>
                  <div className={styles.starreviewmain}>
                    <div className={styles.star}>
                      <AiOutlineStar />
                      <p>4.8</p>
                    </div>
                    <div className={`${styles.review}`}>
                      <FaRegCommentDots />

                      <p className={styles.reviewtext}> 67 reviews</p>
                    </div>
                  </div>
                </div>

                <div className={styles.priceandpercentage}>
                  <div>
                    <p className="line-through" style={{ color: "red" }}>
                      ₹{product.realPrice}
                    </p>
                  </div>
                  <div className={styles.percentagetext}>
                    <h5 className="text-success">93%</h5>
                    <p> &nbsp; of buyers have reccomented this.</p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "25px",
                }}
              >
                <div className={styles.color_Container}>
                  <div className="m-1">
                    <h4 className={`about ${styles.about}`}>Choose a color</h4>
                  </div>
                  <div
                    style={{
                      marginLeft: "-105px",
                      display: "flex",
                      alignItems: "start",
                      gap: "13px",
                      marginTop: "10px",
                    }}
                  >
                    <div
                      className={styles.color_box}
                      style={{ background: "#BBC1F8" }}
                    ></div>
                    <div
                      className={styles.color_box}
                      style={{ background: "#BBD278" }}
                    ></div>
                    <div
                      className={styles.color_box}
                      style={{ background: "#FFD3F8" }}
                    ></div>
                    <div
                      className={styles.color_box}
                      style={{ background: "#B2BE91" }}
                    ></div>
                    <div
                      className={styles.color_box}
                      style={{ background: "#124B88" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className={`sizes ${styles.sizes}`}>
                {product.selectedCategory && (
                  <div>
                    <label htmlFor="product_size">CHOOSE SIZE</label>
                    <div>
                      <div className={styles.sizeresponsive}>
                        {product.selectedCategory &&
                          categorySizes[product.selectedCategory].map(
                            (size, index) => (
                              <div key={index} className={styles.tottal}>
                                <div
                                  className={styles.desgin}
                                  style={{
                                    borderRadius: "0px",
                                    backgroundColor: selectedSizes.includes(
                                      size
                                    )
                                      ? "rgb(237,240,248)"
                                      : "rgb(243,243,243)",
                                  }}
                                >
                                  {size}
                                </div>

                                <input
                                  type="text"
                                  placeholder="Enter Qty"
                                  style={{ width: "20%", }}
                                  value={quantities[size]}
                                  onChange={(e) =>
                                    handleQuantityChange(size, e)
                                  }
                                />
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className={`cart mt-4 align-items-center ${styles.cart}`}>
                {totalQuantity >= 5 ? (
                  <>
                    <button
                      className={`btn btn-danger text-uppercase mr-2 px-4 ${styles["add-to-cart"]}`}
                      onClick={() => addtoCartButton(product)}
                    >
                      Add to Cart
                    </button>
                    {/* <button
                      className={`btn btn-danger text-uppercase  mx-4 ${styles["add-to-cart"]}`}
                    >
                      Buy
                    </button> */}
                  </>
                ) : null}
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

            <div className={styles.lasthead}>
              <div className={styles.headone}>
                <div className={styles.oneone}>
                  <TbTruckDelivery />
                </div>
                <div>
                  <h4 className="font-bold mt-4">free delivery</h4>
                  <input
                    className="text-black"
                    placeholder="enter your postal code"
                  />
                </div>
              </div>
              <div className={styles.headone}>
                <div className={styles.oneone}>
                  <AiOutlineShopping />
                </div>
                <div className={styles.onetwo}>
                  <h4 className="font-bold mt-4">Return delivery</h4>
                  <span>Free 30 days Delivery Return.Details</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tabs}>
            <div
              // className={}
              onClick={() => setActiveTab("description")}
            >
              <h3 className={styles.activeHeading}>Description</h3>
            </div>
          </div>
          <div className={styles.descrip}>
            <div className={styles.description}>
              <p className={`about ${styles.about}`}>Product description</p>
              <span className={styles["text1"]}>
                {product.productDetail.description}
              </span>
              <p className={`about ${styles.about}`}>WashcareInstructions</p>
              <span className={styles["text1"]}>
                {product.WashcareInstructions}
              </span>
              <p className={`about ${styles.about}`}>Material </p>
              <span className={styles["text1"]}>
                {product.productDetail.material}
              </span>
            </div>
          </div>
        </div>
      ))}

      <SellerRelatedPro />
      {/* <Footer /> */}
    </div>
    </div>
  );
};

export default ViewProduct;
