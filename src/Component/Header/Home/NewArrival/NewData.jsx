import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styless from "./NewArrival.module.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const NewData = ({ products }) => {

  const settings = {
    dots: false,
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

  return (
    <div className={`${styless.bg}`}>
      <h2 className={styless.hhhhaa}>NEW ARRIVAL</h2>
      <div className={`${styless.sliderContainer}`}>
        <Slider {...settings}>
          {products &&
            products.map((productItems) => (
              <div >
                <div className={styless.customerheading}>
                  <Link to={`/ViewDetails/${productItems._id}`} >
                    <div className={`${styless.card}`}>
                      <img 
                        src={productItems?.productDetails[0]?.images[0]}
                        alt=""
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </div>
                <div className="ml-10">
                <h5 className={styless.title}>{productItems.title}</h5>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewData;
