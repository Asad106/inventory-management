import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Input,
  Breadcrumbs,
  Grid,
  Container,
} from "@material-ui/core";
import {
  addInventory,
  getInventoryById,
} from "../../redux/actions/inventoryActions";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const Styles = (theme) => ({
  root: {
    minWidth: 275,
    flexWrap: "wrap",
  },

  margin: {
    margin: 5,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  header: {
    border: "1px solid rgba(0, 0, 0, 0.12)",
    background: "#FFFFFF",
    color: "rgba(0, 0, 0, 0.54)",
  },
  formContainer: {
    paddingTop: "20px",
    paddingBottom: "15px",
    width: "80%",
  },
  inputField: {
    marginBottom: "10px",
  },
});

const AddInventory = (props) => {
  const id = props.match.params.id;
  const { classes } = props;
  const [inventory, setInventory] = useState(
    props.inventory !== null
      ? props.inventory
      : {
          productName: "",
          productType: "",
          productPrice: 0.0,
          pricePerUnit: 0.0,
          unit: "",
        }
  );
  useEffect(() => {
    if (id) {
      console.log(props);
      const inventory = props.editInventory(id);
      console.log("getting  single data " + inventory);
      // const inventory = props.
    }
  }, [id]);
  const handleChange = (e) => {
    const name = e.target.value;
    console.log(name);
    setInventory({
      ...inventory,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    console.log(inventory);
    props.submitInventory(inventory, props.history);
  };

  console.log(props.inventory);
  return (
    <Box mx={2}>
      <Box className={classes.header} py={1} px={2}>
        <Typography variant="h6">Add Inventory</Typography>
      </Box>
      <Container className={classes.formContainer}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              label="Product Name"
              name="productName"
              value={inventory.productName}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              className={classes.inputField}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Product Type"
              name="productType"
              value={inventory.productType}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              className={classes.inputField}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Product Price"
              name="productPrice"
              value={inventory.productPrice}
              type="number"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              className={classes.inputField}
            />
          </Grid>
          <Grid item>
            <TextField
              name="pricePerUnit"
              value={inventory.pricePerUnit}
              label="Price Per Unit"
              type="number"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              className={classes.inputField}
            />
          </Grid>
          <Grid item>
            <TextField
              name="unit"
              value={inventory.unit}
              label="Unit"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              className={classes.inputField}
            />
          </Grid>
          <Grid
            container
            justify="center"
            spacing={2}
            style={{ marginTop: "10px" }}
          >
            <Grid item>
              <Button
                variant="contained"
                onClick={() => props.history.push("/inventory")}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    inventory: state.inventory.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitInventory: (inventory, history) => {
      dispatch(addInventory(inventory, history));
    },
    editInventory: (id) => {
      dispatch(getInventoryById(id));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles)
)(AddInventory);
