import React, { useEffect } from "react";
import styless from "./Shopping.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../Redux/product/productAction";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { useParams } from "react-router-dom";
import { apiURL } from "../../const/config";
import httpService from "../Error Handling/httpService";
import { Footer } from "../Footer/Footer";

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

  useEffect(() => {
    httpService
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
  // const lowestprice = Math.min(...sellingPrices);
  const lowestprice = 0;
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
        <div
          key={data.id}
          className="col-lg-4 col-md-6 d-flex shadow-xl flex-wrap mb-5"
        >
          {" "}
          <div className="shadow-md">
            <div>
              <Link
                style={{ cursor: "pointer" }}
                to={`/ViewDetails/${data._id}`}
              >
                <img
                  src={data.images[0]}
                  style={{ height: 320, width: 305 }}
                  alt=""
                />
              </Link>
            </div>
            {/* Description */}

            <div className={`card-body d-flex flex-column `}>
              <div
                className="cart-title m-1"
                style={{ textTransform: "uppercase", fontFamily: "fantasy" }}
              >
                {data.productDetail.brand}
              </div>
              {user && user.email ? (
                <div className="m-2 d-flex justify-content-between">
                  <div className="mb-1 me-1 mx-4" style={{ fontSize: "bolt" }}>
                    &#8377; {data.sellingPrice}{" "}
                  </div>
                </div>
              ) : (
                <div
                  className="m-2"
                  style={{ fontWeight: "30px", }}
                >
                  {data.productDetail.description}
                </div>
              )}
            </div>
          </div>
          {/* <div>
            <div class="card">
              <img src={data.images[0]} class="card-img-top" alt="img" />

              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>

            <div class="card" aria-hidden="true">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title placeholder-glow">
                  <span class="placeholder col-6"></span>
                </h5>
                <p class="card-text placeholder-glow">
                  <span class="placeholder col-7"></span>
                  <span class="placeholder col-4"></span>
                  <span class="placeholder col-4"></span>
                  <span class="placeholder col-6"></span>
                  <span class="placeholder col-8"></span>
                </p>
                <a
                  href="#"
                  tabindex="-1"
                  class="btn btn-primary disabled placeholder col-6"
                ></a>
              </div>
            </div>
          </div> */}
        </div>
      );
    });
  const pageCount = Math.ceil(data.length / usersPerpage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div
      style={
        {
          // background: "#f5f5f5",
        }
      }
    >
      <div className="container">
        <div className="row p-3">
          <div className="col-lg-3">
            <div className="card mb-5">
              <div className="card-body mb-7">
                <div style={{ color: "black", fontWeight: "bolder" }}>
                  PRODUCT CATEGORIES
                </div>
                <div>
                  <div>
                    <button
                      className={`btn btn-white mb-1 px-1 ${
                        categories.length === 0 ? "active" : ""
                      }`}
                      onClick={() => handleCategoryChange("all")}
                    >
                      All
                    </button>
                  </div>
                  <div>
                    <button
                      className={`btn btn-white mb-1 px-1 ${
                        categories[0] === "men" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryChange("men")}
                    >
                      Men
                    </button>
                  </div>
                  <div>
                    <button
                      className={`btn btn-white mb-1 px-1 ${
                        categories[0] === "womens" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryChange("womens")}
                    >
                      Womens
                    </button>
                  </div>
                  <div>
                    <button
                      className={`btn btn-white mb-1 px-1 ${
                        categories[0] === "kids" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryChange("kids")}
                    >
                      Kids
                    </button>
                  </div>
                </div>
                {user && user.email ? (
                  <div className={styless.pricefilterdiv}>
                    <h1>FILTER BY PRICE</h1>
                    <br />
                    <input
                      type="range"
                      style={{ background: "red" }}
                      min={lowestprice}
                      max={highestPrice}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                    <br /> <br />
                    <p>
                      {" "}
                      price {lowestprice}-{price}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div>
                        <button
                          style={{
                            background: "#BF0A2A",
                            color: "white",
                            width: "250px",
                            height: "52px",
                          }}
                        >
                          Filter
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="col-lg-9">
            <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
              <strong className="d-block py-2">
                Total {filteredProducts.length} items
              </strong>
            </header>

            <div
              className={`row , ${styless.pages}`}
              style={{ color: "black" }}
            >
              {/* 
              <div>
                {[1,2,3,4].map((ele) => {
                  return (
                    <div>

                    </div>
                  )
                })}
              </div> */}
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
      <Footer />
    </div>
  );
};

export default Shopping;
