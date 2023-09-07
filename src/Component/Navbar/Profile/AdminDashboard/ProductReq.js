import React, { useEffect, useState } from "react";
import styless from "./productRequest.module.css";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import httpService from "../../../Error Handling/httpService";
import { addReqProduct } from "../../../../Redux/productBefore/productReqAction";
import { useSelector, useDispatch } from "react-redux";
import ReasonModal from "./ReasonModal";
import { apiURL } from "../../../../const/config";
import DataTable from "../../../Reuseable Comp/DataTable";
import { GrView } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const ProductRequest = () => {
  const [products, setProduct] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const [modalShow, setModalShow] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const navigate = useNavigate();

  const getProducts = async () => {
    await httpService
      .post(`${apiURL}/product/requested-Products`, {
        type: user.urType,
        seller: user.email,
      })
      .then((res) => {
        dispatch(addReqProduct(res.data));
        console.log("Prod Req", res.data)
        setProduct(res.data);
      })
      .catch((Err) => console.log(Err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);

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
        const response = await httpService.put(`${apiURL}/product/allow-requested-product/${id}`);
        console.log(response.data);
        toast("Product Added");
        getProducts();
        Swal.fire(
          'Added 😊',
          'Product successfully added.',
          'success'
        );
      } catch (err) {
        console.log("ERROR", err);
      }
    }
  };
  

  const removeFromShop = async (id, obj) => {
    await httpService
      .put(`${apiURL}/product/remove-requested-product/${id}`, {
        message: { ...obj, forU: user.email },
      })
      .then((res) => {
        console.log(res.data);
        toast("Deleted Product")

        getProducts();
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
              <img src={params.row.images} alt="dfs" width={30} />
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

          console.log(params.row)
          return (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                onClick={() =>
                  navigate(`/ViewDetails/${params.row.id}`)
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
      images: ele.productDetails[0].images[0],
      brand: ele.brand,
      quantity: ele.totalQuantity,
      price: ele.sellingPrice,
      seller: ele.seller,
    };
  });

  return (
    <div className={styless.container}>

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
