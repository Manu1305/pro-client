import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Product.module.css";
import SellerRelatedPro from "../SellerRelatedProduct/sellerRelatedPro";
import { AiOutlineHeart, AiOutlineMinusCircle } from "react-icons/ai";
import { BiShareAlt } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineShopping, AiFillHeart } from "react-icons/ai";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";
import { BsHandbagFill, BsPlusCircle } from "react-icons/bs";
import { toast } from "react-toastify";
import { addCartItem } from "../../../Redux/cart/cartAction";

const ViewProduct = ({ setCartItems }) => {
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

  const handleQuantityChange = (event) => {
    const { name, value } = event.target;

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
  };

  const increaseHandler = (size) => {
    console.log(sizeAndQua);
    setSizeAndQua((prev) => {
      return {
        ...prev,
        [size]: !prev[size] ? 1 : Number(prev[size]) + 1,
      };
    });
  };

  const decreaseHandler = (size) => {
    setSizeAndQua((prev) => {
      return {
        ...prev,
        [size]: !prev[size] && prev[size] === 0 ? 0 : Number(prev[size]) - 1,
      };
    });
  };

  useEffect(() => {
    const sum = Object.values(sizeAndQua).reduce((acc, cuu) => {
      return acc + cuu;
    }, 0);
    console.log(sum);
    setTotalItems(sum);
  }, [sizeAndQua]);

  useEffect(() => {
    console.log(sizeAndQua);
  }, [sizeAndQua]);

  useEffect(() => {
    if (totalItems >= 100) {
      setofferBtn(true);
    } else {
      setofferBtn(false);
    }
  }, [totalItems]);

  const storedProductData = useSelector(
    (state) => state.productReducer.product
  );

  const productDetails = storedProductData.filter(
    (product) => product._id === productId
  );

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
    const { brand, sellingPrice, selectedCategory, description, seller } =
      product;

    const item = {
      productId: product._id,
      productDetails: {
        color,
        images: images[0],
        brand,
        category: selectedCategory,
        price: sellingPrice,
        description,
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
        // send prdDetInd,total quantity ,color quantity
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
            setCartItems(res.data.items.length);
            toast.success("item added to cart");
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

  useEffect(() => {
    setImgPreview(null);
  }, [prdDetInd]);

  return (
    <div className={`card ${styles.card}`}>
      {productDetails.map((product) => (
        <div className="row" key={product._id}>
          <div className={`col-md-6 ${styles.images}`}>
            <div className={`text-center p-4`}>
              <img
                src={
                  !imgPreview
                    ? product.productDetails[prdDetInd].images[0]
                    : imgPreview
                }
                className={`img-fluid img-responsive rounded product-image`}
                style={{ height: "400px", width: "770px", objectFit: "fill" }}
                alt="img"
              />
            </div>
            <div className="ml-5" style={{ display: "flex" }}>
              {product.productDetails[prdDetInd].images.map((img) => (
                <div className="m-2">
                  <img
                    style={{ height: "70px", width: "70px" }}
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
              <div className={"mt-4"}>
                <div className={styles.heads}>
                  <div>
                    <h5 className={`text-uppercase brand ${styles.brand}`}>
                      {product.brand}
                    </h5>
                  </div>
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
                </div>

                <span>{product.description}</span>

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
                    <p
                      className="line-through"
                      style={{
                        color: "black",
                        marginTop: "-5px",
                        fontSize: "13px",
                      }}
                    >
                      ₹{product.realPrice}
                    </p>
                  </div>
                  <div className={styles.percentagetext}>
                    <h5 className="text-success">93%</h5>
                    <p> &nbsp; of buyers have reccomented this.</p>
                  </div>
                </div>
              </div>

              {/* color selection */}
              <div style={{ marginTop: "30px" }}>
                <h5
                  style={{ fontSize: "18px",fontWeight:10 }}
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
                        marginBottom: "20px",
                      }}
                    >
                      {product.productDetails?.map((ele, index) => (
                        <div
                          className={styles.color_box}
                          style={{ background: `${ele.color}` }}
                          onClick={() => setPrdDetInd(index)}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`sizes`}>
                {/* size quantity changes */}
                {product.productDetails && (
                  <div>
                    <label htmlFor="product_size">CHOOSE SIZE</label>
                    <div>
                      <div className={`mt-1 ${styles.sizeresponsive}`}>
                        {product.productDetails &&
                          Object.entries(
                            product.productDetails[prdDetInd].qtyAndSizes
                          ).map(([size, quantity]) => (
                            <div key={size} className={styles.tottal}>
                              {quantity !== 0 && (
                                <div>
                                  <div
                                    className={styles.desgin}
                                    style={{
                                      borderRadius: "0px",
                                      backgroundColor: "rgb(243,243,243)",
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
                                  <div className="mt-1 ml-8 d-flex flex-row align-items-center">
                                    <div>
                                      <AiOutlineMinusCircle
                                        className="mr-1"
                                        onClick={() => decreaseHandler(size)}
                                      />
                                    </div>

                                    <div
                                      style={{
                                        width: "20px",
                                        marginLeft: "5px",
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
                                          handleQuantityChange(e)
                                        }
                                      />
                                    </div>
                                    <div>
                                      <BsPlusCircle
                                        className="m-3"
                                        onClick={() => increaseHandler(size)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className={`mb-3 mt-4 align-items-center`}>
                  <>
                    {user?.email && (
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

              <div className={styles.lasthead}>
                <div className={styles.headone}>
                  <div className={styles.oneone}>
                    <TbTruckDelivery />
                  </div>
                  <div>
                    <h4 className="font-bold mt-4">Delivery with in 5 days</h4>
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
            </div>
          </div>
          <div className="ml-3">
            <h3 className={styles.activeHeading}>Description</h3>
          </div>

          <div
            style={{
              borderTop: "0.4rem solid rgb(243,243,243)",
              width: "95%",
              margin: "auto",
            }}
          ></div>
          <div className={styles.descrip}>
            <div>
              <p className={`about ${styles.about}`}>Product description</p>
              <span className={styles["text1"]}>{product.description}</span>
              <p className={`about ${styles.about}`}>WashcareInstructions</p>
              <span className={styles["text1"]}>
                {product.WashcareInstructions}
              </span>
              <p className={`about ${styles.about}`}>Material </p>
              <span className={styles["text1"]}>{product.material}</span>
            </div>
          </div>
        </div>
      ))}

      <SellerRelatedPro />
    </div>
  );
};

export default ViewProduct;
