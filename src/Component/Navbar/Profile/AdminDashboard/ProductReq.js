import React, { useEffect, useState } from "react";
import styless from "./productRequest.module.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import httpService from "../../../Error Handling/httpService";
import { addReqProduct } from "../../../../Redux/productBefore/productReqAction";
import { useSelector, useDispatch } from "react-redux";
import ReasonModal from "./ReasonModal";
import { apiURL } from "../../../../const/config";
import ProductModal from "./SellerOrder/Modal/ProduuctModal";
import DataTable from "react-data-table-component";
import { BsFillTrashFill, } from "react-icons/bs";
import {GrView} from 'react-icons/gr'

export const ProductRequest = () => {
  const [products, setProduct] = useState([]);
  const [productdetails, setproductdetails] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [pro, setPro] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const getProducts = async () => {
    await httpService
      .post(`${apiURL}/product/requested-Products`, {
        type: user.urType,
        seller: user.email,
      }).then((res) => {
        dispatch(addReqProduct(res.data));
      setProduct(res.data);
      }).catch(Err => console.log(Err))
      
    
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addToShop = async (id) => {
    await httpService
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
    await httpService 
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
  function sendproductdetails(product) {
    setproductdetails(true);
    setPro(product);
  }

  const columns = [
    {
      name: "Images",
      selector: (row) => row.images,
      sortable: true,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      sortable: true,
    },
    ,
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },

    {
      name: "Action",
      selector: (row) => row.action,
      // sortable: true,
    },
  ];

  console.log("====================", products);

  const data = products.map((product) => {
    return {
      id: product._id,
      images: <img src={product.images[0]} style={{ width: "20px" }} />,
      brand: product.productDetail.brand,
      quantity: product.totalQuantity,
      price: product.sellingPrice,
      action: (
        <>
          <button className="m-2"><i><BsFillTrashFill/></i></button>
          <button className="m-2"><i><GrView/></i></button>
        </>
      ),
    };
  });

  console.log("(((((())))))) ==========", data);

  return (
    <div className={styless.container}>
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          <div className="d-flex justify-content-center"></div>
          {products.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Images</th>
                  <th>Brand</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.Id}>
                    <td>
                      <img
                        className="img-fluid img-responsive rounded product-image"
                        src={product.images[0]}
                        alt={product.name}
                        style={{ height: "70px", width: "200px" }}
                      />
                    </td>
                    <td>{product.productDetail.brand}</td>
                    <td>{product.totalQuantity}</td>
                    <td className="flex-col">
                      ₹selling_price~{product.sellingPrice}
                      <br />
                      <span className="strike-text">
                        {" "}
                        real_price~{product.realPrice}
                      </span>
                    </td>
                    <td>
                      <Link
                        className="btn btn-danger btn-sm text-black"
                        style={{ cursor: "pointer" }}
                        to={`/productVerification/${product._id}`}
                      >
                        Product Details
                      </Link>
                      {/* <button
                        className="btn btn-danger btn-sm text-black"
                        type="button"
                        onClick={() => sendproductdetails(product)}
                      >
                       View details
                      </button>
                      <ProductModal
                        product={pro}
                        show={productdetails}
                        onHide={() => setproductdetails(false)}
                        removeFromShop={removeFromShop}
                      /> */}

                      <button
                        className="btn btn-danger btn-sm text-black"
                        type="button"
                        onClick={() => setModalShow(true)}
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
                        className="btn btn-outline-success btn-sm"
                        type="button"
                        onClick={() => addToShop(product._id)}
                      >
                        Add To Shop
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="col-md-6 mt-1 text-justif">
              <img
                src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
                className={styless.imgeee}
                alt="No products"
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
      <DataTable columns={columns} data={data} selectableRows />
    </div>
  );
};
