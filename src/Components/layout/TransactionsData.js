import React, { useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";

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

function TransactionsData(props) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Transaction-table">
        <TableHead
          style={{ borderWidth: "2px solid grey ", backgroundColor: "#817aff" }}
        >
          <TableRow>
            <TableCell className={classes.header}>Sender</TableCell>

            <TableCell className={classes.header}>Reciever</TableCell>
            <TableCell className={classes.header}>Amount</TableCell>

            <TableCell className={classes.header}>Commission</TableCell>
            <TableCell className={classes.header}>Method</TableCell>
            <TableCell className={classes.header}>Transaction Date</TableCell>
            {/* <TableCell align="center">Actions</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.transactions
            .slice(props.page, props.page + props.showPerPage) // slice method will change with backend pagination
            .map((transaction, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {transaction.sender_name}
                </TableCell>
                <TableCell>{transaction.reciever_name}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>
                  {(transaction.amount * transaction.commission) / 100}
                </TableCell>
                <TableCell>{transaction.method}</TableCell>

                <TableCell>
                  {new Date(
                    transaction.transaction_date * 1000
                  ).toLocaleString()}
                </TableCell>

                {/* <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => props.onEdit(item.id)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionsData;
