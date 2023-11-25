import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Slider from "react-slick";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ScaleLoader } from "react-spinners";
import DataTable from "../../Reuseable Comp/DataTable";
import httpService from "../../../Error Handling/httpService";
import { apiURL } from "../../../../const/config";

export const ReturnReq = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleShowModal = (rowData) => {
    setSelectedRowData(rowData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRowData(null);
    setShowModal(false);
  };

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
          console.log("RET DAta", res.data);
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
    setIsLoading(true);
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const AssignReturnDelivery = async (id) => {
    await httpService
      .put(`${apiURL}/delivery/assign-return-delivery-order/${id}`)
      .then((res) => {
        setIsLoading(false);
        Swal.fire("Return Assigned");
      })

      .catch((err) => {
        console.log("ERROR", err);
        setIsLoading(false);
      });
  };

  const header = ["User", "Order Id", "Phone", "Issue", "status", "action"].map(
    (ele) => {
      let string = ele;

      string.replace(/^./, string[0].toUpperCase());

      if (ele === "action") {
        return {
          field: "Action",
          type: "action",
          width: "150px",
          renderCell: (params) => {
            console.log("Check", params.row);
            return (
              <div style={{ display: "flex", flexDirection: "row" }}>
                {!params.row.retStatus && (
                  <>
                    <div className="m-2">
                      <p
                        className="btn btn-primary btn-sm"
                        onClick={() => handleShowModal(selectedRowData)}
                      >
                        Details
                      </p>
                    </div>
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
                        onClick={() =>
                          AssignReturnDelivery(params.row["Order Id"])
                        }
                      >
                        Approve
                      </p>
                    </div>
                  </>
                )}
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
      "Order Id": ele.orderId,
      Phone: ele.phone,
      Issue: ele.productIssue,
      status: ele.retStatus,
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userData &&
            userData.map((rowData, index) => (
              <div
                key={rowData.id}
                style={{
                  display: selectedRowIndex === index ? "block" : "none",
                }}
              >
                <p>User: {rowData.userId}</p>
                <p>Order Id: {rowData.orderId}</p>
                <p>Phone: {rowData.phone}</p>
                <p>Product Issue: {rowData.productIssue}</p>
                <Slider {...settings}>
                  {rowData.images.map((image, i) => (
                    <div key={i}>
                      <img src={image} alt={`Img ${i + 1}`} alignItems/>
                    </div>
                  ))}
                </Slider>
              </div>
            ))}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            className="bg-dark text-white"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
