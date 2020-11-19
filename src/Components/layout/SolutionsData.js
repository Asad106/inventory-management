import React, { useState, useEffect } from "react";
import moment from "moment";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  cover: {
    width: "50px",
    height: "50px",
  },
  header: {
    color: "white",
  },
}));

function SolutionData(props) {
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Order-table">
          <TableHead
            style={{
              borderWidth: "2px solid grey ",
              backgroundColor: "#817aff",
            }}
          >
            <TableRow>
              <TableCell className={classes.header}>
                Problem Created_By
              </TableCell>
              <TableCell className={classes.header}>Problem</TableCell>

              <TableCell className={classes.header}>Category</TableCell>
              <TableCell className={classes.header}> Comments</TableCell>
              <TableCell className={classes.header}>Created Date</TableCell>
              <TableCell className={classes.header}>Solved Date</TableCell>

              {/* <TableCell className={classes.header} align="center">
                Action
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.solutions
              .slice(props.page, props.page + props.showPerPage) // slice method will change with backend pagination
              .map((solution, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {solution.user_name}
                  </TableCell>
                  <TableCell>{solution.problem}</TableCell>
                  <TableCell>{solution.category}</TableCell>
                  <TableCell>{solution.comments}...</TableCell>
                  <TableCell>
                    {new Date(
                      solution.problemdate.seconds * 1000
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {solution.solutionDate && solution.solutionDate}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SolutionData;
