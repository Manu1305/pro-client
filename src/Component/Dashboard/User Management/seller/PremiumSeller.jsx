import React, { useEffect, useState } from "react";

import {  useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import ReasonModal from "../../Product Request/ReasonModal";
import { ScaleLoader } from "react-spinners";
import DataTable from "../../Reuseable Comp/DataTable";
import { RiDeleteBin6Fill } from "react-icons/ri";
import httpService from "../../../Error Handling/httpService";
import { apiURL } from "../../../../const/config";

export const PremiumSellers = () => {

  const [deleteId, setDeleteId] = useState(null);
  const [seller, setSellerName] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [premium, setPremium] = useState([]);
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
        .catch((error) => {
          setIsLoading(false);
        });
      console.log("users", res.data);
      const data = res.data;
      const premium = data.filter((data) => data.urType === "seller");

      setPremium(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getUsers();
  }, []);

  const removeFromShop = async (id, obj) => {
    try {
      await httpService
        .put(`${apiURL}/product/remove-requested-product/${id}`, {
          message: { ...obj, forU: user.email },
        })
        .then((res) => {
          console.log(res.data);
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
              {/* <div onClick={() => quantityHandler(params.row)}>
                  <FiEdit />
                </div> */}
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

  return (
    <div className="container ml-5 mr-0">
      <div className="d-flex justify-content-center row">
        <h1>Premium Members</h1>

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
