import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import httpService from '../../../Error Handling/httpService';
import { apiURL } from '../../../../const/config';

function CategoryPieChart() {
  const [users, setUsers] = useState([]);


  const [pieChartOptions, setPieChartOptions] = useState({
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
          },
        },
      },
    },
  });

 

  const [pieChartSeries, setPieChartSeries] = useState([
    {
      name: 'Categories',
      data: [], // We'll update this with pie chart data
    },
  ]);

  const getOrders = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const res = await httpService.get(`${apiURL}/orders/get-all-orders`, config);
      console.log('mmmmmmm', res.data);

      setUsers(res.data);
      const categoryCount = {};
      res.data.forEach((product) => {
        const category = product.prdData.category;
        if (categoryCount[category]) {
          categoryCount[category] += 1;
        } else {
          categoryCount[category] = 1;
        }})

        const categoryNames = Object.keys(categoryCount);
        const categoryValues = Object.values(categoryCount);

        setPieChartOptions((prevOptions) => ({
          ...prevOptions,
          labels: categoryNames,
        }));
      
        setPieChartSeries(categoryValues);
      
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

 
  }, [users]);

  // You will need to update pieChartSeries with appropriate data for the pie chart here
  useEffect(() => {
    // Fetch data related to pie chart categories and values here
    // For example, let's assume you have an array of category objects with values
    const pieChartData = [
      { category: 'Men', value: 10 },
      { category: 'Womens', value: 20 },
      { category: 'Kids', value: 15 },
      // Add more categories and values as needed
    ];
  
    // Extract category names and values from the data
    const categoryNames = pieChartData.map((item) => item.category);
    const categoryValues = pieChartData.map((item) => item.value);
  
    setPieChartOptions((prevOptions) => ({
      ...prevOptions,
      labels: categoryNames,
    }));
  
    setPieChartSeries(categoryValues);
  }, []);


  




  return (
    <div>
    {/* <div className="app">
      <Chart options={barChartOptions} series={barChartSeries} type="bar" />
    </div> */}
    <div className="app">
        <h1 style={{marginRight:'5px'}}>Category wise sale</h1>
        <div style={{marginTop:'30px'}}>

      <Chart
        width={300}
        height={300}
        options={pieChartOptions}
        series={pieChartSeries}
        type="pie"
      />
        </div>
    </div>
  </div>
  );
}

export default CategoryPieChart;
