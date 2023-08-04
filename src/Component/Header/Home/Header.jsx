import React, { useState } from "react";
import header from "./Header.module.css";
import { Offer } from "./Offer/Offer";
// import ProductCard from "./ProductCard/ProductCard";
import { Search } from "../Search/Search";
// import About from "./AboutSection/About";
import NewData from "./NewArrival/NewArrival/NewData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GrPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { cards } from "./BigOfferData";

import { Logoslider } from "./LogoSlider/LogoSlider";
import { CustomerReview } from "./ReviewVideo/ReviewVideo/CustomerVideo";
import { CategoryNew } from "./Goodcards/Category/CategoryNew";
import ShortAbout from "./AboutHome/AboutinHome";
import Who from "./WhoSection/Who";
import TrendingItems from "./TopTrends/Trends";
import BigDeals from "./BigDeals/Bigdeals";
import Strength from "./TopTrends/StrengthUI/StrengthUI";
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={header["control-btn"]} onClick={onClick}>
      <button className={header.next}>
        <MdNavigateNext className={header.icon} />
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={header["control-btn"]} onClick={onClick}>
      <button className={header.prev}>
        <MdNavigateNext className={header.icon} />
      </button>
    </div>
  );
};

 const Header = ({ productItems, addToCart, CartItem }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,

    fade: true,

    cssEase: "linear",

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  return (
    <div>
      <div className={header.container2}>
        <div className={header.category1}>
          <Slider {...settings}>
            {cards.map((item) => (
              // <div className='boxs'>
              <div
                key={item.id}
                style={{ position: "relative", display: "inline-block" }}
              >
                <img src={item.image} alt="cover" width="100%" />
                
                  <button
                    style={{
                      backgroundColor:'red',  
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      padding: "10px 20px",
                     
                      border: "none",
                      zIndex: 1,
                    
                    }}
                  >
                   SHOP NOW
                  </button>
           
                <div className={header.overlay}>{/* <Search /> */}</div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <Who />
      <Logoslider />
      <CategoryNew />
      <NewData productItems={productItems} addToCart={addToCart} />
      <TrendingItems />
      <BigDeals />
      <Strength />
      {/* <Offer />

      <ShortAbout />
      <CustomerReview /> */}
    </div>
  );
};
export default Header
