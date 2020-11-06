import React, { useState } from "react";
import { CSVLink } from "react-csv";

// const headers = [
//   { label: "First Name", key: "firstName" },
//   { label: "Last Name", key: "lastName" },
//   { label: "Email", key: "email" },
//   { label: "Age", key: "age" },
// ];
function TransactionReport({ data }) {
  const [state, setState] = useState({
    csvReport: {
      data: [],
      headers: [],
      filename: "Report.csv",
    },
  });
  console.log(data);
  const downloadReport = (event, done) => {
    // API call to get data
    const objReport = {
      filename: "Report.csv",
      //   headers: headers,
      data: data.map(function (obj) {
        return {
          Sender: obj.sender_name,
          Reciever: obj.reciever_name,
          Amount: obj.amount,
          Commission: obj.commission,
          Transaction_ID: obj.Transaction_id,
          Payment_Method: obj.method,
          Order_Id: obj.order_ID,
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
      style={{ textDecoration: "none", color: "blue" }}
    >
      Generate Report
    </CSVLink>
  );
}

export default TransactionReport;
