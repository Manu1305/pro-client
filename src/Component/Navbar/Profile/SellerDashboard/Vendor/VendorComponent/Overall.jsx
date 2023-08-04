import React from "react";
import styles from "./Overal.module.css";

function Overall() {
  const products = [
    { name: "NetSales", value: 0 },
    { name: "Earnings", value: 0 },
    { name: "PageView", value: 0 },
    { name: "Orders", value: 0 },
  ];

  return (
    <div className={styles.productContainer}>
      <div className={styles.tableContainer}>
        <table className={styles.customers}>
          <thead>
            <tr>
              {/* <th colSpan="2">
                <h3>Products</h3>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
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

export default Overall;
