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
import {getFeedBackCount} from "../../redux/actions/feedbackActions";
import {getProblemCount} from "../../redux/actions/problemActions";
import {getSolvedProblemCount} from "../../redux/actions/solvedproblemActions";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Row, Col, Tab, Tabs, Modal } from "react-bootstrap";

const Styles = (theme) => ({
  root: {
    flexGrow: 1,
    color: "rgba(0, 0, 0, 0.54)",
  },
  root1: {
    minWidth: 275,
  },
  internal: {
    backGroundColor: "#FFFFFF",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
  useEffect(() => {
    props.getFeedBackCount();
  }, []);
  useEffect(() => {
    props.getProblemCount();
  }, []);
  useEffect(() => {
    props.getSolvedProblemCount();
  }, []);
  
  const bull = <span className={classes.bullet}>•</span>;
  console.log(props.activeUser);
  return (
    <Container>
      <Box mx={2} className={classes.root}>
        <Typography variant="h6" style={{ paddingBottom: "10px" }}>
          DashBoard
        </Typography>
      </Box>
      <Grid container direction="row" justify="space-between">
        <Card className={classes.root1}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              App Feedbacks
            </Typography>
            <Typography variant="h5" component="h2">
              {props.feedbackcount}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {/* adjective */}
            </Typography>
            <Typography variant="body2" component="p">
              {/* well meaning and kindly.
          <br />
          {'"a benevolent smile"'} */}
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
        <Card className={classes.root1}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Problems
            </Typography>
            <Typography variant="h5" component="h2">
              {props.problemcount}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {/* adjective */}
            </Typography>
            <Typography variant="body2" component="p">
              {/* well meaning and kindly.
          <br />
          {'"a benevolent smile"'} */}
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
        <Card className={classes.root1}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Solved Problems
            </Typography>
            <Typography variant="h5" component="h2">
              {props.solvedproblemcount}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {/* adjective */}
            </Typography>
            <Typography variant="body2" component="p">
              {/* well meaning and kindly.
          <br />
          {'"a benevolent smile"'} */}
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </Grid>
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
    getFeedBackCount:()=>{
      dispatch(getFeedBackCount());
    },
    getProblemCount:()=>{
      dispatch(getProblemCount());
    },
    getSolvedProblemCount:()=>{
      dispatch(getSolvedProblemCount());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    orders: state.order.orderlist,
    activeUser: state.user.userList,
    transactions: state.transaction.transactionlist,
    feedbackcount:state.feedback.feedbackcount,
    problemcount:state.problem.problemcount,
    solvedproblemcount:state.solvedproblem.solvedproblemcount
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles)
)(Dashboard);
