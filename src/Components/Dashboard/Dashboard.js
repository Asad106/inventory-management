/** @format */

import React, { useState, useEffect } from "react";
import PieChart from "../common/PieCharts";
import BarChart from "../common/BarChart";
import TransactionChart from "../common/TransactionChart";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { getOrdersDate } from "../../redux/actions/orderActions";
import { withStyles } from "@material-ui/core/styles";
import { getActiveUsers } from "../../redux/actions/userActions";
import { getTransactionDate } from "../../redux/actions/transactionActions";

const Styles = (theme) => ({
  root: {
    flexGrow: 1,
    color: "rgba(0, 0, 0, 0.54)",
  },
  internal: {
    backGroundColor: "#FFFFFF",
  },
});

function Dashboard(props) {
  const { classes } = props;
  useEffect(() => {
    props.getOrders();
    // props.getActiveUser();
  }, []);
  useEffect(() => {
    props.getActiveUser();
  }, []);
  useEffect(() => {
    props.getTransactions();
  }, []);
  return (
    <Container>
      <Box mx={2} className={classes.root}>
        <Typography variant="h6" style={{ paddingBottom: "10px" }}>
          DashBoard
        </Typography>
      </Box>
      {props.orders && props.orders.length > 0 && (
        <Grid container my={2} spacing={2} px={2} justify="center">
          <Grid item sm={12} md={6}>
            <Typography
              variant={"h6"}
              style={{ textAlign: "center", color: "#b8b6b2" }}
            >
              Orders of last 30 days
            </Typography>
            <BarChart orders={props.orders} />
          </Grid>
          <Grid item sm={12} md={6}>
            <Typography
              variant={"h6"}
              style={{ textAlign: "center", color: "#b8b6b2" }}
            >
              Active Users
            </Typography>
            <PieChart ActiveUsers={props.activeUser} />
          </Grid>
          <Grid item sm={12} md={6}>
            <Typography
              variant={"h6"}
              style={{ textAlign: "center", color: "#b8b6b2" }}
            >
              Transaction/Commission
            </Typography>
            <TransactionChart transactions={props.transactions} />
          </Grid>
          <Grid item sm={12} md={6}>
            {/* <PieChart orders={props.orders} /> */}asvdavdavd
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => {
      dispatch(getOrdersDate());
    },
    getActiveUser: () => {
      dispatch(getActiveUsers());
    },
    getTransactions: () => {
      dispatch(getTransactionDate());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    orders: state.order.orderlist,
    activeUser: state.user.userList,
    transactions: state.transaction.transactionlist,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles)
)(Dashboard);
