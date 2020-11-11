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
    width: "100%",
  },
});
const initialUser = {
  name: "",
  email: "",
  password: "",
  phoneNo: "",
  address: "",
  imageLink: "",
  status: "Active",
  erroremail: "",
  errorpassword: "",
  errorphoneNo: "",
};

const AddUser = (props) => {
  const id = props.match.params.id;
  const { classes } = props;
  const [user, setUser] = useState(initialUser);
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
    console.log(imageLink);
    setUser({ ...user, imageLink });
  };

  const handleCancel = (e) => {
    props.refresh();
    props.history.push("/user");
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let erroremail = "";
    let errorpassword = "";
    let errorphoneNo = "";
    // email validation
    if (
      !user.email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) ||
      user.email === ""
    ) {
      erroremail = "please provide a valid email ";
    }
    if (erroremail) {
      setUser({ ...user, erroremail });
      return false;
    }
    // password validation
    if (user.password.length < 8 || user.password.length === "") {
      errorpassword = "password should be minimum 8 characters ";
    }
    if (errorpassword) {
      setUser({ ...user, errorpassword });
      return false;
    }
    // phone validation
    var phoneno = /^\d{15}$/;
    if (!user.phoneNo.match(phoneno) || user.phoneNo === "") {
      errorphoneNo = "plz provide valid phone number ";
    }
    if (errorphoneNo) {
      setUser({ ...user, errorphoneNo });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    console.log("user is ", user);
    if (id) {
      console.log("user should be apdated");
      props.updateUser(user, props.history, id);
    } else {
      const isValid = validate();
      if (isValid) {
        console.log("in valid data");
        props.submitUser(user, props.history);
        setUser(initialUser);
      }
    }
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
                // fullWidth
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
                // fullWidth
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
                // fullWidth
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
                // fullWidth
                required
                onChange={handleChange}
                className={classes.inputField}
              />
            )}
            <div style={{ color: "red", fontSize: 14, margin: 5 }}>
              {user.erroremail}
            </div>
          </Grid>
          <Grid item>
            {id ? (
              <TextField
                type="password"
                label="Password"
                name="password"
                value={user.password}
                variant="outlined"
                // fullWidth
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
                // fullWidth
                required
                onChange={handleChange}
                className={classes.inputField}
              />
            )}
            <div style={{ color: "red", fontSize: 12 }}>
              {user.errorpassword}
            </div>
          </Grid>
          <Grid item style={{ marginTop: 10 }}>
            {id ? (
              <TextField
                label=" Address"
                name="address"
                value={user.address}
                variant="outlined"
                // fullWidth
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
                // fullWidth
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
                // fullWidth
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
                // fullWidth
                required
                onChange={handleChange}
                className={classes.inputField}
              />
            )}
            <div style={{ color: "red", fontSize: 12 }}>
              {user.errorphoneNo}
            </div>
          </Grid>
          <Grid item px={5}>
            <FormControl className={classes.inputField}>
              <InputLabel id="Status" className={classes.inputField}>
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
