 import React, { useEffect } from "react";
import styless from "./Shopping.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { addProduct } from "../../Redux/product/productAction";
import { useParams } from "react-router-dom";
import { apiURL } from "../../const/config";
import httpService from "../Error Handling/httpService";
import { Footer } from "../Footer/Footer";
import { ScaleLoader } from "react-spinners";
import { PiHeartLight } from "react-icons/pi";

const Shopping = () => {
  const { category } = useParams();
  const selectedCategory = category ? category : "all";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const [nameFilter, setNameFilter] = useState("");
  const [price, setPrice] = useState(10000);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  const getAllProducts = async () => {
    await httpService
      .get(`${apiURL}/product/get-all-products`)
      .then((res) => {
        setData(res.data);
        dispatch(addProduct(res.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getAllProducts();
  }, []);

  const sellingPrices = data.map((item) => item.sellingPrice);
  const highestPrice = Math.max(...sellingPrices);
  const lowestprice = 0;

  const filteredProducts =
    data &&
    data.filter((data) => {

      const categoryMatch =
        categories.length === 0 ||
        categories.some(
          (categoryy) =>
            data.selectedCategory.toLowerCase() === categoryy.toLowerCase()
        );
      const priceMatch =
        data.sellingPrice >= lowestprice && data.sellingPrice <= price;

      return  categoryMatch && priceMatch;
    });

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
            <div className={styless.container}>
              <Link
                style={{ cursor: "pointer" }}
                to={`/ViewDetails/${data._id}`}
              ><div className={styless.like_button}>
              <div>
                <PiHeartLight
                style={{marginTop:"2px",fontWeight:"30px"}}
                  onClick={() => {
                    console.log("Wish list");
                  }}
                />
              </div>
            </div>
                
                <img
                  src={data.productDetails[0].images[0]}
                  style={{ height: 320, width: 305, objectFit: "fill" }}
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
                {data.brand}
              </div>
              {user && user.email ? (
                <div className="m-2 d-flex justify-content-between">
                  <div className="mb-1 me-1 mx-4" style={{ fontSize: "bolt" }}>
                    &#8377; {data.sellingPrice}{" "}
                  </div>
                </div>
              ) : (
                <div className="m-2" style={{ fontWeight: "30px" }}>
                  {data.description}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
  const pageCount = Math.ceil(data.length / usersPerpage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      {isLoading ? ( // Conditionally render a loading spinner
        <div className={styless.loadingSpinner}>
          <ScaleLoader
            color="red"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
            animation="border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </ScaleLoader>
        </div>
      ) : (
        <div>
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
          
        </div>
      )}
      
    </div>
    
  );
};

export default Shopping;
