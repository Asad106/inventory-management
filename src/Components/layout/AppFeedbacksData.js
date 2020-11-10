import React, { useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


import { IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  cover: {
    width: "50px",
    height: "50px",
  },
}));

function AppFeedBacksData(props) {
  const classes = useStyles();
  

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Order-table">
        <TableHead style={{ borderWidth: "2px solid grey " }}>
          <TableRow>
          <TableCell>User</TableCell>

            <TableCell>Feed Back Date</TableCell>
            <TableCell>Feed Back</TableCell>

            <TableCell>Stars Given</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.feedbacks
            .slice(props.page, props.page + props.showPerPage) // slice method will change with backend pagination
            .map((feedback, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {feedback.user_name}
                </TableCell>
                <TableCell>{new Date((feedback.feedbackdate.seconds*1000)).toLocaleString()}</TableCell>
                <TableCell>{feedback.feedback}</TableCell>
                <TableCell>{feedback.stars}</TableCell>

               
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>


 
  </>
  );
  
}


export default (AppFeedBacksData);
