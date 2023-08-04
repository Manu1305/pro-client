
// import React, { useEffect, useState } from "react";
// import styless from "./productRequest.module.css";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { GrFormPrevious } from "react-icons/gr";
// import { MdNavigateNext } from "react-icons/md";
// import axios from "axios";
// import { addReqProduct } from "../../../../Redux/productBefore/productReqAction";
// import { useSelector, useDispatch } from "react-redux";

// const SampleNextArrow = (props) => {
//   const { onClick } = props;

//   return (
//     <div className={styless["control-btn"]} onClick={onClick}>
//       <button className={styless.next}>
//         <MdNavigateNext className={styless.icon} />
//       </button>
//     </div>
//   );
// };

// const SamplePrevArrow = (props) => {
//   const { onClick } = props;
//   return (
//     <div className={styless["control-btn"]} onClick={onClick}>
//       <button className={styless.prev}>
//         <GrFormPrevious className={styless.icon} />
//       </button>
//     </div>
//   );
// };

// export const ProductRequest = () => {
//   const [products, setProduct] = useState([]);
 
//   const dispatch= useDispatch()
//   const user = useSelector((state) => state.userReducer.user);


//   const getProducts = async () => {
//     await axios
//       .post(`${apiURL}/product/requested-Products`, {
//         type: user.urType,
//         seller: user.email,
//       })
//       .then((res) => {
      
//         dispatch(addReqProduct(res.data))
//         setProduct(res.data);
      
//       })
//       .catch((err) => {
//         console.log("ERROR", err);
//       });
//   };

//   useEffect(() => {
//     getProducts();

//   }, []);

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//   };

//   const addToShop = async (id) => {
//     await axios
//       .put(`${apiURL}/product/allow-requested-product/${id}`)
//       .then((res) => {
       
//         getProducts();
//       })
//       .catch((err) => {
//         console.log("ERROR", err);
//       });
//   };

//   const removeFromShop = async (id) => {
//     await axios
//       .delete(`${apiURL}/product/remove-requested-product/${id}`)
//       .then((res) => {
      
//         getProducts();
     
//       })
//       .catch((err) => {
//         console.log("ERROR", err);
//       });
//   };
//   return (
//     <div className="container mt-5 mb-5 ml-4">
//       <div className="d-flex justify-content-center row">
//         <div className="col-md-10">
//           <div className="d-flex justify-content-center mt-3"></div>
//           {products.length > 0 ? (
//             products.map((product) => (
//               <div
//                 key={product.Id}
//                 className="row p-2 bg-white border rounded mt-2"
//               >
//                 <div className="col-md-3 mt-1">
//                   <Slider {...settings}>
//                     {product.images.map((image, index) => {
//                       return (
//                         <img
//                           key={index}
//                           className="img-fluid img-responsive rounded product-image"
//                           src={image}
//                           alt={product.name}
//                         />
//                       );
//                     })}
//                   </Slider>
//                 </div>
//                 <div className="col-md-3 mt-1">
//                   <Slider {...settings}>
                
//                   </Slider>
//                 </div>
//                 <div className="col-md-6 mt-1">
//                   <h5>{product.productDetail.brand}</h5>
//                   <p className="text-justify text-truncate para mb-0">
//                     total quantity: {product.totalQuantity}
//                     <br />
//                   </p>
//                 </div>
//                 <div className="align-items-center align-content-center col-md-3 border-left mt-1">
//                   <div className="d-flex flex-row align-items-center">
//                     <h4 className="mr-1">₹{product.sellingPrice}</h4>
//                     <span className="strike-text">{product.realPrice}</span>
//                   </div>

//                   <div className="d-flex flex-column mt-4">
//                   <Link
//                   style={{ cursor: "pointer" }}
//                 to={`/productVerification/${product._id}`}
//                 >
//                   <button
//                       className="btn btn-outline-success btn-sm mt-2 my-2"
//                       type="button"
                      
