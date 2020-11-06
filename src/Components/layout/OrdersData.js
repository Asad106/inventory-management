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
import { getTransactionForOrderById } from "../../redux/actions/orderActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import { Container, Row, Col, Tab, Tabs, Modal, Card } from "react-bootstrap";

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
  const [open, setOpen] = React.useState(false);
  const [isobjset, setisobjset] = React.useState(false);
  const [obj, setobj] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
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
              <TableCell>Discount Given</TableCell>
              <TableCell align="center">Details</TableCell>
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
                  <TableCell>
                    {new Date(
                      order.creation_date_time.seconds * 1000
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {order.dropoff_loc.latitude.toString() +
                      "," +
                      order.dropoff_loc.longitude.toString()}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      order.card_to_order_date.seconds * 1000
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell>{order.provider_name}</TableCell>
                  <TableCell>{order.total_bill}</TableCell>
                  <TableCell>{order.discount}</TableCell>

                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        handleClickOpen();
                        setobj(order);
                        setisobjset(true);
                        props.getTransactionForOrderById(order.transaction);
                      }}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle id="form-dialog-title">Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Transaction Detail</DialogContentText>
          {props.orderObj ? (
            <>
              <Row>
                {" "}
                <h4>Reiever: {props.orderObj.reciever_name}</h4>
              </Row>

              <Row>
                <h4>Sender: {props.orderObj.sender_name}</h4>
              </Row>
              <Row>
                <h4>Method: {props.orderObj.method}</h4>
              </Row>
              <Row>
                <h4>Amount: {props.orderObj.amount}</h4>
              </Row>
              <Row>
                <h4>Commission: {props.orderObj.commission}</h4>
              </Row>
              {isobjset ? console.log("obj is", obj.items) : null}
              {/*{isobjset ?(
        obj.items?(
         obj.items 
            .map((order, index) => (
              console.log(order)
            ))
        ):
        (null)
      )
            :
            null
          } */}
              {/* <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Item-table">
        <TableHead style={{ borderWidth: "2px solid grey " }}>
          <TableRow>
          <TableCell>price</TableCell>

             <TableCell>Cart Creation Date</TableCell> 
             <TableCell>Dropoff Location</TableCell>

            <TableCell>Cart to Order Date</TableCell>
            <TableCell>Provider</TableCell>
            <TableCell>Total Bill</TableCell>
            <TableCell>Discount Given</TableCell>
            <TableCell align="center">Details</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {obj.items // slice method will change with backend pagination
            .map((order, index) => (
           
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {order.price}
                </TableCell>
                {/* <TableCell>{new Date((order.creation_date_time.seconds*1000)).toLocaleString()}</TableCell>
                <TableCell>{order.dropoff_loc.latitude.toString() +"," + order.dropoff_loc.longitude.toString()}</TableCell>

                <TableCell>{new Date((order.card_to_order_date.seconds*1000)).toLocaleString()}</TableCell>
                <TableCell>{order.provider_name}</TableCell>
                <TableCell>{order.total_bill}</TableCell>
                <TableCell>{order.discount}</TableCell>

                <TableCell align="center">
                 
                  <Button variant="outlined" color="primary" onClick={()=>{handleClickOpen();
                  setobj(order);
                  props.getTransactionForOrderById(order.transaction);
                 
                  }}>
        Details
      </Button>
                </TableCell> 
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer> */}
              {/* <h4>Transaction Date: {new Date((props.orderObj.transaction_date.seconds*1000)).toLocaleString()}</h4> */}
            </>
          ) : (
            <h3>Empty</h3>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleClose} color="primary">
        Subscribe
      </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    getTransactionForOrderById: (id) => {
      dispatch(getTransactionForOrderById(id));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    orders: state.order.orderlist,
    orderObj: state.order.orderObj,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersData);