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
}));

function OrdersData(props) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Order-table">
        <TableHead style={{ borderWidth: "2px solid grey " }}>
          <TableRow>
          <TableCell>User</TableCell>

            <TableCell>Cart Creation Date</TableCell>
            <TableCell>Dropoff Location</TableCell>

            <TableCell>Cart to Order Date</TableCell>
            <TableCell>Provider</TableCell>
            <TableCell>Total Bill</TableCell>
            {/* <TableCell align="center">Actions</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.orders
            .slice(props.page, props.page + props.showPerPage) // slice method will change with backend pagination
            .map((order, index) => (
           
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {order.user_name}
                </TableCell>
                <TableCell>{new Date((order.creation_date_time.seconds*1000)).toLocaleString()}</TableCell>
                <TableCell>{order.dropoff_loc.latitude.toString() +"," + order.dropoff_loc.longitude.toString()}</TableCell>

                <TableCell>{new Date((order.card_to_order_date.seconds*1000)).toLocaleString()}</TableCell>
                <TableCell>{order.provider_name}</TableCell>
                <TableCell>{order.total_bill}</TableCell>

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

export default OrdersData;
