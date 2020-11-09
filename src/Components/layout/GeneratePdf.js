import React, { useState } from "react";
import { CSVLink } from "react-csv";

// const headers = [
//   { label: "Order ID", key: "order_id" },
//   { label: "User Name", key: "user_name" },
//   { label: "Total_bill", key: "total_bill" },
//   { label: "Discount", key: "discount" },
//   { label: "Provider Name", key: "provider_name" },
//   { label: "Location", key: "loc" },
// ];
function AsyncCSV({ data }) {
  const [state, setState] = useState({
    csvReport: {
      data: [],
      headers: [],
      filename: "Report.csv",
    },
  });
  // console.log(data.items.productName);
  const downloadReport = (event, done) => {
    // API call to get data
    const objReport = {
      filename: "Report.csv",
      // headers: headers,
      data: data.map(function (obj) {
        return {
          OrderId: obj.order_ID,
          UserName: obj.user_name,
          Total_Bill: obj.total_bill,
          Discount: obj.discount,
          Provider_Name: obj.provider_name,
          Location: obj.dropoff_loc,
          //   item_Name: obj.items[0].productName,
        };
      }),
    };
    setState({ csvReport: objReport }, () => {
      done();
    });
  };

  return (
    <CSVLink
      {...state.csvReport}
      asyncOnClick={true}
      onClick={downloadReport}
      style={{
        textDecoration: "none",
        color: "white",
      }}
    >
      Generate Report
    </CSVLink>
  );
}

export default AsyncCSV;
