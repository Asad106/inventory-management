import React from "react";
import Chart from "react-apexcharts";
import moment from "moment";

const BarChart = ({ orders }) => {
  console.log(orders);
  //Return the series in form of array of objects
  const getChartDataSeries = (orderData) => {
    const chartDataInObjForm = orderData.reduce((formattedResult, item) => {
      const key = moment(item.creation_date_time.toDate()).format("MMM DD");

      if (formattedResult.hasOwnProperty(key)) {
        formattedResult[key] = formattedResult[key] + 1;
      } else {
        formattedResult[key] = 1;
      }
      return formattedResult;
    }, {});

    const chartData = [];
    Object.entries(chartDataInObjForm).forEach(([key, value]) => {
      chartData.push({
        x: key,
        y: value,
      });
    });

    for (let i = 2; i < 10; i++) {
      chartData.push({
        x: "Oct " + i,
        y: i,
      });
    }

    const series = [
      {
        name: "No of Orders",
        data: chartData,
      },
    ];
    return series;
  };

  const options = {
    chart: {
      type: "bar",
      toolbar: {
        show: true,
      },
    },
    xaxis: {
      axisBorder: {
        show: true,
        color: "#424242",
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: "#424242",
      },
      floating: false,
    },

    stroke: {
      width: 3,
    },
    markers: {
      size: 5,
      strokeWidth: 0,
      hover: {
        size: 6,
        sizeOffset: 3,
      },
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        left: 12,
      },
    },
  };

  return (
    <>
      {
        <Chart
          options={options}
          series={getChartDataSeries(orders)}
          type="bar"
          height={350}
        />
      }
    </>
  );
};

export default BarChart;
