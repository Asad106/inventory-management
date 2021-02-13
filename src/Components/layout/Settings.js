/** @format */

import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { resetPassword } from "../../redux/actions/authActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "firebase";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import img from "../../assets/header.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: "#ffffff",
    padding: theme.spacing(1),
    color: "white",
    borderRadius: "20px",
  },
}));

function Settings(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleResets = () => {
    if (email) {
      props.resetPassword(email);
      toast.success(props.message);
    }
  };
  const handleReset = () => {
    props.resetPassword(props.auth.email);
    toast.success(props.message);
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <Box mx={4} style={{ backgroundColor: "white" }}>
        <Typography variant="h6" style={{ padding: "10px" }}>
          Settings
        </Typography>
      </Box>
      <div
        style={{
          textAlign: "center",
          paddingLeft: "18%",
          paddingRight: "18%",
          paddingTop: "5%",
        }}
      >
        <Card className={classes.root}>
          <CardContent>
            <Typography
              color="textSecondary"
              gutterBottom
              style={{ color: "#4836ba", fontSize: 22, fontWeight: "300" }}
            >
              You can reset your password here .
            </Typography>
            <img
              src={img}
              alt="lock_img"
              style={{ height: 150, paddingTop: 10 }}
            />
          </CardContent>
          <CardActions>
            {props.auth.email ? (
              <Button
                variant="contained"
                size={"small"}
                color="primary"
                onClick={handleClickOpen}
                style={{ margin: "auto" }}
              >
                Change Password
              </Button>
            ) : (
              <Button
                variant="contained"
                size={"small"}
                color="primary"
                onClick={handleClickOpen}
                style={{ margin: "auto" }}
              >
                Reset Password
              </Button>
            )}
          </CardActions>
          <>
            {!props.auth.email ? (
              <Link
                to="/signin"
                variant="body2"
                style={{ color: "blue", marginTop: 10 }}
              >
                Back to Login
              </Link>
            ) : (
              ""
            )}
          </>
        </Card>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>

          <DialogContent>
            {props.auth.email ? (
              <DialogContentText>
                You will recieve password reset link on
              </DialogContentText>
            ) : (
              <DialogContentText>
                Please provide a valid email to reset password
              </DialogContentText>
            )}

            {props.auth.email ? (
              <Typography
                style={{ color: "blue", fontSize: 16, marginTop: 10 }}
              >
                {props.auth.email}
              </Typography>
            ) : (
              <TextField
                autoFocus
                margin="dense"
                name="email"
                value={email}
                label="Email Address"
                type="email"
                fullWidth
                onChange={handleChange}
              />
            )}
          </DialogContent>
          <DialogActions style={{ marginTop: 20 }}>
            <Button onClick={handleClose} variant={"contained"} color="default">
              Cancel
            </Button>
            {props.auth.email ? (
              <Button onClick={handleReset} variant="contained" color="primary">
                Reset
              </Button>
            ) : (
              <Button
                onClick={handleResets}
                variant="contained"
                color="primary"
              >
                Reset
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (email) => {
      dispatch(resetPassword(email));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    message: state.auth.authError,
    auth: state.firebase.auth,
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Settings);
