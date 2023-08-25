import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styless from "./sellerrelated.module.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";

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

const SellerRelatedPro = ({ addToCart }) => {
  const [productItems, setProductItems] = useState([]);
  const [userData, setUserData] = useState([]);
  // const [related, setRelated]= useState("")

  
  useEffect(() => {
    httpService
      .get(`${apiURL}/product/get-all-products`)
      .then((res) => {
        // setProductItems(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2   ,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  }
  const settingsImageSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className={`${styless.bg}`}>
      <h2>Related Products </h2>
      <div className={`${styless.sliderContainer}`}>
        <Slider {...settings}>
          {productItems.map((product) => (
            <div key={product.id} className={styless.customerheading}>
              <div className={`${styless.card}`}>
                <Slider {...settingsImageSlider}>
                  {product.images.map((img, index) => (
                     <Link
                     style={{ cursor: "pointer" }}
                     to={`/ViewDetails/${product._id}`}
                   >
                    <div key={index}>
                      <img
                        src={img}
                        className={styless.mage}
                        alt=""
                      />
                    </div>
                    </Link>
                  ))}
                </Slider>
                <h5 className={styless.title}>{product.productDetail.brand}</h5>
                <span className={styless.description}>
                  {product.productDetail.description}
                </span>
                <p className={styless["prices"]}>Rs. {product.sellingPrice}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Link to="/shoppingPage">
        <button className={styless.seeMore}>SEE MORE...</button>
      </Link>
    </div>
  );
};

export default SellerRelatedPro;
