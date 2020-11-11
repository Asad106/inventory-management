import React from "react";
import Chart from "react-apexcharts";
import moment from "moment";

const TransactionChart = ({ transactions }) => {
  //Return the series in form of array of objects
  const getChartDataSeries = (transactions) => {
    const chartDataInObjForm = transactions.reduce((formattedResult, item) => {
      const key = moment(item.transaction_date.toDate()).format("MMM DD");
      formattedResult[key] = {
        transactionAmount: item.amount,
        commisionAmount: (item.amount * item.commission) / 100,
      };
      return formattedResult;
    }, {});
    console.log("Json object ");
    console.log(chartDataInObjForm);

    const transactionSeriesData = [];
    const commisionSeriesData = [];
    Object.entries(chartDataInObjForm).forEach(([key, value]) => {
      transactionSeriesData.push({
        x: key,
        y: value.transactionAmount,
      });
      commisionSeriesData.push({
        x: key,
        y: value.commisionAmount,
      });
    });
    const series = [
      {
        name: "transactions ",
        data: transactionSeriesData,
      },
      {
        name: "commission ",
        data: commisionSeriesData,
      },
    ];
    console.log("Final Chart data for both series");
    console.log(JSON.stringify(series));

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
          series={getChartDataSeries(transactions)}
          type="bar"
          height={350}
        />
      }
    </>
  );
};

export default TransactionChart;
