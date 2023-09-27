import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useSelector } from "react-redux";

import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";
import ReasonModal from "../../AdminDashboard/ReasonModal";
import { toast } from "react-toastify";
import { ScaleLoader } from "react-spinners";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import UserTable from "../../../../Reuseable Comp/DataTable";
import DataTable from "../../../../Reuseable Comp/DataTable";

export const AllUsers = () => {
  const [reqProducts, setRequestedProducts] = useState([]);
  const [quantityModal, setQuantityModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [seller, setSellerName] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [premium, setPremium] = useState([]);
  const [product, setProduct] = useState({});
  const [userStatus, setUserStatus] = useState(true);
  const user = useSelector((state) => state.userReducer.user);

  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const res = await httpService
        .get(`${apiURL}/user/allUserData`)
        .then((res) => {
          setIsLoading(false);

          return res;
        })
        .catch((err) => {
          setIsLoading(false);
        });
      console.log("users", res.data);
      const data = res.data;

      setPremium(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getUsers();
  }, []);


  const activateUser = async (id,status) => {

    console.log("Id",id)
    try {
      await httpService
        .patch(`${apiURL}/user/deactivate-activate-user/${id}`,{actStatus :status})
        .then((res) => {
          console.log(res.data, "upcoming data");
          getUsers();
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    } catch (error) {
      console.log(error);
    }
  };



  const header = [
    "name",
    "phone",
    "email",
    "userType",
    "premium",
    "gst",
    "Action",
  ].map((ele) => {
    let string = ele;
    string.replace(/^./, string[0].toUpperCase());

    if (ele === "Action") {
      return {
        field: "Action",
        type: "action",
        width: "150px",
        renderCell: (params) => {
          return (
            <div>
              {/* {userStatus ? (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      deactivateUser(ele._id);
                    }}
                  >
                    dectivate
                  </button>
                </div>
              ) : ( */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <button
                    className={params.row.Action ? "btn btn-danger": "btn btn-success"}
                    onClick={() => activateUser(params.row.id,params.row.Action)}
                  >
                   {!params.row.Action ? "Activate" : "Deactivate"}
                  </button>
                </div>
              {/* )} */}
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

  const rowData = premium.map((ele) => {
    return {
      id: ele._id,
      name: ele.name,
      phone: ele.phone,
      email: ele.email,
      premium: ele.subsPlan,
      userType: ele.urType,
      gst: ele.gst,
      Action: ele.status,
    };
  });

  return (
    <div className="container ml-5 mr-0">
      <div className="d-flex justify-content-center row">
        <h1>All Users</h1>

        <div>
          {premium.length === 0 ? (
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
