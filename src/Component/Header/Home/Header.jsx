import React, { useState } from "react";
import header from "./Header.module.css";
import NewData from "./NewArrival/NewData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdNavigateNext } from "react-icons/md";
import { cards } from "./BigOfferData";
import { CategoryNew } from "./Goodcards/Category/CategoryNew";
// import Who from "./WhoSection/Who";
import TrendingItems from "./TopTrends/Trends";
import Strength from "./TopTrends/StrengthUI/StrengthUI";
import { Link } from "react-router-dom";
import Who from "./WhoSection/Who";

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
    <div style={{ overflow: "scroll" }}>
      <div className={header.container2}>
        <div className={header.category1}>
          <Slider {...settings}>
            {cards.map((item) => (
              <Link to="/shop">
                <div key={item.id} style={{ position: "relative" }}>
                  <img
                    src={item.image}
                    alt="cover"
                    style={{
                      objectFit: "cover",
                      height: "auto",
                      width: "100%",
                    }}
                    className="object-contain mob:object-scale-down"
                  />
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>

      <Who />
      <CategoryNew />
      <NewData products={products} />
      <TrendingItems />
      <Strength />
    </div>
  );
};
export default Header;
