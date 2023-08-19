import React from "react";

function Saleandrevenue() {
  const data = [
    {
      icon: "fa fa-chart-line fa-3x text-primary",
      label: "Total Sales",
      value: "₹1234",
    },
    {
      icon: "fa fa-chart-bar fa-3x text-primary",
      label: "Admin Fee in Month",
      value: "₹1234",
    },
    {
      icon: "fa fa-chart-area fa-3x text-primary",
      label: "Sold This Month",
      value: "₹1234",
    },
    {
      icon: "fa fa-chart-pie fa-3x text-primary",
      label: "Received This Month",
      value: "₹1234",
    },
  ];

  return (
    <div>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          {data.map((item, index) => (
            <div className="col-sm-6 col-xl-3" key={index}>
              <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                <i className={item.icon}></i>
                <div className="ms-3">
                  <p className="mb-2">{item.label}</p>
                  <h6 className="mb-0">{item.value}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Saleandrevenue;
