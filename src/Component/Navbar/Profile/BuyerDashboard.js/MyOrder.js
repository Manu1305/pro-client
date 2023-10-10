import React, { useEffect, useState } from "react";
import styles from "./MyOrder.module.css";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addorder } from "../../../../Redux/order/orderAction";
import { apiURL } from "../../../../const/config";
import httpService from "../../../Error Handling/httpService";
import ClipLoader from "react-spinners/ClipLoader";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import Swal from "sweetalert2";
import imge from '../../../../images/logoooo.jpg'
import DataTable from "../../../Reuseable Comp/DataTable";
import { RiDeleteBin6Fill } from "react-icons/ri";
const BuyerOrder = () => {
  const dispatch = useDispatch();

  // const orderss = useSelector((state) => state.orderReducer.order);
  //
  const [orders, setOrders] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.userReducer.user);

 





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
        .then((res) => {
          setIsLoading(false);

          console.log(res.data + "orders csdc");
          return res.data;
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);

        });
      console.log(res);
      dispatch(addorder(res));

      if (res.length == 0) {
        setOrders([]);
      } else {
        setOrders(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const returnButton = (order) => {
    // alert(order.updatedAt);

    const currentDate = new Date();

    console.log(order.updatedAt);
    console.log(currentDate);
    console.log("Check difference ", currentDate < order.updatedAt);
  };

  // const user = useSelector((state) => state.userReducer.user)
  console.log("user", user);
  const header = [
    "Name",
    "Phone",
    "Email",
    "Plan",
    "expire",
    "remainingDays",
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
                // onClick={() => navigate(`/ViewDetails/${params.row.id}`)}
                alt=""
                width={30}
              />
            </div>
          );
        },
      };
    }
    // if (ele === "action") {
    //   return {
    //     field: "Action",
    //     type: "action",
    //     width: "150px",
    //     renderCell: (params) => {
    //       console.log("Check here", params.row);
    //       return (
    //         <div style={{ display: "flex", flexDirection: "row" }}>
    //           <div
    //             className="mr-5"
                
    //           >
    //             <RiDeleteBin6Fill />
    //           </div>
    //           {/* <div onClick={() => quantityHandler(params.row)}>
    //               <FiEdit />
    //             </div> */}
    //         </div>
    //       );
    //     },
    //   };
    // }
     else {
      return {
        field: ele,
        headerName: string,
        width: 150,
        editable: true,
      };
    }
  });

  const rowData = orders.map((ele) => {
    const expDate = new Date(ele.subscription.expDate);
    const currentDate = new Date();
    const timeDifference = expDate - currentDate;

    // Calculate the remaining days
    const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return {
      id: ele._id,
      Name: ele.name,
      Phone: ele.phone,
      Email: ele.email,
      Plan: ele.subscription.subsStatus,
      expire: new Date(ele.subscription.expDate).toLocaleDateString("en-US"),
      remainingDays: remainingDays,
    };
  });


  useEffect(() => {
    setIsLoading(true);
    getOrders();
  }, []);

  function cancelorder(id) {
    Swal.fire({
      title: 'Are you sure to cancel this order?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        axios
          .put(`${apiURL}/orders/update-order/${id}`, config)
          .then((res) => {
            getOrders();
            Swal.fire(
              '!',
              'Your Order cancelled successfully...',
              'success'
            )
          })
          .catch((err) => {
            console.log(err);
          });

      }
    })

  }

  return (
    <div className={`d-flex flex-wrap ${styles.tableWrapper}`}>
      {orders.length === 0 ? (
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
              <p>Loading orders...</p>
            </div>
          ) : (
            <img
              src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=740&t=st=1692603469~exp=1692604069~hmac=6b009cb003b1ee1aad15bfd7eefb475e78ce63efc0f53307b81b1d58ea66b352"
              alt="Loaded"
            />
          )}
        </div>
      ) : 
      (
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
  );
};

export default BuyerOrder;
