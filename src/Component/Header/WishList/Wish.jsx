import React, { useState } from "react";
import "./Wish.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";
import { Footer } from "../../Footer/Footer";
import { ScaleLoader } from "react-spinners";

const WishList = () => {
  const [wishLists, setWishLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getWishproduct = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await httpService
        .get(`${apiURL}/wish/user-wish`, config)
        .then((res) => {
        
          setWishLists(res.data);
       
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("API Error", error);
    }
  };
  useEffect(() => {
 
  }, []);
  
  useEffect(() => {
    getWishproduct();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
 
  }, [wishLists]);
  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const removefrom = async (productId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      await httpService
        .post(
          `${apiURL}/wish/update-wish`,
          {
            productId,
          },
          config
        )
        .then((response) => {
          getWishproduct();
         
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  if (wishLists.length === 0) {
    return (
      <div style={{margin:'auto'}} >
        {isLoading ? (
         <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
           <ScaleLoader  animation="border" role="status" color="red">
             <span className="visually-hidden">Loading...</span>
           </ScaleLoader >
         
         </div>
       ) : (
         <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1692603469~exp=1692604069~hmac=6b009cb003b1ee1aad15bfd7eefb475e78ce63efc0f53307b81b1d58ea66b352" alt="Loaded Image" />
       )}
       </div>
    );
  }

  return (
    <>
      <section
        className="h-100"
        style={{ backgroundColor: "#eee"}}
      >
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 text-black">Wishlist</h3>
              </div>

              {wishLists.length > 0 &&
                wishLists?.map((item) => (
                  <div
                    className="card rounded-3 mb-4"
                    key={item._id}
                    onClick={() => {
                     
                    }}
                  >
                    
                    <div className="card-body p-4">
                      <div className="row d-flex justify-content-between align-items-center">
                        <Link to={`/ViewDetails/${item._id}`}>
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <Slider {...settings}>
                              {item.images?.map((imgurl) => (
                                <img
                                  src={imgurl}
                                  className="img-fluid img-responsive rounded product-image"
                                  alt="img"
                                />
                              ))}
                            </Slider>
                          </div>
                        </Link>
                        <div className="col-md-3 col-lg-3 col-xl-3">
                          <p className="lead fw-normal mb-2">
                            {item.productDetail.brand}
                          </p>

                          <p>
                            <p className="text-muted">
                              {/* {item.WashcareInstructions} */}
                            </p>
                          </p>

                          <div>
                            <div>
                              <span style={{ color: "red" }}>
                                price :{item.sellingPrice}
                              </span>
                            </div>

                            <div>
                              <span className="text-muted"></span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex"></div>
                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                          <button
                            className="btn btn-link px-2"
                            onClick={() => {
                              removefrom(item._id);
                            }}
                          >
                            <i className="fas fa-trash fa-lg"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WishList;
