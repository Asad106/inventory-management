import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { compose } from "redux";
import { connect } from "react-redux";
import { Box, Typography, Button, Grid, Container } from "@material-ui/core";
import {
  addInventory,
  getInventoryById,
  refreshControl,
  updateInventoryById,
} from "../../redux/actions/inventoryActions";
import { withStyles } from "@material-ui/core/styles";
import ImageUpload from "../common/ImageUpload";
import { toast } from "react-toastify";

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
  console.log(props.match.params);
  const { classes } = props;
  let [inventory, setInventory] = useState({
    productName: "",
    productType: "",
    price: 0.0,
    pricePerUnit: 0.0,
    unit: "",
    imageLink: "",
  });
  const setImageLink = (imageLink) => {
    setInventory({ ...inventory, imageLink });
  };
  useEffect(() => {
    if (id) {
      props.getInventoryById(id);
    }
  }, [id]);

  useEffect(() => {
    if (props.inventory) {
      setInventory(props.inventory);
    }
  }, [props.inventory]);
  const handleCancel = () => {
    props.refresh();
    props.history.push("/inventory");
  };

  const handleChange = (e) => {
    setInventory({
      ...inventory,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    console.log(props.inventory);
    handleValidations();
    if (id) {
      console.log("+++++++++++++++++++++++++++>>>>>>");
      props.updateInventory(inventory, props.history, id);
    } else {
      console.log("-------------------------------->>>>>>");
      props.submitInventory(inventory, props.history);
    }
  };
  const handleValidations = () => {
    if (
      inventory.productName == "" ||
      inventory.productType == "" ||
      inventory.price < 0 ||
      inventory.pricePerUnit < 0
    ) {
      return toast.error("please ender valid data of a product");
    }
  };
  console.log(inventory);
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
              required
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
              required
              onChange={handleChange}
              className={classes.inputField}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Product Price"
              name="price"
              value={inventory.price}
              type="number"
              variant="outlined"
              fullWidth
              required
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
              required
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
              required
              onChange={handleChange}
              className={classes.inputField}
            />
            <Grid item>
              <ImageUpload imageHandler={setImageLink} />
            </Grid>
          </Grid>

          <Grid
            container
            justify="center"
            spacing={2}
            style={{ marginTop: "10px" }}
          >
            <Grid item>
              <Button variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              {id ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  update
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  save
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    inventory: state.inventory.dataObj,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitInventory: (inventory, history) => {
      dispatch(addInventory(inventory, history));
    },
    getInventoryById: (id) => {
      dispatch(getInventoryById(id));
    },
    updateInventory: (inventory, history, id) => {
      dispatch(updateInventoryById(inventory, history, id));
    },
    refresh: () => {
      dispatch(refreshControl());
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles)
)(AddInventory);
