import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";

// const headers = [
//   { label: "First Name", key: "firstName" },
//   { label: "Last Name", key: "lastName" },
//   { label: "Email", key: "email" },
//   { label: "Age", key: "age" },
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

    alert(data.length);
    if (data.length < 1) {
      toast.error("Record not found");
      return false;
    }

    const objReport = {
      filename: "Report.csv",
      //   headers: headers,
      data: data.map(function (obj) {
        return {
          OrderId: obj.order_ID,
          UserName: obj.user_name,
          Total_Bill: obj.total_bill,
          Discount: obj.discount,
          Provider_Name: obj.provider_name,
          Location: JSON.stringify(obj.dropoff_loc),
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
      asyncOnClick={false}
      onClick={downloadReport}
      style={{ textDecoration: "none", color: "white" }}
    >
      Generate Report
    </CSVLink>
  );
}

export default AsyncCSV;
