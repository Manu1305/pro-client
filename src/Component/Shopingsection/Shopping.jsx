import React, { useEffect } from "react";
import styless from "./Shopping.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../Redux/product/productAction";

import Slider from "react-slick";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { useParams } from "react-router-dom";
import { apiURL } from "../../const/config";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styless["control-btn"]} onClick={onClick}>
      <button className={styless.next}>
        <MdNavigateNext className={styless.icon} />
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styless["control-btn"]} onClick={onClick}>
      <button className={styless.prev}>
        <GrFormPrevious className={styless.icon} />
      </button>
    </div>
  );
};

const Shopping = ({}) => {
  const { category } = useParams();
  const selectedCategory = category ? category : "all";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const [nameFilter, setNameFilter] = useState("");
  const [price, setPrice] = useState(10000);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const [flag, setFlag] = useState(false);

  // const handleNameFilterChange = (e) => {
  //   setNameFilter(e.target.value);
  // };
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userReducer.user?.email);

  const handleCategoryChange = (categor) => {
    if (categor === "all") {
      setCategories([]);
    } else {
      setCategories([categor]);
    }
  };

  useEffect(() => {
    if (selectedCategory === "all") {
      setCategories([]);
    } else {
      setCategories([selectedCategory]);
    }
  }, [selectedCategory]);

  const viewproductDetails = () => {};
  useEffect(() => {
    axios
      .get(`${apiURL}/product/get-all-products`)
      .then((res) => {
        setData(res.data);
        dispatch(addProduct(res.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const sellingPrices = data.map((item) => item.sellingPrice);
  const highestPrice = Math.max(...sellingPrices);
  const lowestprice = Math.min(...sellingPrices);
  const filteredProducts =
    data &&
    data.filter((data) => {
      const productNameMatch =
        data.productDetail.description
          .toLowerCase()
          .includes(nameFilter.toLowerCase()) ||
        data.selectedCategory.toLowerCase().includes(nameFilter.toLowerCase());

      const categoryMatch =
        categories.length === 0 ||
        categories.some(
          (categoryy) =>
            data.selectedCategory.toLowerCase() === categoryy.toLowerCase()
        );
      const priceMatch =
        data.sellingPrice >= lowestprice && data.sellingPrice <= price;

      return productNameMatch && categoryMatch && priceMatch;
    });

  function addToCartHandle(_id) {
    if (!userId) {
      navigate("/login");
      return;
    }
    try {
      axios
        .post(`${apiURL}/cart/add-to-cart`, { _id, userId })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function addToWishHandle(_id) {
    // axios.post("${apiURL}/product/wishlistupdate", { _id, userId });
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

  const usersPerpage = 5;
  const pagesVisited = pageNumber * usersPerpage;

  const displayUsers = filteredProducts

    .slice(pagesVisited, pagesVisited + usersPerpage)
    .map((data) => {
      return (
        // <div className={`${styless.card}`}>
        <div key={data.id} className="col-lg-4 col-md-6 col-sm-6 d-flex ">
          {" "}
          <div className={`card w-100 my-2 shadow-2-strong`}>
            <div className={styless["image-container"]}>
              <Slider {...settings}>
                {data.images.map((img) => (
                  <div key={img}>
                    <img
                      src={img}
                      className={styless["hover-image"]}
                      alt=""
                      onClick={() => viewproductDetails(data)}
                    />
                  </div>
                ))}
              </Slider>

              <div className={styless["image-overlay"]}>
                {/* <i
                          style={{ color: "green" }}
                          className={`fas fa-heart fa-lg text-danger px-1 ${styless.bg23}`}
                          onClick={() => addToWishHandle(data._id)}
                        ></i> */}
                {/* </a> */}
                <p style={{ color: "red", fontFamily: "lolita" }}>
                  {(
                    ((data.realPrice - data.sellingPrice) / data.realPrice) *
                    100
                  ).toFixed(2)}
                  % off
                </p>
              </div>
            </div>

            <div className={`card-body d-flex flex-column `}>
              <Link
                style={{ cursor: "pointer" }}
                to={`/ViewDetails/${data._id}`}
              >
                <p>{data.productDetail.brand}</p>
                <p className={styless["card-text"]}>
                  {data.productDetail.description}
                </p>
                {user && user.email ? (
                  <div className="d-flex flex-row">
                    <h6 className="mb-1 me-1 mx-4">Rs. {data.sellingPrice}</h6>

                    {data.productDetail.brand && (
                      <small className="text-danger mx-3">
                        <s>Rs. {data.realPrice}</s>
                        <p style={{ color: "green", fontFamily: "lolita" }}>
                          {(
                            ((data.realPrice - data.sellingPrice) /
                              data.realPrice) *
                            100
                          ).toFixed(2)}
                          % off
                        </p>
                      </small>
                    )}
                  </div>
                ) : null}
              </Link>
              <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                {/* <button
                  className="btn btn-primary shadow-0 me-1"
                  onClick={() => addToCartHandle(data._id)}
                >
                  Add to cart
                </button> */}
              </div>
            </div>
          </div>
        </div>
        // </div>
      );
    });
  const pageCount = Math.ceil(data.length / usersPerpage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div
      style={{
        marginLeft: "50px",
        background: "whitesmoke",
        color: "red",
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/abstract-blurred-gradient-nature-wallpaper-backgroundsoft-background-wallpaperdesigngraphic-presentation_532332-1415.jpg')",
      backgroundSize:'cover'
        }}
      
    >
      <header style={{ marginTop: 150 }}></header>

      <section>
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3">
              <div className="card mb-5">
                <div
                  className="card-header"
                  style={{ color: "black", fontWeight: "bolder" }}
                >
                  PRODUCT CATEGORIES
                </div>
                <div className={styless.cardbody}>
                  <button
                    className={`btn btn-white mb-1 px-1 ${
                      categories.length === 0 ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange("all")}
                  >
                    All
                  </button>
                  <button
                    className={`btn btn-white mb-1 px-1 ${
                      categories[0] === "men" ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange("men")}
                  >
                    Men
                  </button>
                  <button
                    className={`btn btn-white mb-1 px-1 ${
                      categories[0] === "womens" ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange("womens")}
                  >
                    Womens
                  </button>
                  <button
                    className={`btn btn-white mb-1 px-1 ${
                      categories[0] === "kids" ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange("kids")}
                  >
                    Kids
                  </button>
                </div>
                <div></div>
              </div>
 {user && user.email ? (
              <div className={styless.pricefilterdiv}>
                <h1>FILTER BY PRICE</h1>
                <br />
                <input
                  type="range"
                  name=""
                  min={lowestprice}
                  max={highestPrice}
                  id=""
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  className={styless.inputprice}
                />
                <br /> <br />
                <p>
                  {" "}
                  price {lowestprice} --{price}
                </p>
              </div>
 ):null}
            </div>

            {/* Content */}
            <div className="col-lg-9">
              <div
                className="input-group mb-3"
                style={{ borderRadius: "20px", width: "500px" }}
              ></div>
              <h1>{categories ? categories : category} products</h1>
              <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                <strong className="d-block py-2">
                  Total {filteredProducts.length} items
                </strong>
              </header>

              <div className="row">
                {displayUsers}

                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                />
              </div>
              <hr />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shopping;
