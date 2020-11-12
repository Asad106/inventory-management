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

function UserData(props) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Inventory-table">
        <TableHead
          style={{
            borderWidth: "2px solid grey ",
            backgroundColor: "#817aff",
          }}
        >
          <TableRow>
            <TableCell className={classes.header}> Name</TableCell>
            <TableCell className={classes.header}>Phone #</TableCell>
            <TableCell className={classes.header}>Address</TableCell>

            <TableCell className={classes.header}>Status</TableCell>
            <TableCell className={classes.header}>Email</TableCell>
            <TableCell className={classes.header}>Image</TableCell>
            <TableCell className={classes.header} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users
            .slice(props.page, props.page + props.showPerPage) // slice method will change with backend pagination
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>{item.phoneNo}</TableCell>
                <TableCell>{item.address}</TableCell>

                <TableCell>{item.status}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <div>
                    <img className={classes.cover} src={item.imageLink} />
                  </div>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => props.onEdit(item.id)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserData;
