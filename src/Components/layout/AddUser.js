import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  AppBar,
  Toolbar,
  Avatar,
} from "@material-ui/core";
import ImageUpload from "../common/ImageUpload";
import { Link } from "react-router-dom";
import {
  addUser,
  getUserById,
  refreshControl,
  updateUserById,
} from "../../redux/actions/userActions";

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
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    paddingTop: "20px",
    paddingBottom: "15px",
    width: "60%",
  },
  inputField: {
    marginBottom: "10px",
  },
});

const AddUser = (props) => {
  const id = props.match.params.id;
  const { classes } = props;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    address: "",
    imageLink: "",
    status: "Active",
  });
  useEffect(() => {
    // console.log(props.user);
    if (props.user) {
      setUser(props.user);
      console.log(props.user);
    }
  }, [props.user]);
  useEffect(() => {
    if (id) {
      props.getUserById(id);
    }
  }, [id]);
  const setImageLink = (imageLink) => {
    setUser({ ...user, imageLink });
  };

  const handleCancel = (e) => {
    props.refresh();
    console.log(props.history);
    props.history.push("/userManagement");
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    if (id) {
      props.updateUser(user, props.history, id);
    }
    props.submitUser(user, props.history);
  };
  return (
    <Box mx={2}>
      <Box className={classes.header} mt={2} py={1} px={3}>
        <Typography variant="h6">Add User</Typography>
      </Box>
      {id && (
        <Box mt={2} style={{ display: "flex", justifyContent: "center" }}>
          <Avatar
            alt=" userProfile"
            src={user.imageLink}
            style={{ width: 100, height: 100 }}
          />
        </Box>
      )}

      <Container className={classes.formContainer}>
        <Grid container direction="column">
          <Grid item>
            {id ? (
              <TextField
                label="Name"
                name="name"
                value={user.name}
                variant="outlined"
                fullWidth
                disabled
                required
                onChange={handleChange}
                className={classes.inputField}
              />
            ) : (
              <TextField
                label="Name"
                name="name"
                value={user.name}
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                className={classes.inputField}
              />
            )}
          </Grid>
          <Grid item>
            {id ? (
              <TextField
                label="Email Address"
                name="email"
                value={user.email}
                variant="outlined"
                fullWidth
                disabled
                required
                onChange={handleChange}
                className={classes.inputField}
              />
            ) : (
              <TextField
                label="Email Address"
                name="email"
                value={user.email}
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                className={classes.inputField}
              />
            )}
          </Grid>
          <Grid item>
            {id ? (
              <TextField
                type="password"
                label="Password"
                name="password"
                value={user.password}
                variant="outlined"
                fullWidth
                disabled
                required
                onChange={handleChange}
                className={classes.inputField}
              />
            ) : (
              <TextField
                type="password"
                label="Password"
                name="password"
                value={user.password}
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                className={classes.inputField}
              />
            )}
          </Grid>
          <Grid item style={{ marginTop: 10 }}>
            {id ? (
              <TextField
                label=" Address"
                name="address"
                value={user.address}
                variant="outlined"
                fullWidth
                disabled
                required
                onChange={handleChange}
                className={classes.inputField}
              />
            ) : (
              <TextField
                label=" Address"
                name="address"
                value={user.address}
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                className={classes.inputField}
              />
            )}
          </Grid>
          <Grid item>
            {id ? (
              <TextField
                label="Phone No#"
                name="phoneNo"
                value={user.phoneNo}
                variant="outlined"
                fullWidth
                disabled
                required
                onChange={handleChange}
                className={classes.inputField}
              />
            ) : (
              <TextField
                label="Phone No#"
                name="phoneNo"
                value={user.phoneNo}
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                className={classes.inputField}
              />
            )}
          </Grid>
          <Grid item px={5}>
            <FormControl className={classes.inputField}>
              <InputLabel fullWidth id="Status" className={classes.inputField}>
                Status
              </InputLabel>
              <Select
                labelId="Status"
                name="status"
                value={user.status}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"InActive"}>InActive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>{!id && <ImageUpload imageHandler={setImageLink} />}</Grid>

          <Grid item style={{ marginTop: 20 }}>
            {id ? (
              <Button
                style={{ marginLeft: "20%" }}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Update
              </Button>
            ) : (
              <Button
                style={{ marginLeft: "20%" }}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Add
              </Button>
            )}
            <Button
              style={{ marginLeft: "20%" }}
              variant="contained"
              color="default"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userObj,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitUser: (user, history) => {
      dispatch(addUser(user, history));
    },
    getUserById: (id) => {
      dispatch(getUserById(id));
    },
    updateUser: (user, history, id) => {
      dispatch(updateUserById(user, history, id));
    },
    refresh: () => {
      dispatch(refreshControl());
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles)
)(AddUser);
