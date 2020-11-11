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
const initInventory = {
  productName: "",
  productType: "",
  price: 0.0,
  pricePerUnit: 0.0,
  unit: "",
  imageLink: "",
  errorproductName: "",
  errorproductType: "",
  errorprice: 0.0,
  errorpricePerUnit: 0.0,
  errorunit: "",
};

const AddInventory = (props) => {
  const id = props.match.params.id;
  console.log(props.match.params);
  const { classes } = props;
  let [inventory, setInventory] = useState(initInventory);
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
  const validateInventory = () => {
    let errorproductName = "";
    let errorproductType = "";
    let errorprice = 0.0;
    let errorpricePerUnit = 0.0;
    let errorunit = "";
    //handle name validations
    if (inventory.productName === "") {
      errorproductName = "please provide a name of a product";
    }
    if (errorproductName) {
      setInventory({ ...inventory, errorproductName });
      return false;
    }
    //handle type validations
    if (inventory.productType === "") {
      errorproductType = "please provide a type of a product";
    }
    if (errorproductType) {
      setInventory({ ...inventory, errorproductType });
      return false;
    }
    //handle price validations
    if (inventory.price < 0) {
      errorprice = "price cannot be less than 0";
    }
    if (errorprice) {
      setInventory({ ...inventory, errorprice });
      return false;
    }
    //handle Unitprice validations
    if (inventory.pricePerUnit < 0) {
      errorpricePerUnit = "price cannot be less than 0";
    }
    if (errorpricePerUnit) {
      setInventory({ ...inventory, errorpricePerUnit });
      return false;
    }
    //handle type validations
    if (inventory.unit === "") {
      errorunit = "please provide a unit of a product";
    }
    if (errorunit) {
      setInventory({ ...inventory, errorunit });
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    // console.log(props.inventory);
    // handleValidations();
    if (id) {
      props.updateInventory(inventory, props.history, id);
    } else {
      const isValid = validateInventory();
      if (isValid) {
        props.submitInventory(inventory, props.history);
        setInventory(initInventory);
      }
    }
  };
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
            <div style={{ color: "red", fontSize: 14, margin: 5 }}>
              {inventory.errorproductName}
            </div>
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
            <div style={{ color: "red", fontSize: 14, margin: 5 }}>
              {inventory.errorproductType}
            </div>
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
            <div style={{ color: "red", fontSize: 14, margin: 5 }}>
              {inventory.errorprice}
            </div>
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
            <div style={{ color: "red", fontSize: 14, margin: 5 }}>
              {inventory.errorpricePerUnit}
            </div>
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
            <div style={{ color: "red", fontSize: 14, margin: 5 }}>
              {inventory.errorunit}
            </div>
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
