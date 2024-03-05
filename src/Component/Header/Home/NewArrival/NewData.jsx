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
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
              // <div key={productItems._id}>
              //   <div className={styless.customerheading}>
              //     <Link to={`/ViewDetails/${productItems._id}`} >
              //       <div className={`${styless.card}`}>
              //         <img
              //           src={productItems?.image[0]}
              //           alt=""
              //           className="object-contain"
              //         />
              //       </div>
              //     </Link>
              //   </div>
              //   <div className="ml-10">
              //   <h5 className={styless.title}>{productItems.title}</h5>
              //   </div>
              // </div>
              <div className="mb-4 ml-3">
                <Link to={`/ViewDetails/${productItems._id}`}>
                  <div className="w-96 h-80 bg-white border-2 border-red-600">
                    <div className="w-full h-4/5 bg-white flex items-center justify-center">
                      <img
                        className="object-contain h-full"
                        src={productItems?.image[0]}
                        alt="imge"
                      />
                    </div>
                    <h1 className="text-center font-mono font-extrabold text-xl">
                      {productItems.title}
                    </h1>
                  </div>
                </Link>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewData;
