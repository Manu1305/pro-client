import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styless from "./NewArrival.module.css";
import { Link } from "react-router-dom";

const NewData = ({ products }) => {
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

  const sortedData = products
  ? products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  : [];

  return (
    <div className={`${styless.bg}`}>
      <h2 className={styless.hhhhaa}>NEW ARRIVAL</h2>
      <div className={`${styless.sliderContainer}`}>
        <Slider {...settings}>
          {sortedData &&
            sortedData.map((productItem) => (
              <div key={productItem._id}>
                <div className={styless.customerheading}>
                  <Link to={`/ViewDetails/${productItem._id}`}>
                    <div className={`${styless.card} shadow-md`}>
                      <img
                        src={productItem.productDetails[0].images[0]}
                        alt=""
                      />
                    </div>
                  </Link>
                </div>
                <h5 className={styless.title}>{productItem.brand}</h5>
                <Link
                  to={`/ViewDetails/${productItem._id}`}
                  style={{ textDecoration: "none" }}
                >
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
