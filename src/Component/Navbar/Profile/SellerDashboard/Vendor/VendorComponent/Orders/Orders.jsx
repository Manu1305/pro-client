import React from "react";
import styles from "./Orders.module.css";

function Orders() {
  const Orderss = [
    { name: "Total", value: 0 },
    { name: "Live", value: 0 },
    { name: "Offline", value: 0 },
    { name: "Pending Review", value: 0 },
  ];

  return (
    <div className={styles.productContainer}>
      <div className={styles.tableContainer}>
        <table className={styles.customers}>
          <thead>
            <tr>
              <th colSpan="2">
                <h5>ORDERS</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {Orderss.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
