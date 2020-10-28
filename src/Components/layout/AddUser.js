import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  FormControlLabel,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import ImageUpload from "../common/ImageUpload";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
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
}));

const AddInventory = (props) => {
  console.log(props);
  const id = props.match.params.id;
  const classes = useStyles();
  let [user, setUser] = useState({
    name: "",
    phoneNo: "",
    address: "",
    image: "",
    status: "false",
  });
  const setImageLink = (imageLink) => {
    setUser({ ...user, imageLink });
  };
  //   useEffect(() => {
  //     if (id) {
  //       props.getInventoryById(id);
  //     }
  //   }, [id]);

  //   useEffect(() => {
  //     if (props.inventory) {
  //       setInventory(props.inventory);
  //     }
  //   }, [props.inventory]);
  const handleCancel = () => {
    // props.refresh();
    console.log(props.history);
    props.history.push("/addUser");
  };
  const handleCheck = (event) => {
    setUser({ ...user, [event.target.name]: event.target.checked });
  };
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    console.log(user);
    // handleValidations();
    // if (id) {
    //   console.log("+++++++++++++++++++++++++++>>>>>>");
    //   props.updateInventory(inventory, props.history, id);
    // } else {
    //   console.log("-------------------------------->>>>>>");
    //   props.submitInventory(inventory, props.history);
    // }
  };
  //   const handleValidations = () => {
  //     if (
  //       inventory.productName == "" ||
  //       inventory.productType == "" ||
  //       inventory.price < 0 ||
  //       inventory.pricePerUnit < 0
  //     ) {
  //       return toast.error("please ender valid data of a product");
  //     }
  //   };
  return (
    <Box mx={2}>
      <Box className={classes.header} py={1} px={2}>
        <Typography variant="h6">Add User</Typography>
      </Box>
      <Container className={classes.formContainer}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              label="User Name"
              name="name"
              value={user.name}
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
              className={classes.inputField}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Phone Number"
              name="phoneNo"
              value={user.phoneNo}
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
              className={classes.inputField}
            />
          </Grid>
          <Grid item>
            <TextField
              label="User Address"
              name="address"
              value={user.address}
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
              className={classes.inputField}
            />
          </Grid>
          <Grid container>
            <Grid item justify="center">
              <Checkbox
                name={"status"}
                value={user.status}
                onClick={handleCheck}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
            <Grid item>
              <Typography
                color="textSecondary"
                style={{ fontSize: 16, marginTop: 10 }}
              >
                InActive
              </Typography>
            </Grid>
          </Grid>
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
        {/* </Grid> */}
      </Container>
    </Box>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     inventory: state.inventory.dataObj,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     submitInventory: (inventory, history) => {
//       dispatch(addInventory(inventory, history));
//     },
//     getInventoryById: (id) => {
//       dispatch(getInventoryById(id));
//     },
//     updateInventory: (inventory, history, id) => {
//       dispatch(updateInventoryById(inventory, history, id));
//     },
//     refresh: () => {
//       dispatch(refreshControl());
//     },
//   };
// };
export default AddInventory;
// export default compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   withStyles(Styles)
// )(AddInventory);
