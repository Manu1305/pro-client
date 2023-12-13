import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import httpService from "../../Error Handling/httpService";
import { addReqProduct } from "../../../Redux/productBefore/productReqAction";
import { useSelector, useDispatch } from "react-redux";
import ReasonModal from "./ReasonModal";
import { apiURL } from "../../../const/config";
import DataTable from "../Reuseable Comp/DataTable";
import DeleteIcon from '@mui/icons-material/Delete';
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { IconButton, Tooltip } from "@mui/material";


export const ProductRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [products, setProduct] = useState([]);
  const user = useSelector((state) => state.userReducer.user);
  const [modalShow, setModalShow] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const getProducts = async () => {
    await httpService
      .post(`${apiURL}/product/requested-Products`, {
        type: user.urType,
        seller: user.email,
      })
      .then((res) => {
        setIsLoading(false);

        const filteredProduct = res.data?.filter((prd) => prd.status === "Pending")
        dispatch(addReqProduct(filteredProduct));
        console.log("Prod Req", res.data)
        setProduct(filteredProduct);
      })
      .catch((Err) => {
        setIsLoading(false);
        console.log(Err)
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getProducts();
  }, []);


  const addToShop = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure to add this product to shop..?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Add to Shop'
    });

    if (result.isConfirmed) {
      try {
        await httpService.put(`${apiURL}/product/change-product-status/${id}`, { status: "Published" })
          .then(res => {
            console.log(res.data);
            getProducts()
          })
          .catch((err) => {
            console.log(err)
          });
        // console.log(response.data);
        toast("Product Added");
        getProducts();
        Swal.fire(
          'Added 😊',
          'Product successfully added.',
          'success'
        );
      } catch (err) {
        console.log("ERROR", err);
        getProducts()
      }
    }
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
          toast("Deleted Product")
        })
        .catch((err) => {
          console.log("ERROR", err);
          getProducts()
        });
    } catch (error) {
      console.error(error)
    }
  };

  const header = [
    "seller",
    "productCode",
    "images",
    "brand",
    "Stock",
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
            <div onClick={() =>
              navigate(`/ViewDetails/${params.row.id}`)
            }>
              <img src={!params.row.images ? "" : params.row.images} alt="dfs" width={30} />
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
                className="cursor-pointer"
                onClick={() => {
                  setModalShow(true);
                  setDeleteProductId({
                    id: params.row.id,
                    seller: params.row.seller,
                  });
                }}
              >
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="cursor-pointer" onClick={() => addToShop(params.row.id)}>
                <Tooltip title="Publish">
                  <IconButton>
                    <PublishedWithChangesIcon />
                  </IconButton>
                </Tooltip>
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
      images: ele.productDetails.length > 0 ? ele.productDetails[0].images[0] : "",
      brand: ele.brand,
      Stock: ele.stock,
      price: ele.sellingPrice,
      seller: ele.seller,
      productCode:ele.productCode
    };
  });

  return (
    <div>
      {rowData.length !== 0 ? (
        <DataTable columns={header} rows={rowData} />
      ) : (
        <div style={{ margin: 'auto' }} >
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ScaleLoader animation="border" role="status" color="red">
                <span className="visually-hidden">Loading...</span>
              </ScaleLoader >

            </div>
          ) : (
            <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1692603469~exp=1692604069~hmac=6b009cb003b1ee1aad15bfd7eefb475e78ce63efc0f53307b81b1d58ea66b352" alt="Loaded" />
          )}
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
