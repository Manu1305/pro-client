import React, {useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styless from "./NewArrival.module.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../../../../const/config";
const NewData = ({ productItems }) => {
  const [count, setCount] = useState(0)
  const [data,setData]=useState([])
  const increment = () => {
    setCount(count + 1)
  }
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
  useEffect(() => {
    axios
      .get(`${apiURL}/product/get-all-products`)
      .then((res) => {
        
        console.log(res.data)
        // dispatch(addProduct(res.data));
        const currentDate = new Date()
        const newProducts=res.data.filter(
          (product)=> new Date(product.createDate)<=currentDate
        )
        setData(newProducts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className={`${styless.bg}`}>
      <h2>NEW ARRAIVAL</h2>
      <div className={`${styless.sliderContainer}`}>
        <Slider {...settings}>
          {data &&
            data.map((productItems) => (
              <div className={styless.mains}>
               

               
               
                <div className={styless.customerheading}>
                   <Link  to={`/ViewDetails/${productItems._id}`} >
                  <div className={`${styless.card}`}>

                    <img src={productItems.images[0]} alt="imge" />
                  </div>
                  </Link>
                </div>
                <h5 className={styless.title}>{productItems.productDetail.brand}</h5>
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
