/** @format */

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AsyncCSV from "./GeneratePdf";
import TransactionReport from "./TransactionReport";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { getFilterOrder } from "../../redux/actions/orderActions";
import { getFilterTransaction } from "../../redux/actions/transactionActions";

const Styles = (theme) => ({
  root: {
    flexGrow: 1,
    color: "rgba(0, 0, 0, 0.54)",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
    color: "white",
    backgroundColor: "#24aff0",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "93%",
    paddingLeft: 10,
  },
});
function Sales(props) {
  const { classes } = props;
  let [type, setType] = React.useState("orders");
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    props.getOrders(startDate, endDate);
  }, [startDate, endDate]);
  // useEffect(() => {
  //   props.getOrders(startDate, endDate);
  // }, []);
  useEffect(() => {
    props.getTransactions(startDate, endDate);
  }, [startDate, endDate]);
  // console.log("asasaass" + startDate, "sasasasas" + endDate);
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Box mx={4} className={classes.root}>
      <Typography variant="h6" style={{ paddingBottom: "10px" }}>
        Sales & Reports
      </Typography>
      <Container
        justify="center"
        style={{
          width: "60%",
          paddingLeft: 20,
          borderColor: "rgba(0, 0, 0, 0.54)",
          backgroundColor: "#e4f1f7",
          borderRadius: 20,
        }}
      >
        <Grid
          container
          mx={5}
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid
            item
            px={3}
            // style={{ justifyContent: "center", textAlign: "center" }}
          >
            <Typography
              style={{
                fontSize: 20,
                padding: 20,
                fontWeight: "bold",
              }}
            >
              Generate Reports
            </Typography>
          </Grid>
          <Grid item px={4} style={{ justifyContent: "center" }}>
            <div>
              <Button
                variant="primary"
                className={classes.button}
                onClick={handleOpen}
                style={{ justifyContent: "center", marginLeft: "10" }}
              >
                Select Type
              </Button>
              <FormControl className={classes.formControl}>
                <InputLabel id="report" className={classes.formControl}>
                  Reports
                </InputLabel>
                <Select
                  labelId="report"
                  id="report"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={type}
                  onChange={handleChange}
                  // fullWidth
                >
                  <MenuItem value={"orders"}>Orders Report</MenuItem>
                  <MenuItem value={"transactions"}>
                    Transactions Report
                  </MenuItem>
                  {/* <MenuItem value={"users"}>Users Report</MenuItem> */}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid
            item
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <Typography> Start Date:</Typography>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              // isClearable
              showYearDropdown
              placeholderText="select start date"
              required
              scrollableYearDropdown
            />
            <Typography>End Date: </Typography>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              // isClearable
              placeholderText="select end date"
              required
              showYearDropdown
              scrollableYearDropdown
              style={{ borderColor: "lightGrey", padding: 20 }}
            />
          </Grid>
          {
            (() => {
              if (type === "orders")
                return (
                  <Grid
                    item
                    ml={5}
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      marginTop: 20,
                    }}
                  >
                    <Button
                      variant="filled"
                      className={classes.button}
                      // onClick={handleOpen}
                      style={{
                        marginBottom: 10,
                        backgroundColor: "#24aff0",
                      }}
                    >
                      <AsyncCSV data={props.orders} />
                    </Button>
                  </Grid>
                );
              if (type === "transactions")
                return (
                  <Grid
                    item
                    ml={5}
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      marginTop: 20,
                    }}
                  >
                    <Button
                      variant="filled"
                      className={classes.button}
                      onClick={handleOpen}
                      style={{
                        marginBottom: 10,
                        // alignSelf: "center",
                        backgroundColor: "#24aff0",
                      }}
                    >
                      <TransactionReport data={props.transactions} />
                    </Button>
                  </Grid>
                );
              else type = "users";
              return <span>Three</span>;
            })()
            // (type = "orders" ? (
            //   <Grid
            //     item
            //     px={4}
            //     style={{ justifyContent: "center", paddingLeft: "25%" }}
            //   >
            //     <Button
            //       variant="outlined"
            //       className={classes.button}
            //       onClick={handleOpen}
            //       style={{ marginBottom: 10 }}
            //     >
            //       <AsyncCSV data={props.orders} />
            //     </Button>
            //   </Grid>
            // ) : (
            //   <Grid
            //     item
            //     px={4}
            //     style={{ justifyContent: "center", paddingLeft: "25%" }}
            //   >
            //     <Button
            //       variant="filled"
            //       className={classes.button}
            //       onClick={handleOpen}
            //       style={{ marginBottom: 10 }}
            //     >
            //       <TransactionReport data={props.transactions} />
            //     </Button>
            //   </Grid>
            // ))
          }
        </Grid>
      </Container>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (startDate, endDate) => {
      dispatch(getFilterOrder(startDate, endDate));
    },
    getTransactions: (startDate, endDate) => {
      dispatch(getFilterTransaction(startDate, endDate));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    orders: state.order.orderlist,
    transactions: state.transaction.transactionlist,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles)
)(Sales);
