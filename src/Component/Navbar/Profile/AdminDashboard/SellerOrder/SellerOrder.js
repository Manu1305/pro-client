import React, { useEffect, useState } from "react";
import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { BiDotsVerticalRounded, BiSolidShoppingBags } from "react-icons/bi";
import DataTable from "../../../../Reuseable Comp/DataTable";
import { IconButton, Tooltip } from "@mui/material";
import DeliveryDiningSharpIcon from '@mui/icons-material/DeliveryDiningSharp';
import { toast } from "react-toastify";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const SellerOrder = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await httpService
        .get(`${apiURL}/orders/get-all-orders`, config)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
      setOrders(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);



  const addToDelivery = async (id) => {
    await httpService
      .put(`${apiURL}/delivery/assign-delivery-product/${id}`)
      .then((res) => {
        getOrders();
        toast('Assigned Delivery', {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          // draggable: true,
          // progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const confirmDelivery = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await fetch(
        `${apiURL}/delivery/delivered/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
        config
      )
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          getOrders();
          toast('Product Delivered', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            // draggable: true,
            // progress: undefined,
            theme: "light",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getOrders();
  }, []);

  const header = [
    "Product",
    "Order Id",
    "Orderd On",
    "Payment Method",
    "Price",
    "Delivery Status",
    "Action",
  ].map((ele) => {
    let string = ele;
    string.replace(/^./, string[0].toUpperCase());

    if (ele === "Product") {
      return {
        field: "Product",
        type: "image",

        renderCell: (params) => {
          console.log("parmas*******************", params);
          return (
            <div>
              <img src={params.row.Product} alt="refresh" width={30} onClick={() => navigate(`/ViewDetails/${params.row.prdId}`)} />
            </div>
          );
        },
      };
    }
    if (ele === "Action") {
      return {
        field: "Action",
        type: "action",
        renderCell: (params) => {
          // console.log("Check KR", params.row);
          return (
            <div style={{ alignItems: "center" }}>
              {params.row["Delivery Status"] === "Ready To PickUp" &&
                <div>
                  <Tooltip title="Assign Delivery" onClick={() => addToDelivery(params.row.id)}>
                    <IconButton>
                      <DeliveryDiningSharpIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              }
              {
                params.row["Delivery Status"] === "confirm Delivery" &&
                <div>
                  <div>
                    <Tooltip title="Confirm Delivery" onClick={() => confirmDelivery(params.row.id)}>
                      <IconButton>
                        <ThumbUpAltIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <BiDotsVerticalRounded />
                </div>
              }
              {
                params.row["Delivery Status"] === "confirm Delivery" &&
                <div>
                  <div>
                    <Tooltip title="Confirm Delivery" onClick={() => confirmDelivery(params.row.id)}>
                      <IconButton>
                        <ThumbUpAltIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <BiDotsVerticalRounded />
                </div>
              }


            </div>



          );
        },
      };
    } else {
      return {
        id: ele,
        field: ele,
        headerName: string,
        width: 150,
        editable: true,

      };
    }
  });



  const rowData = orders.map((ele) => {
    const date = new Date(ele.createdAt).toISOString().split('T')[0]
    return {
      id: ele._id,
      "Order Id": ele._id,
      prdId: ele.productId,
      Product: ele.prdData.images,
      "Orderd On": date,
      Price: ele.ordPrc,
      "Payment Method": ele.pType,
      "Delivery Status": ele.orderStatus,
    };
  });

  return (
    <div style={{ marginLeft: "-150px", marginTop: "30px", }}>
      <div>
        {/* <h1>Seller</h1> */}
        {rowData.length !== 0 ?
          <DataTable columns={header} rows={rowData} autoHeight />
          :
          <div style={{ margin: 'auto' }} >
            {isLoading ?
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ScaleLoader animation="border" role="status" color="red">
                  <span className="visually-hidden">Loading...</span>
                </ScaleLoader
                >
              </div>
              : (
                <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1692603469~exp=1692604069~hmac=6b009cb003b1ee1aad15bfd7eefb475e78ce63efc0f53307b81b1d58ea66b352" alt="Loaded" />
              )}
          </div>
        }
      </div>
    </div>
  );
};

export default SellerOrder;


