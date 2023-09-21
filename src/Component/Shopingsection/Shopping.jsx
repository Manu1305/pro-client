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
import { CategCart } from "./CategCart/CategCart";

const Shopping = ({products}) => {
  const { category,collections } = useParams();

  const colletionResults = collections

  const selectedCategory = category ? category : "all";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const [price, setPrice] = useState(10000);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
const [collectionstate,setCollections]=useState([])

  const handleCategoryChange = (categor) => {
    if (categor === "all") {
      setCategories([]);
    } else {
      setCategories([categor]);
    }
  };

  useEffect(() => {
    if (selectedCategory === "all") {
      // setCategories([]);
    } else {
      setCategories([selectedCategory]);
    }
  }, [selectedCategory]);
  useEffect(() => {
   
    setCollections([colletionResults]);
    
  }, [colletionResults]);
  const sellingPrices = products.map((item) => item.sellingPrice);
  const highestPrice = Math.max(...sellingPrices);
  const lowestprice = 0;

  const filteredProducts = products && products.filter((data) => {
    const categoryMatch =
      categories.length === 0 ||
      categories.some((categoryy) => data.selectedCategory === categoryy);
  
    const collectionMatch =
      collectionstate.length === 0 || collectionstate.includes(data.collections);
  
    const priceMatch =
      data.sellingPrice >= lowestprice && data.sellingPrice <= price;
  
    return (categoryMatch || collectionMatch) && priceMatch;
  });
  
  

  const usersPerpage = 20;
  const pagesVisited = pageNumber * usersPerpage;

  const displayUsers = filteredProducts
    .slice(pagesVisited, pagesVisited + usersPerpage)
    .map((data) => {
      return (
        <div key={data.id} className="col-lg-3 col-md-4 mb-5">
          <div className="d-flex flex-column">
            <div className={styless.container}>
              <Link
                style={{
                  cursor: "pointer",
                  position: "relative",
                  display: "inline-block",
                }}
                to={`/ViewDetails/${data._id}`}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={data.productDetails[0].images[0]}
                    style={{ height: 320, width: 305, objectFit: "fill" }}
                    alt=""
                  />
                  <div className={styless.like}>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        margin: "5px",
                      }}
                    >
                      <PiHeartLight
                        className={styless.like_button}
                        style={{
                          height: "30px",
                          width: "30px",
                          fontWeight: "50px",
                        }}
                        onClick={() => {
                          console.log("Wish list");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Description */}
            <div className="card-body">
              <div
                className="cart-title m-1"
                style={{ textTransform: "uppercase", fontFamily: "fantasy" }}
              >
                {data.brand}
              </div>
              {user && user.email ? (
                <div className="m-2 d-flex justify-content-between">
                  <div className="mb-1 me-1 mx-4" style={{ fontSize: "bold" }}>
                    &#8377; {data.sellingPrice}{" "}
                  </div>
                </div>
              ) : (
                <div className="m-2" style={{ fontWeight: "30px" }}>
                  {data.title}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
  const pageCount = Math.ceil(filteredProducts.length / usersPerpage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div style={{ background: "#ffffff" }}>
        
          <div>
            <CategCart />
            <div className="container">
              <div className="row p-3">
                <div className="col-lg-3">
                  <div className="card mb-5">
                    <div
                      className={`card-body mb-7 shadow-xl ${styless.categggg}`}
                    >
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
                              categories[0] === "Mens" ? "active" : ""
                            }`}
                            onClick={() => handleCategoryChange("Mens")}
                          >
                            Men
                          </button>
                        </div>
                        <div>
                          <button
                            className={`btn btn-white mb-1 px-1 ${
                              categories[0] === "Womens" ? "active" : ""
                            }`}
                            onClick={() => handleCategoryChange("Womens")}
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
                    style={{ color: "black", position: "relative" }}
                  >
                    {displayUsers}

                    <div></div>
                    {filteredProducts && filteredProducts.length !== 0 && (
                      <ReactPaginate
                        className={styless.pagination}
                        previousLabel={"<-prev"}
                        nextLabel={" next->"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"pagination"}
                      />
                    )}
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
      
      </div>
      <div style={{ overflow: "hidden" }}>
        <Footer />
      </div>
    </>
  );
};

export default Shopping;