//                     > 
//                      Product Details
//                      </button> 
//                     </Link>
//                     <button
//                       className="btn btn-danger btn-sm text-black"
//                       type="button"
//                       onClick={() => removeFromShop(product._id)}
//                     >
//                       Remove Product
//                     </button>
//                     <button
//                       className="btn btn-outline-success btn-sm mt-2"
//                       type="button"
//                       onClick={() => addToShop(product._id)}
//                     >
//                       Add To Shop
//                     </button>
//                   </div> 
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-md-6 mt-1 text-justif">
//           <img src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
//           className={styless.imgeee}/>
//               {/* <h5>Empty</h5> */}
              
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="d-flex justify-content-center mt-3">
//         <Link to="Addproduct" className="btn btn-warning">
//           Add New Product
//         </Link>
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import styless from "./productRequest.module.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import axios from "axios";
import { addReqProduct } from "../../../../Redux/productBefore/productReqAction";
import { useSelector, useDispatch } from "react-redux";
import ReasonModal from "./ReasonModal";
import { apiURL } from "../../../../const/config";

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

export const ProductRequest = () => {
  const [products, setProduct] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  console.log("USER DETAIL", user);

  const [modalShow, setModalShow] = useState(false);

  const getProducts = async () => {
    await axios
      .post(`${apiURL}/product/requested-Products`, {
        type: user.urType,
        seller: user.email,
      })
      .then((res) => {
        console.log("RES", res.data);
        dispatch(addReqProduct(res.data));
        setProduct(res.data);
        alert("successfull response");
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  useEffect(() => {
    getProducts();

    console.log(products);
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const addToShop = async (id) => {
    await axios
      .put(`${apiURL}/product/allow-requested-product/${id}`)
      .then((res) => {
        console.log(res.data);
        getProducts();
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const removeFromShop = async (id,obj) => {
    await axios 
      .put(`${apiURL}/product/remove-requested-product/${id}`,{message:{...obj,forU:user.email}})
      .then((res) => {
        console.log(res.data);
        getProducts();
        alert("Removed");
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  return (
    <div className="container mt-5 mb-5 ml-4">
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          <div className="d-flex justify-content-center mt-3"></div>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.Id}
                className="row p-2 bg-white border rounded mt-2"
              >
                <div className="col-md-3 mt-1">
                  <Slider {...settings}>
                    {product.images.map((image, index) => {
                      return (
                        <img
                          key={index}
                          className="img-fluid img-responsive rounded product-image"
                          src={image}
                          alt={product.name}
                        />
                      );
                    })}
                  </Slider>
                </div>
                <div className="col-md-3 mt-1">
                  <Slider {...settings}></Slider>
                </div>
                <div className="col-md-6 mt-1">
                  <h5>{product.productDetail.brand}</h5>
                  <p className="text-justify text-truncate para mb-0">
                    total quantity: {product.totalQuantity}
                    <br />
                  </p>
                </div>
                <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                  <div className="d-flex flex-row align-items-center">
                    <h4 className="mr-1">₹{product.sellingPrice}</h4>
                    <span className="strike-text">{product.realPrice}</span>
                  </div>

                  <div className="d-flex flex-column mt-4">
                    <Link
                      style={{ cursor: "pointer" }}
                      to={`/productVerification/${product._id}`}
                    >
                      <button
                        className="btn btn-outline-success btn-sm mt-2 my-2"
                        type="button"
                      >
                        Product Details
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm text-black"
                      type="button"
                      onClick={() => setModalShow(true)}
                      // onClick={() => removeFromShop(product._id)}
                    >
                      Remove Product
                    </button>
                    <ReasonModal
                      product={product}
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      removeFromShop={removeFromShop}
                    />
                    <button
                      className="btn btn-outline-success btn-sm mt-2"
                      type="button"
                      onClick={() => addToShop(product._id)}
                    >
                      Add To Shop
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-md-6 mt-1 text-justif">
              <img
                src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
                className={styless.imgeee}
              />
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Link to="Addproduct" className="btn btn-warning">
          Add New Product
        </Link>
      </div>
    </div>
  );
};