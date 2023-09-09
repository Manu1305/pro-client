import React, { useState, useEffect } from "react";
import { BiMoneyWithdraw, BiHappyAlt } from "react-icons/bi";
import { FcMoneyTransfer } from "react-icons/fc";
import { BsWallet2 } from "react-icons/bs";
import { apiURL } from "../../../const/config";
import httpService from "../../Error Handling/httpService";
import { ScaleLoader } from "react-spinners";
import DataTable from "../../Reuseable Comp/DataTable";

const Withdraw = () => {
  const [withdraws, setWithdraws] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getWithdreawDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await httpService
        .get(`${apiURL}/seller/seller-admin-withdrawDetails`, config)
        .then((res) => {
          console.log("RESSSS", res.data);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      setWithdraws(res);
    } catch (error) {
      console.log(error);
      setWithdraws([]);
    }
  };

  useEffect(() => {
    getWithdreawDetails();
  }, []);

  const reddemButton = async (id) => {
    try {
      await fetch(`${apiURL}/withdraw/request-withdraw/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          console.log("Reddem data", json);
          const updateDAta = withdraws.map((ele) => {
            if (ele._id === json._id) {
              ele = { ...json };
            }
            return ele;
          });
          setWithdraws(updateDAta);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const header = [
    "Order Id",
    "Date",
    "Order Price",
    "Admin Fee",
    "Total amount",
    "Payment Status",
    "Utr",
    "Action",
  ].map((ele) => {
    let string = ele;
    string.replace(/^./, string[0].toUpperCase());

    if (ele === "Action") {
      return {
        field: "Action",
        type: "action",
        width: 150,
        renderCell: (params) => {
          return (
            <div style={{ alignItems: "center" }}>
              {params.row["Payment Status"] === "Pending" && (
                <div>
                  <p
                    className="btn btn-success btn-sm"
                    onClick={() => reddemButton(params.row.id)}
                  >
                    Reedem
                  </p>
                </div>
              )}
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

  const rowData =
    withdraws.length > 0 &&
    withdraws.map((ele) => {
      const date = new Date(ele.createdAt).toISOString().split("T")[0];
      return {
        id: ele._id,
        "Order Id": ele._id,
        Date: date,
        "Order Price": ele.amount,
        "Admin Fee": (ele.amount * 90) / 100,
        "Total amount": (ele.amount * 10) / 100,
        "Payment Status": ele.withdrawStatus ? ele.withdrawStatus : "Pending",
        Utr: ele.utr,
      };
    });

  return (
    <div>
      {rowData.length !== 0 ? (
        <DataTable columns={header} rows={rowData} autoHeight />
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
    </div>
  );
};

export default Withdraw;
