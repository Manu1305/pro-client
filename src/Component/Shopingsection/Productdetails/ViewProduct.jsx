import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { GrFormPrevious } from "react-icons/gr";
import { MdHeight, MdNavigateNext } from "react-icons/md";
import styles from "./Product.module.css";
import SellerRelatedPro from "../SellerRelatedProduct/sellerRelatedPro";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { BiShareAlt } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { BsBagDash } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineShopping,AiFillHeart } from "react-icons/ai";
import Review from "./Review/Review";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles["control-btn"]} onClick={onClick}>
      <button className={styles.next}>
        <MdNavigateNext className={styles.icon} />
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles["control-btn"]} onClick={onClick}>
      <button className={styles.prev}>
        <GrFormPrevious className={styles.icon} />
      </button>
    </div>
  );
};

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
  const [isWishItem, setisWishItem] = useState(false)

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
    }else{
      setofferBtn(false)
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
        "http://localhost:8000/wish/update-wish",
        {
          productId,
        },
        config
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSizeSelection = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(
        selectedSizes.filter((selectedSize) => selectedSize !== size)
      );
    } else {
      setSelectedSizes([...selectedSizes, size]);
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

  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
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
        for:"admin",
        heading: `Super Shopper ${user.name}: 100+ Quantity Purchase Unlocked! 🎉🛒`,
        desc: `Admin Action Required: ${user.name} 100+ quantities purchase.Reach out to ${user.name} at their contact number: ${user.phone}, or email them at ${user.email} to share the exclusive deal.`,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await httpService.post(`${apiURL}/noti/create-noti`,{message},config)
        // .then((res) => {
        //   console.log(res);
        //   return res.json();
        // })
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
    <div className={`card ${styles.card}`}>
      {productDetails.map((product) => (
        <div className="row" style={{ marginTop: "10rem" }}>
          <div className={`col-md-6 ${styles.images}`}>
            <div className={`text-center p-4 ${styles.thumbnail}`}>
              <Slider {...settings}>
                {product.images.map((img) => (
                  <img
                    src={img}
                    className={`img-fluid img-responsive rounded product-image ${styles.image}`}
                    width="70"
                    alt=""
                  />
                ))}
              </Slider>

              {/* <div className={styles.descrip}>
                <p className={`about ${styles.about}`}>Description: </p>
                <span className={styles["text1"]}>
                  {product.productDetail.description}
                </span>
                <p className={`about ${styles.about}`}>
                  WashcareInstructions:{" "}
                </p>
                <span className={styles["text1"]}>
                  {product.WashcareInstructions}
                </span>
                <p className={`about ${styles.about}`}>Material: </p>
                <span className={styles["text1"]}>
                  {product.productDetail.material}
                </span>
              </div> */}
            </div>
          </div>
          {/* //////////////////////////TOPSECONT DIV /////////////////// */}
          <div className="col-md-6">
            <div className={`product p-4 ${styles.product}`}>
              <div className="d-flex justify-content-between align-items-center"></div>
              <div className={`mt-4 mb-3 ${styles.details}`}>
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
                  className={`price d-flex flex-row align-items-center ${styles.price}`}
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
              <p className={`about ${styles.about}`}>
                Category: {product.selectedCategory}
              </p>
              <p className={`about ${styles.about}`}>
                SubCategory:{product.selectedSubcategory}
              </p>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <br />
                <h1>Product Color</h1>
                <div
                  style={{
                    backgroundColor: product.productDetail.primaryColor,
                    width: "25px",
                    height: "50px",
                    marginTop: "10px",
                    borderRadius: " 5rem 0rem 0rem 5rem",
                    marginLeft: "10px",
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: product.productDetail.otherColors,
                    width: "25px",
                    height: "50px",
                    marginTop: "10px",
                    borderRadius: " 0rem 5rem 5rem 0rem",
                  }}
                ></div>
              </div>
              <h2>Items left -{product.totalQuantity}</h2>

              <div className={`sizes mt-5 ${styles.sizes}`}>
                {/* <h6 className={`text-uppercase ${styles["size-heading"]}`}> SELECT SIZE</h6> */}
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
                    <button
                      className={`btn btn-danger text-uppercase  mx-4 ${styles["add-to-cart"]}`}
                    >
                      Buy
                    </button>
                  </>
                ) : null}
                {offerBtn  ? (
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
              className={`${styles.tab} ${
                activeTab === "description" && styles.active
              }`}
              onClick={() => setActiveTab("description")}
            >
              <h3
                className={
                  activeTab == "description" ? styles.activeHeading : ""
                }
              >
                Description
              </h3>
            </div>
            <div
              className={`${styles.tab} ${
                activeTab === "reviews" && styles.active
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              {" "}
              <h3
                className={activeTab == "reviews" ? styles.activeHeading : ""}
              >
                &nbsp;&nbsp;&nbsp; Reviews
              </h3>
            </div>
          </div>
          <div className={styles.descrip}>
            {activeTab === "description" ? (
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
            ) : (
              <Review />
            )}
          </div>
        </div>
      ))}

      <SellerRelatedPro />
    </div>
  );
};

export default ViewProduct;