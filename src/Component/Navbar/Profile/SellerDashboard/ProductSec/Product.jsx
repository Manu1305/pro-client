import React, { useEffect, useState } from "react";
import styless from "./ProductSec.module.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { useSelector } from "react-redux";
import SizeModal from "./modal/SizeModal";
import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";

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

export const ProductSec = () => {
  const [reqProducts, setRequestedProducts] = useState([]);
  const [quantityModal, setQuantityModal] = useState(false);

  const user = useSelector((state) => state.userReducer.user);

  const getProducts = async () => {
   
    await httpService
      .get(`${apiURL}/product/get-all-products`,
       {
        type: user.urType,
        seller: user.email,
      }
      )
      .then((res) => {
      
        const filteredProducts = res.data.filter(
          (product) => product.seller === user.email
        );
        setRequestedProducts(filteredProducts);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);


  // add qunatity

  const quantityHandler = (product) => {
    setQuantityModal(true);
  };
  
  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  const addToShop = (id) => {
   
  };
  const removeFromShop = async (id) => {
    await httpService
      .delete(`${apiURL}/product/remove-requested-product/${id}`)
      .then((res) => {
        getProducts();
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };


  return (
    <div className="container mb-5 ml-3">
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          <div className="d-flex justify-content-center"></div>
          {reqProducts.map((product) => (
            <div
              key={product.Id}
              className="row p-2 bg-white border rounded mt-2"
            >
              <div className="col-md-3 mt-1">
                <Slider {...settings}>
                  {product.images.map((image, index) => {
                 
                    return (
                      <img
                        key={index}
                        className={styless.imgsg}
                        src={image}
                        alt={product.name}
                      />
                    );
                  })}
                </Slider>
              </div>
              <div className="col-md-6 mt-1">
              <h4>ProductId: {product.productId}</h4>

                <h5>Brand: {product.productDetail.brand}</h5>
                <span>Description: {product.productDetail.description}</span>
                <div className="d-flex flex-row"></div>

               <div className="my-2">
               <label >Remaining Product According to there Size :</label> 
                <select>
                  {product.productDetail.selectedSizes &&
                    Object.entries(product.productDetail.selectedSizes).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.selectedSizes ? (
                          <p
                            style={{
                              fontSize: 13,
                              color: "GrayText",
                            }}
                          >
                            {value.selectedSizes}
                          </p>
                        ) : null}{" "}
                        -
                        {value.quantities ? (
                          <p
                            style={{
                              fontSize: 13,
                              color: "GrayText",
                            }}
                          >
                            {value.quantities}
                          </p>
                        ) : null}
                      </option>
                    ))}
                </select>
             
               </div>
              </div>
              <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                <div className="d-flex flex-row align-items-center">
                  <h4 className="mr-1">₹{product.sellingPrice}</h4>
                  <s className="strike-text">{product.realPrice}</s>
                </div>

                <div className="d-flex flex-column mt-4">
                  <button
                   className="btn btn-danger bg-dark text-white" 
                   type="button"
                   onClick={() => removeFromShop(product._id)}
                   
                   >
                    Remove Product
                  </button>
                  <button
                      className="btn btn-outline-success btn-sm mt-2"
                      type="button"
                      onClick={() => quantityHandler(product)}
                    >
                      Add Quantity
                    </button>
                </div>
                <SizeModal
                getProducts={getProducts}
                setQuantityModal={setQuantityModal}
                quantityModal={quantityModal}
                product={product}
              />
              </div>
              
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Link to="Addproduct" className="btn btn-warning">
          Add New Product
        </Link>
      </div>
    </div>
  );
};