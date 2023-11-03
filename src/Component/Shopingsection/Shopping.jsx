import React, { useEffect } from "react";
import styless from "./Shopping.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { PiHeartLight } from "react-icons/pi";
import { CategCart } from "./CategCart/CategCart";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ScrollToTop from "../../Scrolltotop";


const Shopping = ({ products }) => {
  const { category, collections } = useParams();

  const colletionResults = collections;

  const selectedCategory = category ? category : "all";

  const user = useSelector((state) => state.userReducer.user);

  const [price, setPrice] = useState(100000);
  const [categories, setCategories] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);

  const [collectionstate, setCollections] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userLocation, setUserLocation] = useState(null); // User's location (latitude and longitude)


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCategoryChange = (categor) => {
    if (categor === "all") {
      setCategories([]);
    } else {
      setCategories([categor]);
    }
  };


  const getAddress = async () => {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
  
      const { latitude, longitude } = pos.coords;
      console.log('Got latitude and longitude:', latitude, longitude);
      
      // Return latitude and longitude
      return { latitude, longitude };
    } catch (error) {
      console.error("Error getting address:", error);
      // Return an object with null values or handle the error as needed
      return { latitude: null, longitude: null };
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

  const filteredProducts =
    products &&
    products.filter((data) => {
      const categoryMatch =
        categories.length === 0 ||
        categories.some((categoryy) => data.selectedCategory === categoryy);
      const collectionMatch =
        collectionstate.length === 0 ||
        collectionstate.includes(data.collections);

      const priceMatch =
        data.sellingPrice >= lowestprice && data.sellingPrice <= price;

      return (categoryMatch || collectionMatch) && priceMatch;
    });

  const usersPerpage = 20;
  const pagesVisited = pageNumber * usersPerpage;



  const handleLocationPermission = async () => {
    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = pos.coords;
      setUserLocation({ latitude, longitude });
    } catch (error) {
      console.error("Error getting user's location:", error);
    }
  };


    // Calculate the distance between two points using the Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };


 // Calculate distances for each product and sort them
 const sortedProducts =
 filteredProducts &&
 userLocation
   ? filteredProducts
       .map((product) => {
         const distance = calculateDistance(
           userLocation.latitude,
           userLocation.longitude,
           product.latitude, // The store's latitude
           product.longitude // The store's longitude
         );
         return { ...product, distance };
       })
       .sort((a, b) => a.distance - b.distance)
   : filteredProducts;



  useEffect(() => {
    handleLocationPermission();
  }, []);




console.log("prooooddata", filteredProducts)


  const displayUsers = sortedProducts
    .slice(pagesVisited, pagesVisited + usersPerpage)
    .map((data) => {
      return (
        

        
        <div
          key={data.id}
          className="col-lg-3 col-md-4 col-6 mb-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="d-flex flex-column">
            <div className={styless.container}>
            
              <Link
                style={{
                  cursor: "pointer",
                  position: "relative",
                  display: "inline-block",
                }}
                to={user && user.email ? `/ViewDetails/${data._id}` : "/login"}
              >
                <div className={styless.imagediv}>
                  <img src={data.productDetails[0].images[0]} alt="" />
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
                          height: "22px",
                          width: "22px",
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
              <div className="cart-title m-1">
                {" "}
                <p className={styless.tittt}>{data.title.slice(0, 22)}</p>
              </div>
              {/* {user && user.email ? ( */}
              <div className="d-flex justify-content-between">
                <div className="mb-1" style={{ fontSize: "bold" }}>
                  <p className="font-semibold">&#8377;{data.sellingPrice}</p>
                </div>
                <div className="mb-1" style={{ fontSize: "bold" }}>
                  <p className="text-gray-400 line-through">{data.realPrice}</p>
                </div>
                <div className="mb-1">
                  <p className="text-green-500 font-semibold">
                    {`${Math.floor(
                      ((data.realPrice - data.sellingPrice) / data.realPrice) *
                        100
                    )}% Off`}
                  </p>
                </div>
              </div>
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
      <ScrollToTop>
        <>
     
          <div style={{ background: "#ffffff" }}>
            <div>
              <CategCart />
              <div className="container">
                <div className="row p-3">
                  <div className="col-lg-3">
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

                      {filteredProducts && filteredProducts.length !== 0 && (
                        <div className="d-flex justify-center">
                          <ReactPaginate
                            style={{ color: "white" }}
                            className={styless.pagination}
                            previousLabel={<ArrowBackIosIcon />}
                            nextLabel={<ArrowForwardIosIcon />}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"pagination"}
                            onClick={()=>{
                              window.scroll({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                              });
                            }}

                            
                          />
                        </div>
                      )}
                    </div>
                    {/* <hr /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <Footer />
          </div>
        </>
      </ScrollToTop>
    </>
  );
};

export default Shopping;
