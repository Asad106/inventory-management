import React from "react";
import Chart from "react-apexcharts";
import moment from "moment";

const PieChart = ({ ActiveUsers }) => {
  console.log(ActiveUsers.length);
  const state = {
    series: [ActiveUsers.length],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      colors: ["#20E647"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
            background: "#293450",
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15,
            },
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#fff",
              fontSize: "13px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val) + " " + "users";
              },
              color: "#fff",
              fontSize: "30px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#ecf987"],
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: [" Current Active Users"],
    },
  };

  return (
    <>
      {
        <Chart
          options={state.options}
          series={state.series}
          type="radialBar"
          height={350}
        />
      }
    </>
  );
};

export default PieChart;
