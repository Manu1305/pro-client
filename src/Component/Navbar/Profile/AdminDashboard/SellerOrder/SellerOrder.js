import React, { useEffect, useState } from "react";
import styles from "./sellerOrder.module.css";
import { useSelector } from "react-redux";
import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";
import DataTable from "../../../../Data table/DataTable";
import { useNavigate } from "react-router-dom";

const SellerOrder = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [orders, setOrders] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);

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
    "Selectedsize",
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
            <div style={{ display: "flex", flexDirection: "row" }}>
              {params.row.Status === "Ready To PickUp" ? (
                <button style={{padding:"10px",background:"rgb(248,249,250)"}} onClick={() => addToDelivery(params.row.id)}>
                  <i className="bi bi-truck fa-2x"></i>
                </button>
              ) : (
                (params.row.Status === "confirm Delivery" ||
                  params.row.Status === "confirm Return") ? (
                  <button>
                    <i className="bi bi-check-circle-fill fa-2x"></i>
                  </button>
                  
                ):  <button onClick={() => navigate(`/productVerification/${params.row.id}`)}><i className="bi bi-eye-fill fa-2xl"></i></button>
              )}
              <div
                className="m-2"
                onClick={() => {
                  // setModalShow(true);
                  console.log(params);
                  setDeleteProductId({
                    id: params.row.id,
                    seller: params.row.seller,
                  });
                }}
              ></div>
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
      prdId:ele.productId,
      Product: ele.prdDeta.images,
      Category: ele.prdDeta.category,
      Selectedsize: ele.sizeWithQuantity,
      Status: ele.orderStatus,
      Trackingid: ele.trackId,
      amount: ele.ordPrc,
    };
  });

  return (
    <div style={{ marginLeft: "-150px"}}>
      <div>
        {rowData.length !== 0 && (
          <DataTable columns={header} rows={rowData} autoHeight />
        )}
      </div>
    </div>
  );
};

export default SellerOrder;
