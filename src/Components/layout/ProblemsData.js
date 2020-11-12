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
  header: {
    color: "white",
  },
}));

function ProblemsData(props) {
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
              <TableCell className={classes.header}>User</TableCell>

              <TableCell className={classes.header}>Problem Date</TableCell>
              <TableCell className={classes.header}>Category</TableCell>

              <TableCell className={classes.header}>Problem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.problems
              .slice(props.page, props.page + props.showPerPage) // slice method will change with backend pagination
              .map((problem, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {problem.user_name}
                  </TableCell>
                  <TableCell>
                    {new Date(
                      problem.problemdate.seconds * 1000
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell>{problem.category}</TableCell>
                  <TableCell>{problem.problem}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ProblemsData;
