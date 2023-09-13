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
import Who from "./WhoSection/Who";
import TrendingItems from "./TopTrends/Trends";
import BigDeals from "./BigDeals/Bigdeals";
import Strength from "./TopTrends/StrengthUI/StrengthUI";
import { Footer } from "../../Footer/Footer";
import { Link } from "react-router-dom";
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

const Header = ({ productItems }) => {
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

  return (
    <div style={{overflow:'hidden'}}>
      <div className={header.container2}>
        <div className={header.category1}>
          <Slider {...settings}>
            {cards.map((item) => (
              <Link to="/shoppingPage">
              <div
                key={item.id}
                style={{ position: "relative",  }}
              >
                <img
                  src={item.image}
                  alt="cover"
                  // className={header.banner}
                  className='object-contain md:object-scale-down'
                />
                {/* <div className={header.overlay}>text inside image </div> */}
              </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
      <Who />
      <Logoslider />
      <CategoryNew />
      <NewData productItems={productItems} />
      <TrendingItems />
      <BigDeals />
      <Strength />
      {/* <Offer />

      <ShortAbout />
      <CustomerReview /> */}
      <Footer />
    </div>
  );
};
export default Header;
