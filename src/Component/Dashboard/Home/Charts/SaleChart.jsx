import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import httpService from "../../../Error Handling/httpService";
import { apiURL } from "../../../../const/config";

function SaleChart({ handleLoginTypeChange }) {
  const [users, setUsers] = useState([]);
  const [barChartOptions, setBarChartOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [],
    },
  });

  const [barChartSeries, setBarChartSeries] = useState([
    {
      name: "Monthly Sales",
      data: [], // We'll update this with the monthly sales data
    },
  ]);

  const getOrders = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const res = await httpService.get(
        `${apiURL}/orders/get-all-orders`,
        config
      );
      console.log("mmmmmmm", res.data);

      setUsers(res.data);
      const categoryCount = {};
      res.data.forEach((product) => {
        const category = product.prdData.category;
        if (categoryCount[category]) {
          categoryCount[category] += 1;
        } else {
          categoryCount[category] = 1;
        }
      });

      const categoryNames = Object.keys(categoryCount);
      const categoryValues = Object.values(categoryCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    const monthlySales = Array(12).fill(0);
    users.forEach((user) => {
      const userDate = new Date(user.createdAt);
      const month = userDate.getMonth();
      monthlySales[month] += 1;
    });

    setBarChartOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    }));
    setBarChartSeries([{ name: "Monthly Sales", data: monthlySales }]);
  }, [users]);

  return (
    <div>
      <div className="">
        <h1>Total Sales</h1>
        <Chart  options={barChartOptions} series={barChartSeries} width={700} height={350} type="bar" />
      </div>
    </div>
  );
} 

export default SaleChart;
