import React, { useEffect, useState } from "react";
import styless from "./ProductSec.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { useSelector } from "react-redux";
import SizeModal from "./modal/SizeModal";
import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";
import ReasonModal from "../../AdminDashboard/ReasonModal";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import DataTable from "../../../../Reuseable Comp/DataTable";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

export const ProductSec = () => {
  const [reqProducts, setRequestedProducts] = useState([]);
  // const [quantityModal, setQuantityModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [seller, setSellerName] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.userReducer.user);

  const navigate = useNavigate();

  const getProducts = async () => {
    await httpService
      .get(`${apiURL}/product/get-all-products`, {
        type: user.urType,
        seller: user.email,
      })
      .then((res) => {
        const filteredProducts = res.data.filter(
          (product) => product.seller === user.email
        );
        console.log("seller Produc", filteredProducts);
        setRequestedProducts(filteredProducts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("ERROR", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getProducts();
  }, []);

  // add qunatity

  const quantityHandler = (product) => {
    // setQuantityModal(true);
    // setProduct(product);
  };

  const notify = () => {
    toast("Removed Product");
  };

  const removeFromShop = async (id, obj) => {
    try {
      await httpService
        .put(`${apiURL}/product/remove-requested-product/${id}`, {
          message: { ...obj, forU: user.email },
        })
        .then((res) => {
          console.log(res.data);
          getProducts();
          notify();
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("check", reqProducts);
  }, [reqProducts]);

  const header = [
    "ProductAdded",
    "Date",
    "images",
    "brand",
    "price",
    "action",
  ].map((ele) => {
    let string = ele;
    string.replace(/^./, string[0].toUpperCase());

    if (ele === "images") {
      return {
        field: "image",
        type: "image",
        renderCell: (params) => {
          return (
            <div>
              <img
                src={params.row.images}
                onClick={() => navigate(`/ViewDetails/${params.row.id}`)}
                alt=""
                width={30}
              />
            </div>
          );
        },
      };
    }
    if (ele === "action") {
      return {
        field: "Action",
        type: "action",
        width: "150px",
        renderCell: (params) => {
          console.log("Check here", params.row);
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                className="mr-5"
                onClick={() => {
                  setDeleteId(params.row.id);
                  setSellerName(params.row.seller);
                  setModalShow(true);
                }}
              >
                <RiDeleteBin6Fill />
              </div>
              <div onClick={() => quantityHandler(params.row)}>
                <FiEdit />
              </div>
            </div>
          );
        },
      };
    } else {
      return {
        field: ele,
        headerName: string,
        width: 150,
        editable: true,
      };
    }
  });

  const rowData = reqProducts.map((ele) => {
    const date = new Date(ele.createdAt).toISOString().split("T")[0];

    return {
      id: ele._id,
      images:
        ele.productDetails.length > 0 ? ele.productDetails[0].images[0] : "",
      brand: ele.brand,
      // stock: ele.stock,
      price: ele.sellingPrice,
      ProductAdded: ele.seller,
      Date: date,
    };
  });

  return (
    <div className="container ml-5 mr-0">
      <h2>All products </h2>
      <div className="d-flex justify-content-center row">
        <div className="d-flex justify-content-center mt-4">
          <Link to="/dashboard/Addproduct" className="btn btn-danger">
            Add Product
          </Link>
        </div>

        <div>
          {reqProducts.length === 0 ? (
            <div>
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ScaleLoader animation="border" role="status" color="red">
                    <span className="visually-hidden">Loading...</span>
                  </ScaleLoader>
                </div>
              ) : (
                <img
                  src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1692603469~exp=1692604069~hmac=6b009cb003b1ee1aad15bfd7eefb475e78ce63efc0f53307b81b1d58ea66b352"
                  alt="Loaded"
                />
              )}
            </div>
          ) : (
            <>
              {rowData.length !== 0 ? (
                <div className="mt-3">
                  <DataTable columns={header} rows={rowData} />
                </div>
              ) : (
                <div style={{ margin: "auto" }}>
                  {isLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ScaleLoader animation="border" role="status" color="red">
                        <span className="visually-hidden">Loading...</span>
                      </ScaleLoader>
                    </div>
                  ) : (
                    <img
                      src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1692603469~exp=1692604069~hmac=6b009cb003b1ee1aad15bfd7eefb475e78ce63efc0f53307b81b1d58ea66b352"
                      alt="Loaded"
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <ReasonModal
          product={{ id: deleteId, seller: seller }}
          show={modalShow}
          onHide={() => setModalShow(false)}
          removeFromShop={removeFromShop}
        />

        {/* <SizeModal
          getProducts={getProducts}
          setQuantityModal={setQuantityModal}
          quantityModal={quantityModal}
          product={product}
        /> */}
      </div>
    </div>
  );
};
