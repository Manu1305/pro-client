import React, { useEffect, useState } from "react";
import { apiURL } from "../../../../const/config";
import httpService from "../../../Error Handling/httpService";
import Orders from "../../../Navbar/Profile/SellerDashboard/Vendor/VendorComponent/Orders/Orders";
import stylesss from "./RecentSales.module.css";
function Recentsales() {
  const [orders, setOrders] = useState([]);
  const [lastFiveOrders, setlastFiveOrders] = useState([]);

  const getOrders = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await httpService
        .get(`${apiURL}/orders/get-all-orders`, config)
        .then((res) => {
          console.log(res.data);

          if (res.data.length > 0) {
            setlastFiveOrders(res.data.slice(0, 5));
          }

          return res.data;
        })
        .catch((err) => {
          console.log(err);
          
        });
      setOrders(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
    // const lastFiveOrders = orders.slice(-5);
  }, []);

  return (
    <div>
      <div className={`container-fluid pt-4 px-4 ${stylesss.kkkk}`}>
        <div className={"bg-light text-center rounded p-4 "}>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Recent orders</h6>
            {/* <a href="">Show All</a> */}
          </div>
          <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
              <thead>
                <tr className="text-dark">
                  <th scope="col">
                    <input className="form-check-input" type="checkbox" />
                  </th>
                  <th scope="col">Date</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Product</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Payment type</th>
                </tr>
              </thead>
              <tbody>
                {lastFiveOrders.length !== 0 &&
                  lastFiveOrders.map((sale, index) => {
                    const date = new Date(sale.createdAt)
                      .toISOString()
                      .split("T")[0];
                    return (
                      <tr key={index}>
                        <td>
                          <input className="form-check-input" type="checkbox" />
                        </td>
                        <td>{date}</td>
                        <td>{sale.dlvAddr.phone}</td>
                        <td>{sale.prdData.brand}</td>
                        <td>{sale.ordPrc}</td>
                        <td>{sale.orderStatus}</td>
                        <td>{sale.pType}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recentsales;
