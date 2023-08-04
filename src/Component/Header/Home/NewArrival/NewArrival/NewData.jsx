import React, {useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styless from "./NewArrival.module.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
// import { cards } from "./Cards";
// import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"

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
const NewData = ({ productItems, addToCart }) => {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />,
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
  return (
    <div className={`${styless.bg}`}>
      <h2>NEW ARRAIVAL</h2>
      <div className={`${styless.sliderContainer}`}>
        <Slider {...settings}>
          {productItems &&
            productItems.map((productItems) => (
              <div className={styless.mains}>
                <div className={styless.customerheading}>
                  <div className={`${styless.card}`}>
                    <img src={productItems.image} alt="imge" />
                  </div>
                </div>
                <h5 className={styless.title}>{productItems.title}</h5>
                {/* <span className={styless.description}> */}
                <Link style={{textDecoration:'none'}}>
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
export default NewData;
