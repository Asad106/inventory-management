// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { signIn } from "../../redux/actions/authActions";

// class SignIn extends Component {
//   state = {
//     email: "",
//     password: "",
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();

//     this.props.signIn(this.state);
//   };
//   handleOnChange = (e) => {
//     this.setState({ [e.target.id]: e.target.value });
//   };

//   render() {
//     const { authError } = this.props;

//     return (
//       <div className="container">
//         <form onSubmit={this.handleSubmit} className="white">
//           <h5 className="grey-text text-darken-3">Sign In</h5>
//           <div className="input-field">
//             <label htmlFor="email">Email</label>
//             <input type="email" id="email" onChange={this.handleOnChange} />
//           </div>
//           <div className="input-field">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               onChange={this.handleOnChange}
//             />
//           </div>
//           <div className="input-field">
//             <div className="black-text center">
//               {authError ? (
//                 <h6>
//                   {authError === "auth/too-many-requests"
//                     ? "To many Invalid Attempts"
//                     : "Invalid Username/Password"}
//                 </h6>
//               ) : null}
//             </div>
//             <button className="btn pink lighten-1 z-depth-0">Login</button>
//           </div>
//           <h5 className="grey-text text-darken-3">
//             <a href="/setting">forget password</a>
//           </h5>
//         </form>
//       </div>
//     );
//   }
// }
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/authActions";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Peerdrop Admin Portal
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const [credstate, setCred] = React.useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setCred({ ...credstate, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn(credstate, props.history);
    setCred({ email: "", password: "" });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoFocus
            type="email"
            value={credstate.email}
            onChange={handleOnChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={credstate.password}
            label="Password"
            type="password"
            onChange={handleOnChange}
          />

          <div className="black-text center">
            {props.authError ? (
              <h6>
                {props.authError === "auth/too-many-requests"
                  ? "To many Invalid Attempts"
                  : "Invalid Username/Password"}
              </h6>
            ) : null}
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/setting" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    authError: state.auth.authError,
    isAuthenticated: state.auth.uid ? true : false,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (cred, history) => {
      dispatch(signIn(cred, history));
    },
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SignIn);

//export default SignIn;
