import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styless from "./NewArrival.module.css";

import top1 from "../../../../../images/top1.png";
import DataNewArriv from "./dataNewArr/DataNewArriv";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Link } from "react-router-dom";

// import SellerRelatedPro from "../../../../Shopingsection/SellerRelatedProduct/sellerRelatedPro";

const NewData = ({ products }) => {

  const user = useSelector((state) => state.userReducer.user);

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
  const productItems = [
    {
      id: 1,  
      title: "TOMMY HILFIGER",
      image: top1,
      description: "Fashion Full Sleeve Blue Jacket.",
      price: "199",
      category: "men",
    },

    {
      id: 4,

      title: "RAE ZONE",
      image:
        "https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-dressed-red-checkered-shirt-fashion-man-posing_158538-4909.jpg?w=1800&t=st=1687430348~exp=1687430948~hmac=15538f6516e9d08813cb45cb5c4f1cfc995a243552a00c56e234742849694599",
      description: "Linen Casual Shirt.",
      price: "599",
      category: "kid",
    },
    {
      id: 5,

      title: "SEVEN ELEVEN",
      image:
        "https://img.freepik.com/free-photo/cute-stylish-children_155003-8330.jpg?w=2000&t=st=1687430370~exp=1687430970~hmac=dd8b402fd684ddebcdb5e3c061e329bd1f53cb0664d7fbc194d72b14f284552b",
      description: "Men Pure Cotton Casual Shirt.",
      price: "450",
      category: "kid",
    },

    {
      id: 7,

      title: "SONI Bros",
      image:
        "https://img.freepik.com/free-photo/stylish-handsome-indian-man-tshirt-pastel-wall_496169-1571.jpg?w=2000&t=st=1687430435~exp=1687431035~hmac=77be139c5b97ee7659f1835a959e3723697d372f30d4e194b3577937be43c649",
      description: "Slim Fit Casual Shirt",
      price: "4999",
      category: "women",
    },
  ];

  const sortedData = products
    ? products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div className={`${styless.bg}`}>
      <h2 className={styless.hhhhaa}>NEW ARRIVAL</h2>
      <div className={`${styless.sliderContainer}`}>
        {/* { (user.subscription.subsStatus === "Active") && */}
          <DataNewArriv
          //  prodd={product.collections}
          //   productId={product._id}
          />
        {/* } */}
        <Slider {...settings}>
          {products &&
            products.map((productItems) => (
              <div >
                <div className={styless.customerheading}>
                  <Link to={`/ViewDetails/${productItems._id}`} >
                    <div className={`${styless.card} shadow-md`}>
                      <img 
                        src={productItems?.productDetails[0]?.images[0]}
                        alt=""
                      />
                    </div>
                  </Link>
                </div>
                <div className="ml-10">
                <h5 className={styless.title}>{productItems.title}</h5>
                {/* <Link
                  
                  style={{ textDecoration: "none" }}
                >
                  <p>Explore Now!</p>
                </Link> */}

                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewData;
