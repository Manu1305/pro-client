import React, { useState, useEffect } from "react";
import styles from "./ReturnReq.module.css";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Slider from "react-slick";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrFormPrevious, GrView } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";
import { ScaleLoader } from "react-spinners";
import DataTable from "../../../../Reuseable Comp/DataTable";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles["control-btn"]} onClick={onClick}>
      <button className={styles.next}>
        <MdNavigateNext className={styles.icon} />
      </button>
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles["control-btn"]} onClick={onClick}>
      <button className={styles.prev}>
        <GrFormPrevious className={styles.icon} />
      </button>
    </div>
  );
};

export const ReturnReq = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getReturnReq = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await httpService
        .get(`${apiURL}/return/returnReq`, config)
        .then((res) => {

          console.log("RET DAta",res.data)
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReturnReq();
  }, []);

  const removeFromReq = async (id) => {
    await httpService
      .delete(`${apiURL}/return/remove-requested-return/${id}`)
      .then((res) => {
        getReturnReq();
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const AssignReturnDelivery = async (id) => {
    await httpService
      .put(`${apiURL}/delivery/assign-return-delivery-order/${id}`)
      .then((res) => {
        Swal.fire("Return Assigned");
      })

      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const header = ["User", "Order Id", "Phone", "Issue","status", "action"].map(
    (ele) => {
      let string = ele;
      
      string.replace(/^./, string[0].toUpperCase());

      
      if (ele === "action") {
        return {
          field: "Action",
          type: "action",
          width: "150px",
          renderCell: (params) => {
            console.log("Check",params.row);
            return (
              <div style={{ display: "flex", flexDirection: "row" }}>
                
                {
                  !params.row.retStatus && <>
                  <div className="m-2">
                  <p
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromReq(params.row["Order Id"])}
                  >
                    Cancel
                  </p>
                </div>
                <div className="m-2" onClick={() => console.log()}>
                  {/* <BiSolidShoppingBags /> */}
                  <p
                    className="btn btn-success btn-sm"
                    onClick={() => AssignReturnDelivery(params.row["Order Id"])}
                  >
                    Approve
                  </p>
                </div>
                  </>
                }
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
    }
  );

  const rowData = userData.map((ele) => {
    return {
      id: ele._id,
      User: ele.uname,
      "Order Id": ele.orderId      ,
      Phone: ele.phone,
      Issue: ele.productIssue,
      status:ele.retStatus
    };
  });

  return (
    <>
      {/* <p style={{ backgroundColor: "red" }}>AssignDelivery</p> */}
      <div>
        {userData.length === 0 ? (
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
        ) : (
          rowData.length !== 0 && <DataTable columns={header} rows={rowData} />
        )}
      </div>
    </>
  );
};
