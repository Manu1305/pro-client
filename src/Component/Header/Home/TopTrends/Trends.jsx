
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styless from "./Trends.module.css";
import { Link } from "react-router-dom";

const TrendingItems = ({ products }) => {
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

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray
  };
// useEffect(() => {
  const filterdDAta = products
    ? products.filter((data) => data.status === true)
    : []
  const shuffledData = shuffleArray(filterdDAta);
// },)

  return (
    <div className={`${styless.bg}`}>
      <h2 className={styless.hhhhaa}>TOP TRENDS</h2>
      <div className={`${styless.sliderContainer}`}>
        <Slider {...settings}>
          {shuffledData &&
            shuffledData.map((productItems) => (
              <div>
                <div className={styless.customerheading}>
                  <Link to={`/ViewDetails/${productItems._id} `}>
                    <div className={`${styless.card} shadow-md`}>
                      <img
                        src={productItems.productDetails[0].images[0]}
                        alt="imge"
                      />
                    </div>
                  </Link>
                </div>
                <div>
                  <div className="ml-10" >
                  <h5 className={styless.title}>{productItems.brand}</h5>
                  {/* <span className={styless.description}> */}
                  <Link style={{ textDecoration: "none"}}>
                    <p>Explore Now!</p>
                  </Link>

                  </div>
                </div>
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
