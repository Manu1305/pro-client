import React, { useState, useEffect } from "react";
import styles from "./AdminWithdraw.module.css";
import { apiURL } from "../../../../../const/config";
import httpService from "../../../../Error Handling/httpService";

const AdminWithdrawControl = () => {
  const [details, setDetails] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [status, setStatus] = useState("");
  const [utr, setUtr] = useState(null);
  const [bankdata, setBankData] = useState({});
  const [bank, setbank] = useState("");
  const [withs, setWiths] = useState([]);

  const getWithdrawDet = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await httpService
        .get(
          `${apiURL}/seller/seller-admin-withdrawDetails`,
          config
        )
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });

      setDetails(res.data);
    } catch (error) {
      console.log(error);
      setDetails([]);
    }
  };

  useEffect(() => {
    getWithdrawDet();
  }, []);

  const handleDetailsClick = async (userId) => {
    setSelectedRow(userId);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await httpService
        .get(
          `${apiURL}/Bankdetails/getBankData/${userId.seller}`,
          config
        )
        .then((res) => {
          setBankData(res.data[0]);
          return res;
        })
        .catch((err) => {
          console.log(err);
        });

      setbank(res.data);
    } catch (error) {
      console.log(error);
      setDetails([]);
    }
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  // for accept-withdraw-request payent

  const withdrawReqAccept = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await httpService
        .put(
          `${apiURL}/withdraw/accept-withdraw-request/${id}`,
          { utr, withdrawStatus: status },
          config
        )
        .then((res) => {
          getWithdrawDet();
        })
        .catch((err) => {
          console.log(err);
        });

      setDetails(res.data);
    } catch (error) {
      console.log(error);
      setDetails([]);
    }
  };

  const selectedOptionHandler = (e) => {
    setStatus(e.target.value);
  };
  const getWithdraw = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await httpService.get(
        `${apiURL}/withdraw/getwithdraw`,
        config
      );
      console.log("dsss", response.data)
      setWiths(response.data);
    } catch (error) {
      console.log("API Error", error);
    }
  };
  useEffect(() => {
    getWithdraw();
  }, []);

  const table1Data = details.filter((_, index) => index % 2 === 0);
  const table2Data = withs.filter((_, index) => index % 2 === 0);

  return (
    <div className={styles.container}>
      {/* <div className={styles.maindiv}> */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Admin Fee</th>
              <th>Total Amount</th>
              <th>OrderId</th>
              <th>Status</th>
              <th>UTR No.</th>
              <th>Account Details</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {table1Data.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{(row.amount) * 90 / 100}</td>
                <td>{(row.amount) * 10 / 100}</td>
                <td>{row.amount}</td>
                <td>{row.orderId}</td>
                <td>
                  <div>
                    {row.withdrawStatus ? (
                      row.withdrawStatus
                    ) : (
                      <select
                        className={styles.select}
                        onChange={selectedOptionHandler}
                      >
                        <option value={"Pending"}>Pending</option>
                        <option value="Paid">Paid</option>
                      </select>
                    )}
                  </div>
                </td>
                <td>
                  {row.utr ? (
                    row.utr
                  ) : (
                    <input
                      type="number"
                      name="utr"
                      onChange={(event) => setUtr(event.target.value)}
                      className="bg-white"
                    />
                  )}
                </td>
                <td>
                  <button
                    className={styles.button}
                    onClick={() => handleDetailsClick(row)}
                  >
                    Details
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => withdrawReqAccept(row._id)}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <div className={styles.tableContainer}>
        <h2 className="m-4">Withdraw History</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Admin Fee</th>
              <th>Total Amount</th>
              <th>OrderId</th>
              <th>Status</th>
              <th>UTR No.</th>

            </tr>
          </thead>
          <tbody>
            {table2Data.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{(row.amount) * 90 / 100}</td>
                <td>{(row.amount) * 10 / 100}</td>
                <td>{row.amount}</td>
                <td>{row.orderId}</td>
                <td>
                  <div>
                    {row.withdrawStatus ? (
                      row.withdrawStatus
                    ) : (
                      <select
                        className={styles.select}
                        onChange={selectedOptionHandler}
                      >
                        <option value={"Pending"}>Pending</option>
                        <option value="Paid">Paid</option>
                      </select>
                    )}
                  </div>
                </td>
                <td>
                  {row.utr ? (
                    row.utr
                  ) : (
                    <input
                      type="number"
                      name="utr"
                      onChange={(event) => setUtr(event.target.value)}
                      className="bg-white"
                    />
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedRow !== null && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Bank Details</h2>
            <h3>Name:{bankdata.Name}</h3>
            <h3>Bank Name: {bankdata.bankName}</h3>
            <h3>branch:{bankdata.Branch}</h3>
            <h3>Account number:{bankdata.AccountNumber}</h3>
            <h3>ifsc:{bankdata.ifsc}</h3>
            <p>{details[selectedRow]?.additionalDetails}</p>

            <button className={styles.closeButton} onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default AdminWithdrawControl;