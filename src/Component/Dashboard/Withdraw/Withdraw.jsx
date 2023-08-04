import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Withdraw.module.css";
import { BiMoneyWithdraw, BiHappyAlt } from "react-icons/bi";
import { FcMoneyTransfer } from "react-icons/fc";
import { BsWallet2 } from "react-icons/bs";
import { apiURL } from "../../../const/config";

const Withdraw = () => {
  const [orders, setOrders] = useState([]);

  const getWithdreawDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await axios
        .get(
          `${apiURL}/seller/seller-admin-withdrawDetails`,
          config
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      setOrders(res);
    } catch (error) {
      console.log(error);
      setOrders([]);
    }
  };

  useEffect(() => {
    getWithdreawDetails();
  }, []);

  const reddemButton = async (id) => {
    try {
      const res = await fetch(
        `${apiURL}/withdraw/request-withdraw/${id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
        .then((res) => {
          getWithdreawDetails();
          return res.json();
        })
        .then((json) => console.log(json));
    } catch (error) {}
  };
  return (
    <div className={styles.container}>
      {/* <div className={`${styles.mainbox} ${styles.scrollable}`}>
        <div className={styles.box1}>
          <h3>2</h3>
          <h5>Total withdrawals</h5>
          <BiMoneyWithdraw className={styles.icon} />
        </div>
        <div className={styles.box2}>
          <h3>2000</h3>
          <h5>Total Earnings</h5>
          <FcMoneyTransfer className={styles.icon} />
        </div>
        <div className={styles.box3}>
          <h3>500rs</h3>
          <h5>Wallet Balance</h5>
          <BsWallet2 className={styles.icon} />
        </div>
        <div className={styles.box4}>
          <h5>Profit</h5>
          <h3>2</h3>
          <BiHappyAlt className={styles.icon} />
        </div>
      </div> */}

      <div className={styles.maindiv}>
        <section className={styles.Heading}>
          <h1>Withdraw history</h1>
        </section>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Admin Fee</th>
              <th>Total Amount</th>
              <th>OrderId</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Action</th>
              {/* <th>Redeem</th> */}
            </tr>
          </thead>
          <tbody>
            {orders?.map((row, index) => (
              <tr key={index}>
                <td>{row.createdAt}</td>
                <td>{(row.amount * 90) / 100}</td>
                <td>{(row.amount * 10) / 100}</td>
                <td>{row.amount}</td>
                <td>{row.orderId}</td>
                <td>{row.withdrawStatus ? row.withdrawStatus : "Pending"}</td>
                <td>{row.utr ? row.utr : null}</td>
                <td>
                  {row.withdrawStatus !== "Pending" ? (
                    ""
                  ) : (
                    // tr
                    <button
                      className="btn btn-primary"
                      onClick={() => reddemButton(row._id)}
                    >
                      Redeem
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Withdraw;
