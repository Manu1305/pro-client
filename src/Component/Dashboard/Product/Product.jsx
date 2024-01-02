import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import SizeModal from "../AddProduct/components/SizeModal";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";
import ReasonModal from "../Product Request/ReasonModal";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import DataTable from "../Reuseable Comp/DataTable";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
// import { MdUnpublished } from "react-icons/md";

import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { IconButton, Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { addReqProduct } from "../../../Redux/productBefore/productReqAction";

export const ProductSec = () => {
  const [reqProducts, setRequestedProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [seller, setSellerName] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.userReducer.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        if (user?.urType === "admin") {
          console.log("RES>",res.data)
          const filteredProduct = res.data?.filter(
            (prd) => prd.status !== "Pending"
          );
          dispatch(addReqProduct(filteredProduct));
        
          setRequestedProducts(filteredProduct);
        } else {
          setRequestedProducts(filteredProducts);
        }

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

  const header = [
    "ProductAdded",
    "images",
    "Date",
    "Brand",
    "price",
    "Status",
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
    if (ele === "price") {
      return { field: "price", type: "Number", width: 100 };
    }
    if ( ele === "action") {
      
      return {
        field: "Action",
        type: "action",
        width: "160px",
        renderCell: (params) => {
          console.log(params)
          return (
              <div style={{ display: "flex", flexDirection: "row" }}>
              {/* Delete */}
              <div
                onClick={() => {
                  setDeleteId(params.row.id);
                  setSellerName(params.row.seller);
                  setModalShow(true);
                }}
              >
                <Tooltip title="Delete" sx={{ fontSize: 20 }}>
                  <IconButton>
                    <RiDeleteBin6Fill className="cursor-pointer" />
                  </IconButton>
                </Tooltip>
              </div>
              {/* Edit */}
              <div
                onClick={() =>
                  navigate(`/Addproduct/${params.row.id}`)
                }
              >
                <Tooltip title="Edit" sx={{ fontSize: 20 }}>
                  <IconButton>
                    <FiEdit className="cursor-pointer" />
                  </IconButton>
                </Tooltip>
              </div>
              {/* Status */}
              <div>
                {params.row.Status === "Published" ? (
                  <Tooltip title="Unpublish" sx={{ fontSize: 20 }}>
                    <IconButton>
                      <UnpublishedIcon
                        className="cursor-pointer"
                        onClick={() =>
                          unPublishProduct(params.row.id, params.row.status)
                        }
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip
                    title="Publish"
                    onClick={() => unPublishProduct(params.row.id,"Published")}
                  >
                    <IconButton>
                      <PublishedWithChangesIcon
                        className="cursor-pointer"
                        onClick={() =>
                          unPublishProduct(params.row.id, "Published")
                        }
                      />
                    </IconButton>
                  </Tooltip>
                )}
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
    const date = new Date(ele?.createdAt)
  
    return {
      id: ele._id,
      images:ele.image[0],
      Brand: ele.brand,
      Stock: ele.stock,
      price: ele.sellingPrice,
      ProductAdded: ele.seller,
      Status: ele.status,
      Date: date,
    };
  });

  const unPublishProduct = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Are you sure. You want to ${status === 'Published' ? "Publish" : "unPublish"} this product..`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: status === 'Published' ? "Publish" : "unPublish",
    });

    if (result.isConfirmed) {
      await httpService
        .put(`${apiURL}/product/change-product-status/${id}`, {
          status : status !== "Published" ? "unPublish" : "Published"
        })
        .then((res) => {
          console.log("Prod", res.data);
          getProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container ml-5 mr-0">
      <h2>All products </h2>
      <div className="d-flex justify-content-center row">
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
      </div>
    </div>
  );
};
