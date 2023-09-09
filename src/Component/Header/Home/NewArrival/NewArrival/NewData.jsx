import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styless from "./NewArrival.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";

const NewData = ({ productItems }) => {
  const [data, setData] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    httpService
      .get(`${apiURL}/product/get-all-products`)
      .then((res) => {
        console.log(res.data + "this is responsedata");
        const sortedData = res.data.sort((a, b) => {
          // Sort by createdAt in descending order
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className={`${styless.bg}`}>
      <h2>NEW ARRIVAL</h2>
      <div className={`${styless.sliderContainer}`}>
        <Slider {...settings}>
          {data &&
            data.map((productItem) => (
              <div className={styless.mains} key={productItem._id}>
                <div className={styless.customerheading}>
                  <Link to={`/ViewDetails/${productItem._id}`}>
                    <div className={`${styless.card}`}>
                      <img src={productItem.productDetails[0].images[0]} alt="image" />
                    </div>
                  </Link>
                </div>
                <h5 className={styless.title}>{productItem.brand}</h5>
                <Link to={`/ViewDetails/${productItem._id}`} style={{ textDecoration: 'none' }}>
                  <p>Explore Now!</p>
                </Link>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewData;
