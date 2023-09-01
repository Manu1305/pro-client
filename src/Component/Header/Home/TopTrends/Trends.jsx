import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styless from "./Trends.module.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../../../const/config";
import top1 from "../../../../images/top1.png";
import top2 from "../../../../images/top2.png";
import top3 from "../../../../images/top3.png";
import httpService from "../../../Error Handling/httpService";

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
const TrendingItems = ({ addToCart }) => {
  const [count, setCount] = useState(0);
  const [data, setData]=useState([])
  const increment = () => {
    setCount(count + 1);
  };
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
        const shuffledData = shuffleArray(res.data); // Shuffle the data
        setData(shuffledData);
        console.log(shuffledData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };



  return (
    <div className={`${styless.bg}`}>
      <h2>TOP TRENDS</h2>
      <div className={`${styless.sliderContainer}`}>
        <Slider {...settings}>
          { data &&
            data.map((productItems) => (
              <div>
                <div className={styless.customerheading}>
                <Link  to={`/ViewDetails/${productItems._id}`} >
                  <div className={`${styless.card}`}>
                    <img src={productItems.images} alt="imge" />
                  </div>
                  </Link>
                </div>
                <h5 className={styless.title}>{productItems.brand}</h5>
                {/* <span className={styless.description}> */}
                <Link style={{ textDecoration: "none" }}>
                  <p>Explore Now!</p>
                </Link>
              </div>
              // </div>
            ))}
        </Slider>
      </div>
      {/* <Link to="/shoppingPage">
        <button className={styless.seeMore}>See More...</button>
      </Link> */}
    </div>
  );
};
export default TrendingItems;
