import React from "react";

function Recentsales() {
  const salesData = [
    {
      date: "01 Jan 2023",
      invoice: "INV-0123",
      customer: "Manu ",
      amount: "123",
      status: "Paid",
    },
    {
      date: "02 Jan 2045",
      invoice: "INV-0456",
      customer: "Manu ",
      amount: "456",
      status: "Pending",
    },
    // Add more sales data objects here
  ];

  return (
    <div>
      <div className="container-fluid pt-4 px-4">
        <div className="bg-light text-center rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h6 className="mb-0">Recent Sales</h6>
            <a href="">Show All</a>
          </div>
          <div className="table-responsive">
            <table className="table text-start align-middle table-bordered table-hover mb-0">
              <thead>
                <tr className="text-dark">
                  <th scope="col">
                    <input className="form-check-input" type="checkbox" />
                  </th>
                  <th scope="col">Date</th>
                  <th scope="col">Invoice</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale, index) => (
                  <tr key={index}>
                    <td>
                      <input className="form-check-input" type="checkbox" />
                    </td>
                    <td>{sale.date}</td>
                    <td>{sale.invoice}</td>
                    <td>{sale.customer}</td>
                    <td>{sale.amount}</td>
                    <td>{sale.status}</td>
                    <td>
                      <a className="btn btn-sm btn-primary" href="">
                        Detail
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recentsales;
