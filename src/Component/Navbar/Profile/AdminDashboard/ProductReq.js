import React, { useEffect, useState } from "react";
import styless from "./productRequest.module.css";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
import { BsFillTrashFill } from "react-icons/bs";
import DataTable from "../../../Data table/DataTable";
import { GrView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import toast, { Toaster } from 'react-hot-toast';
export const ProductRequest = () => {
  const [products, setProduct] = useState([]);
  const [productdetails, setproductdetails] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [pro, setPro] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const navigate = useNavigate();

  const getProducts = async () => {
    await httpService
      .post(`${apiURL}/product/requested-Products`, {
        type: user.urType,
        seller: user.email,
      })
      .then((res) => {
        dispatch(addReqProduct(res.data));
        setProduct(res.data);
      })
      .catch((Err) => console.log(Err));
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

  const removeFromShop = async (id, obj) => {
    await httpService
      .put(`${apiURL}/product/remove-requested-product/${id}`, {
        message: { ...obj, forU: user.email },
      })
      .then((res) => {
        console.log(res.data);
        getProducts();
        toast("Removed");
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const header = [
    "seller",
    "images",
    "brand",
    "quantity",
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
              <img src={params.row.images} alt="" />
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
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                onClick={() =>
                  navigate(`/productVerification/${params.row.id}`)
                }
                className="m-2"
              >
                <GrView />
              </div>
              <div
                className="m-2"
                onClick={() => {
                  setModalShow(true);

                  console.log(params);
                  setDeleteProductId({
                    id: params.row.id,
                    seller: params.row.seller,
                  });
                }}
              >
                <RiDeleteBinLine />
              </div>
              <div className="m-2" onClick={() => addToShop(params.row.id)}>
                <BiSolidShoppingBags />
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

  const rowData = products.map((ele) => {
    return {
      id: ele._id,
      images: ele.images[0],
      brand: ele.productDetail.brand,
      quantity: ele.totalQuantity,
      price: ele.sellingPrice,
      seller: ele.seller,
    };
  });
  return (
    <div className={styless.container}>
      <div className="d-flex justify-content-center mt-3">
        <Link to="Addproduct" className="btn btn-warning">
          Add New Product
        </Link>
      </div>
      {rowData.length !== 0 ? (
        <DataTable columns={header} rows={rowData} />
      ) : (
        <div className="text-center">
          <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=740&t=st=1692361382~exp=1692361982~hmac=ad51a1df0bb656b800860f3339a091ebf21dc19e7d3d334f2db23126f6c863e5" alt="Empty" />
          <p>No data available.</p>
        </div>
      )}
      <ReasonModal
        product={deleteProductId}
        show={modalShow}
        onHide={() => setModalShow(false)}
        removeFromShop={removeFromShop}
      />
    </div>
  );
};
