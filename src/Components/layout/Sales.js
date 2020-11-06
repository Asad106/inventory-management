/** @format */

import React, { useEffect } from "react";
import AsyncCSV from "./GeneratePdf";
import ListViewHeaderWithoutAddButton from "../common/ListViewHeaderWithoutAddButton";
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
import { getOrders } from "../../redux/actions/orderActions";

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
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    props.getOrders();
  }, []);
  console.log(props.orders);
  const handleChange = (event) => {
    setAge(event.target.value);
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
      <Container style={{ width: "50%" }}>
        <Grid
          container
          px={5}
          mx={5}
          justify="center"
          style={{
            borderColor: "rgba(0, 0, 0, 0.54)",
            backgroundColor: "#FFFFFF",
            marginTop: 20,
            flexDirection: "column",
          }}
        >
          <Grid item sm={12} md={12} px={5}>
            <Typography
              style={{
                paddingLeft: "30%",
                fontSize: 16,
                paddingTop: 10,
                fontWeight: "bold",
              }}
            >
              Generate Reports
            </Typography>
          </Grid>
          <Grid item px={4}>
            <div style={{ justifyContent: "center", paddingLeft: "30%" }}>
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
                  value={age}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>Get Reports Here ...</em>
                  </MenuItem>
                  <MenuItem value={10}>Orders Report</MenuItem>
                  <MenuItem value={20}>Transactions Report</MenuItem>
                  <MenuItem value={30}>Users Report</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid
            item
            px={4}
            style={{ justifyContent: "center", paddingLeft: "25%" }}
          >
            <Button
              variant="outlined"
              className={classes.button}
              onClick={handleOpen}
              style={{ marginBottom: 10 }}
            >
              <AsyncCSV data={props.orders} />
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => {
      dispatch(getOrders());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    orders: state.order.orderlist,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles)
)(Sales);
