import React, { useEffect, useState } from "react";
import styles from "./sellerOrder.module.css";
import { useSelector } from "react-redux";
import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";
import { useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { BiDotsVerticalRounded } from "react-icons/bi";
import DataTable from "../../../../Reuseable Comp/DataTable";



const SellerOrder = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [orders, setOrders] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

      console.log("all order response", res);
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
    "Category",
    "Status",
    "Trackingid",
    "amount",
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
              <img src={params.row.Product} alt="" />
            </div>
          );
        },
      };
    }
    if (ele === "Action") {
      return {
        field: "Action",
        type: "action",
        width: 150,
        
        renderCell: (params) => {
          console.log("Check KR", params.row);
          return (
            <div onMouseOver={() => alert("worked")} style={{alignItems:"center"}}>
              <BiDotsVerticalRounded />
            </div>
          );
        },
      };
    }
    if (ele === "Selectedsize") {
      return {
        field: "Selectedsize",
        type: "Selectedsize",
        width: 200,
        
        renderCell: (params) => (
          <select
            style={{
              padding: "8px",
              margin: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
              appearance: "none", // This removes the default dropdown arrow/icon
              WebkitAppearance: "none", // For Safari
            }}
          >
            {Object.entries(params.row.Selectedsize).map(([key, value]) => (
              <option key={key} value={key}>
                {value.selectedSizes ? (
                  <span
                    style={{
                      fontSize: 13,
                      color: "GrayText",
                    }}
                  >
                    {value.selectedSizes}
                  </span>
                ) : null}{" "}
                -{" "}
                {value.quantities ? (
                  <span
                    style={{
                      fontSize: 13,
                      color: "GrayText",
                    }}
                  >
                    {value.quantities}
                  </span>
                ) : null}
              </option>
            ))}
          </select>
        ),
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
    return {
      id: ele._id,
      prdId: ele.productId,
      Product: ele.prdDeta.images,
      Category: ele.prdDeta.category,
      Status: ele.orderStatus,
      Trackingid: ele.trackId,
      amount: ele.ordPrc,
    };
  });

  return (
    <div style={{ marginLeft: "-150px",marginTop:"30px" }}>
      <div>
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
