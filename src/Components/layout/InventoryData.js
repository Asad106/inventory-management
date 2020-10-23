import React, { useEffect } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
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

function InventoryData(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Inventory-table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Product Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Price Per Unit</TableCell>
            <TableCell>Image</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.inventories
            .slice(props.page, props.page + props.showPerPage) // will be change to backend pagination
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.productName}
                </TableCell>
                <TableCell>{item.productType}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.pricePerUnit}</TableCell>
                <TableCell align="center">
                  <div>
                    <img className={classes.cover} src={item.imageLink} />
                  </div>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => props.onEdit(item.id)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => props.onDelete(item.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InventoryData;
