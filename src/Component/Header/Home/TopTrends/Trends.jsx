import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styless from "./Trends.module.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
// import { cards } from "./Cards";
// import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"

import top1 from "../../../../images/top1.png";
import top2 from "../../../../images/top2.png";
import top3 from "../../../../images/top3.png";

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
const TrendingItems = ({ addToCart }) => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
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

  const productItems = [
    {
      id: 1,
      title: "Party Outfits",
      image: top1,
      description: "Fashion Full Sleeve Blue Jacket.",
      price: "199",
      category: "men",
    },
    {
      id: 2,

      title: "Elegent Olive",
      image: top2,
      description: "Regular Printed Casual Shirt.",
      price: "299",
      category: "men",
    },
    {
      id: 3,

      title: "Breezy White",
      image: top3,
      description: "Pure Cotton  Casual Shirt",
      price: "499",
      category: "men",
    },
    {
      id: 4,

      title: "Cobalt Blue",
      image:
        "https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-dressed-red-checkered-shirt-fashion-man-posing_158538-4909.jpg?w=1800&t=st=1687430348~exp=1687430948~hmac=15538f6516e9d08813cb45cb5c4f1cfc995a243552a00c56e234742849694599",
      description: "Linen Casual Shirt.",
      price: "599",
      category: "kid",
    },
    {
      id: 5,

      title: "Coffee Browns",
      image:
        "https://img.freepik.com/free-photo/cute-stylish-children_155003-8330.jpg?w=2000&t=st=1687430370~exp=1687430970~hmac=dd8b402fd684ddebcdb5e3c061e329bd1f53cb0664d7fbc194d72b14f284552b",
      description: "Men Pure Cotton Casual Shirt.",
      price: "450",
      category: "kid",
    },
    // {
    //   id: 6,

    //   title: "Turquoise Bue",
    //   image:
    //     "https://img.freepik.com/free-photo/young-woman-beautiful-red-dress_1303-17506.jpg?w=900&t=st=1687430390~exp=1687430990~hmac=9aa0b85e730f7ea9dea2d41baea64ad9b5ad187e4a88bfd868988db967d4249c",
    //   description: "Men Pure Cotton Casual Shirt",
    //   price: "999",
    //   category: "women",
    // },
    {
      id: 7,

      title: "Electric Lime",
      image:
        "https://img.freepik.com/free-photo/stylish-handsome-indian-man-tshirt-pastel-wall_496169-1571.jpg?w=2000&t=st=1687430435~exp=1687431035~hmac=77be139c5b97ee7659f1835a959e3723697d372f30d4e194b3577937be43c649",
      description: "Slim Fit Casual Shirt",
      price: "4999",
      category: "women",
    },
    // {
    //   id: 8,
    //   title: "Soft Pastels",
    //   image:
    //     "https://img.freepik.com/free-photo/man-portrait_1296-626.jpg?w=900&t=st=1687430519~exp=1687431119~hmac=514858cc9fb23969d02c43f7bfe7a964dd33e315e348249ca79f48bfe52c08df",
    //   description: "Printed Casula Shirt.",
    //   price: "899",
    //   category: "women",
    // },
  ];
  return (
    <div className={`${styless.bg}`}>
      <h2>TOP TRENDS</h2>
      <div className={`${styless.sliderContainer}`}>
        <Slider {...settings}>
          {productItems &&
            productItems.map((productItems) => (
              <div>
                <div className={styless.customerheading}>
                  <div className={`${styless.card}`}>
                    <img src={productItems.image} alt="imge" />
                  </div>
                </div>
                <h5 className={styless.title}>{productItems.title}</h5>
                {/* <span className={styless.description}> */}
                <Link style={{ textDecoration: "none" }}>
                  <p>Explore Now!</p>
                </Link>
                {/* </span> */}
                {/* <p className={styless["prices"]}>
                      Rs. {productItems.price}
                    </p> */}

                {/* <button
                  //     style={{
                  //       backgroundColor: "transparent",
                  //       borderColor: "#bf0a2a",
                  //       border: "solid",
                  //       borderRadius: "50px",
                  //     }}
                  //     onClick={() => addToCart(productItems)}
                  //   >
                    
                  //     <button> Add to cart</button>
                  //   </button>
                  // */}
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
