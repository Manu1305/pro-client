import React, { useState } from "react";
import header from "./Header.module.css";
import { Offer } from "./Offer/Offer";
// import ProductCard from "./ProductCard/ProductCard";
// import About from "./AboutSection/About";
import NewData from "./NewArrival/NewArrival/NewData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdNavigateNext } from "react-icons/md";
import { cards } from "./BigOfferData";

import { Logoslider } from "./LogoSlider/LogoSlider";
import { CategoryNew } from "./Goodcards/Category/CategoryNew";
import Who from "./WhoSection/Who";
import TrendingItems from "./TopTrends/Trends";
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

const Header = ({ products }) => {
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
    <div style={{ overflow: "hidden" }}>
      <div className={header.container2}>
        <div className={header.category1}>
          <Slider {...settings}>
            {cards.map((item) => (
              <Link to="/shoppingPage">
                <div key={item.id} style={{ position: "relative" }}>
                  <img
                    src={item.image}
                    alt="cover"
                    style={{ maxWidth: "100%", height: "auto" }}
                    className="object-contain mob:object-scale-down"
                  />
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>
      <Who />
      <Logoslider />
      <CategoryNew />
      <NewData products={products} />
      <TrendingItems products={products} />
      <Strength />
      {/* <Offer />

      <ShortAbout />
      <CustomerReview /> */}
      <Footer />
    </div>
  );
};
export default Header;
