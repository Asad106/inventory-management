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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect } from 'react-redux';
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

function CartData(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isobjset,setisobjset]= React.useState(false);
const [obj,setobj]=React.useState([]);
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

            <TableCell>Total Bill</TableCell>
            <TableCell align="center">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.carts
            .slice(props.page, props.page + props.showPerPage) // slice method will change with backend pagination
            .map((cart, index) => (
           
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {cart.user_name}
                </TableCell>
                <TableCell>{new Date((cart.creation_date_time.seconds*1000)).toLocaleString()}</TableCell>

                <TableCell>{cart.total_bill}</TableCell>

                <TableCell align="center">
                 
                  <Button variant="outlined" color="primary" onClick={()=>{handleClickOpen();
                  setobj(cart.items);
                  console.log("items are",cart.items);
                  setisobjset(true);
                 
                  }}>
        Details
      </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}
maxWidth = {'md'}>
    <DialogTitle id="form-dialog-title">Details</DialogTitle>
    <DialogContent>
      <>
      <DialogContentText>
        Items Detail
      </DialogContentText>
             {isobjset ?(
        obj?(
          <>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Item-table">
            <TableHead style={{ borderWidth: "2px solid grey " }}>
              <TableRow>
              <TableCell>Price</TableCell>
    
                 <TableCell>Price Per unit</TableCell> 
                 <TableCell>Product Name</TableCell>
    
                <TableCell>Product Type</TableCell>
                <TableCell>Quantity</TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {obj // slice method will change with backend pagination
                .map((cart, index) => (
               
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {cart.price}
                    </TableCell>
                    <TableCell>{cart.pricePerUnit}</TableCell>
                    <TableCell>{cart.productName}</TableCell>
    
                    <TableCell>{cart.productType}</TableCell>
                    <TableCell>{cart.quantity}</TableCell>
                 
    
                    
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        </>
        ):
        (null)
      )
            :
            <h3>Empty</h3>
          }
     
      {/* <h4>Transaction Date: {new Date((props.orderObj.transaction_date.seconds*1000)).toLocaleString()}</h4> */}
      </>
    

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
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getTransactionForOrderById: (id) => {
//       dispatch(getTransactionForOrderById(id));
//     },
//   };
// };
// const mapStateToProps = (state) => {
//   return {
//     carts: state.cart.cartlist
//   };
// };

export default (CartData);
