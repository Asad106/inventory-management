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

function UserData(props) {
  const { checked, setChecked } = React.useState(true);
  const classes = useStyles();
  const handleCheck = (event) => {
    setChecked({ [event.target.name]: event.target.checked });
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Inventory-table">
        <TableHead style={{ backgroundColor: "lightgrey" }}>
          <TableRow>
            <TableCell> Name</TableCell>
            <TableCell>Phone #</TableCell>
            <TableCell>Address</TableCell>

            <TableCell>Image</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users
            .slice(props.page, props.page + props.showPerPage)
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell>{item.phoneNo}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell align="center">
                  <div>
                    <img className={classes.cover} src={item.image} />
                  </div>
                </TableCell>
                <TableCell>
                  <Checkbox
                    name="checked"
                    size={"small"}
                    value={item.status}
                    onChange={handleCheck}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    // onClick={() => props.onEdit(item.id)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  {/* <IconButton
                  aria-label="delete"
                  color="secondary"
                  // onClick={() => props.onDelete(item.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton> */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserData;
