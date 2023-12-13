import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ScaleLoader } from "react-spinners";
import DataTable from "../Reuseable Comp/DataTable";
import httpService from "../../Error Handling/httpService";
import { apiURL } from "../../../const/config";
import axios from "axios";

export const AllUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [check, setCheck] = useState(false);
  const [premium, setPremium] = useState([]);

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

  const activateUser = async (id, status) => {
    console.log("Id", id);
    try {
      await httpService
        .patch(`${apiURL}/user/deactivate-activate-user/${id}`, {
          actStatus: status,
        })
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
  const storeAccessButton = async (id) => {
    try {
      await axios
        .put(`${apiURL}/user/change-isownstore-status/${id}`)
        .then((res) => {
          console.log("Status Updated", res.data);
          const updatedData = premium.map((item) => {
            if (item._id === res.data._id) {
              return { ...res.data };
            } else {
              return item;
            }
          });
          setPremium(updatedData);
        })
        .catch((err) => {
          console.log(err);
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
    "Store",
    "Action",
  ].map((ele) => {
    let string = ele;
    string.replace(/^./, string[0].toUpperCase());

    if (ele === "Store") {
      return {
        field: "Store",
        type: "store",
        width: "200px",
        renderCell: (params) => {
          return (
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={params.row.Store}
                  onChange={() => storeAccessButton(params.row.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          );
        },
      };
    } else if (ele === "Action") {
      return {
        field: "Action",
        type: "action",
        width: "150px",
        renderCell: (params) => {
          return (
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <button
                  className={
                    params.row.Action ? "btn btn-danger" : "btn btn-success"
                  }
                  onClick={() => activateUser(params.row.id, params.row.Action)}
                >
                  {!params.row.Action ? "Activate" : "Deactivate"}
                </button>
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

  const rowData = premium
    .map((ele) => {
      return {
        id: ele._id,
        name: ele.name,
        phone: ele.phone,
        email: ele.email,
        premium: ele.subscription.subsStatus,
        userType: ele.urType,
        gst: ele.gst,
        Action: ele.status,
        Store: ele.isOwnStore,
      };
    })
    .filter((ele) => ele.userType !== "admin");

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
