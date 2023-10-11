import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styless from "./DataNewArriv.module.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import { apiURL } from "../../../../../../const/config";
import httpService from "../../../../../Error Handling/httpService";
import { useSelector } from "react-redux";

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

const DataNewArriv = ({
  addToCart,
  //  prodd, productId
}) => {
  const [productItems, setProductItems] = useState([]);
  const [userData, setUserData] = useState([]);

  const user = useSelector((state) => state.userReducer.user);

  console.log("ffff", user);
  useEffect(() => {
    httpService
      .get(`${apiURL}/product/get-all-products`)
      .then((res) => {
        console.log("dddddddddd", res.data);
       
        setProductItems(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const settings = {
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
          slidesToShow: 2,
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
  };
  const settingsImageSlider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={`${styless.bg}`}>
      {/* <div className={`${styless.sliderContainer}`}> */}
      {console.log("dkcnsdnck", user)}

      <Slider {...settings}>
        {productItems &&
          productItems.map((item) => {
            //   if (item.collections === prodd)  {
            // console.log("ffffffrrrrrr", user.subscription.subsStatus);
            return (
             
              <div key={item._id}>
                <div className={styless.customerheading}>
                  <a href={`/ViewDetails/${item._id}`}>
                    <div className={`${styless.card}`}>
                      <img
                        src={item.productDetails[0].images[0]}
                        alt="image"
                        className={styless.igfff}
                      />
                    </div>
                  </a>
                </div>
                <div className={styless.marbtm}>
                  <h5 className={styless.title}>{item.brand}</h5>
                  <h5 className={styless.titlee}>{item.title}</h5>
                  <h5 className={styless.titlee}>Rs. {item.sellingPrice}</h5>
                </div>
              </div>
              //     <div key={item._id}>
              //     <div className={styless.customerheading}>
              //       <a href={`/ViewDetails/${item._id}`}>
              //         <div className={`${styless.card}`}>
              //           <img
              //             src={item.productDetails[0].images[0]}
              //             alt="image"
              //             className={styless.igfff}
              //           />
              //         </div>
              //       </a>
              //     </div>
              //     <div className={styless.marbtm}>
              //       <h5 className={styless.title}>{item.brand}</h5>
              //       <h5 className={styless.titlee}>{item.title}</h5>
              //     </div>
              //   </div>
            );
            //   } else {
            //     return null; // Return null for items that don't match the condition
            //   }
          })}
      </Slider>

      {/* </div> */}
      <Link to="/shoppingPage">
        <button className={styless.seeMore}>Go to shop...</button>
      </Link>
    </div>
  );
};

export default DataNewArriv;
