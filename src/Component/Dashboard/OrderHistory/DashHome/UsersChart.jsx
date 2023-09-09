import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';

const UserChart = ({customerLength,sellerLength}) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 350,
      type: "line",
      stacked: false,
    },

  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "User",
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
    },
    {
      name: "Seller",
      data: [20, 29, 37, 36, 44, 45, 50, 58],
    },
  ]);

  useEffect(() => {
    // Define the chart data and options
    const options = {
      ...chartOptions,
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#FF1654",
          },
          labels: {
            style: {
              colors: "#FF1654",
            },
          },
          title: {
            text: "User",
            style: {
              color: "#FF1654",
            },
          },
        },
        {
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#247BA0",
          },
          labels: {
            style: {
              colors: "#247BA0",
            },
          },
          title: {
            text: "Seller",
            style: {
              color: "#247BA0",
            },
          },
        },
      ],
    };

    // Create the chart object
    const chart = new ApexCharts(document.querySelector("#chart"), options);

    // Render the chart
    chart.render();

    // Cleanup the chart when the component unmounts
    return () => {
    //   chart.destroy();
    };
  }, [chartOptions]);

  return (
    <div id="chart">
      <ApexCharts options={chartOptions} series={chartSeries} type="line" height={350} />
    </div>
  );
};

export default UserChart;
