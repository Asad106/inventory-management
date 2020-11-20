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
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    color: "blueGrey",
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
  const handleReset = () => {
    if (email != "" && email != auth.email) {
      props.resetPassword(email);
      toast.success(props.message);
    } else {
      toast.error("no such email is found");
    }
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  console.log("messeage", props.auth.email);
  return (
    <>
      <div className={classes.root}>{"You can reset your password here"}</div>
      <div style={{ textAlign: "center", paddingTop: "30px" }}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Change Password
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>

          <DialogContent>
            <DialogContentText>
              You will recieve password reset link on
            </DialogContentText>
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
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
            <Button onClick={handleReset} variant="contained" color="primary">
              Reset
            </Button>
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
