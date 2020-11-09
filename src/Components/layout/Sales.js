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
    color: "green",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
  console.log("asasaass" + startDate, "sasasasas" + endDate);
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
    <Box mx={2} className={classes.root}>
      <Typography variant="h6" style={{ paddingBottom: "10px" }}>
        Sales & Reports
      </Typography>
      <Container style={{ width: "60%", padding: 10 }}>
        <Grid
          container
          mx={5}
          justify="center"
          style={{
            borderColor: "rgba(0, 0, 0, 0.54)",
            backgroundColor: "#FFFFFF",
            marginTop: 20,
            flexDirection: "column",
            borderRadius: 20,
            paddingLeft: "30%",
          }}
        >
          <Grid
            item
            px={3}
            // style={{ justifyContent: "center", textAlign: "center" }}
          >
            <Typography
              style={{
                fontSize: 16,
                padding: 16,
                fontWeight: "bold",
              }}
            >
              Generate Reports
            </Typography>
          </Grid>
          <Grid item px={4} justify={"center"}>
            <div>
              <Button
                variant="primary"
                className={classes.button}
                onClick={handleOpen}
              >
                Select Type
              </Button>
              <FormControl className={classes.formControl}>
                <InputLabel id="report">Reports</InputLabel>
                <Select
                  labelId="report"
                  id="report"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={type}
                  onChange={handleChange}
                >
                  <MenuItem value={"orders"}>Orders Report</MenuItem>
                  <MenuItem value={"transactions"}>
                    Transactions Report
                  </MenuItem>
                  <MenuItem value={"users"}>Users Report</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item>
            <Typography>From : </Typography>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              // isClearable
              showYearDropdown
              required
              scrollableYearDropdown
              style={{ borderColor: "lightGrey" }}
            />
            <Typography>To : </Typography>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              // isClearable
              required
              showYearDropdown
              scrollableYearDropdown
              style={{ borderColor: "lightGrey" }}
            />
          </Grid>
          {
            (() => {
              if (type === "orders")
                return (
                  <Grid item px={4} style={{ textAlign: "center" }}>
                    <Button
                      variant="filled"
                      className={classes.button}
                      // onClick={handleOpen}
                      style={{
                        marginBottom: 10,
                        backgroundColor: "#3f51b5",
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
                    px={4}
                    // style={{ justifyContent: "center", textAlign: "center" }}
                  >
                    <Button
                      variant="filled"
                      className={classes.button}
                      onClick={handleOpen}
                      style={{
                        marginBottom: 10,
                        alignSelf: "center",
                        backgroundColor: "#ffffff",
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
