import React from "react";
import styles from "./Product.module.css";

function Product() {
  const products = [
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
              <th colSpan="1">
                <h5>PRODUCTS</h5>
              </th>
              <th  colSpan="1" >
                <div className={styles.buttonContainer}>
                  <button className={styles.addButton}>Add product</button>
                </div>
              </th>
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

export default Product;
