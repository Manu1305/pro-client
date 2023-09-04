import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import styles from "./productDetailAdmin.module.css";

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

const ProductVerification = () => {
  const categorySizes = {
    Men: ["S", "M", "L", "XL"],
    Womens: ["XS", "S", "M", "L"],
    Kids: ["3-4 Years", "5-6 Years", "7-8 Years", "9-10 Years"],
  };
  const { id } = useParams();

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [sizeWithQuantity, setsizeWithQuantity] = useState({});

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

  useEffect(() => {}, [quantities]);

  const storedProductData = useSelector(
    (state) => state.productReqReducer.productReq
  );

  const productDetails = storedProductData.filter(
    (product) => product._id === id
  );
  console.log(productDetails);

  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div style={{ marginTop: "2rem", backgroundColor: "white" }}>
      {productDetails.map((product) => (
        <div className="row">
          <div className={`col-md-6 ${styles.images}`}>
            <div className={`text-center p-4 ${styles.thumbnail}`}>
              <Slider {...settings}>
                {product.productDetails[0].images.map((img) => (
                  <img
                    src={img}
                    className={`img-fluid img-responsive rounded product-image ${styles.image}`}
                    width="70"
                    alt=""
                  />
                ))}
              </Slider>
              <div className={styles.descrip}>
                <p className={`about ${styles.about}`}>Description: </p>
                <span className={styles["text1"]}>{product.description}</span>
                <p className={`about ${styles.about}`}>
                  WashcareInstructions:{" "}
                </p>
                <span className={styles["text1"]}>
                  {product.WashcareInstructions}
                </span>
                <p className={`about ${styles.about}`}>Material: </p>
                <span className={styles["text1"]}>{product.material}</span>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className={`product p-4 ${styles.product}`}>
              <div className="d-flex justify-content-between align-items-center"></div>
              <div className={`mt-4 mb-3 ${styles.details}`}>
                <h5
                  className={`text-uppercase text-muted brand ${styles.brand}`}
                >
                  {product.brand}
                </h5>

                <span>{product.description}</span>
                <hr></hr>
                <div
                  className={`price d-flex flex-row align-items-center ${styles.price}`}
                >
                  <h5 className={styles["act-price"]}>
                    ₹{product.sellingPrice}
                  </h5>
                  <div className={`ml-2 mx-2 ${styles["price-info"]}`}>
                    <small className={`${styles["dis-price"]}`}>
                      MRP <s>₹{product.realPrice}</s>
                    </small>
                  </div>
                </div>
              </div>
              <p className={`about ${styles.about}`}>
                Categories: {product.selectedCategory}
              </p>
              <p className={`about ${styles.about}`}>
                SubCategories:{product.selectedSubcategory}
              </p>

              <div className={`cart mt-4 align-items-center ${styles.cart}`}>
                <h6 className={`text-uppercase ${styles["size-heading"]}`}>
                  Total Quantity: {product.totalQuantity}
                </h6>
              </div>

              <div className={`cart mt-4 align-items-center ${styles.cart}`}>
                <h6 className={`text-uppercase ${styles["size-heading"]}`}>
                  {product.selectedCategory === "Women" &&
                    categorySizes.Womens.map((size) => (
                      <span key={size}>
                        {size}: {1 || 0} |
                      </span>
                    ))}
                  {product.selectedCategory === "Men" &&
                    categorySizes.Men.map((size) => (
                      <span key={size}>
                        {size}: {1 || 0} |
                      </span>
                    ))}
                  {product.selectedCategory === "Kids" &&
                    categorySizes.Kids.map((size) => (
                      <span key={size}>
                        {size}: {1 || 0} |
                      </span>
                    ))}
                  {!(
                    product.selectedCategory === "Women" ||
                    product.selectedCategory === "Men" ||
                    product.selectedCategory === "Kids"
                  ) && <span>Select a category to see available sizes</span>}
                </h6>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductVerification;
