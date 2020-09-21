/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { signIn } from "../../redux/actions/authActions";
import Splash from "../../Splash";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  handleOnChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { authError } = this.props;

    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit} className='white'>
          <h5 className='grey-text text-darken-3'>Sign In</h5>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' onChange={this.handleOnChange} />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              onChange={this.handleOnChange}
            />
          </div>
          <div className='input-field'>
            <button className='btn pink lighten-1 z-depth-0'>Login</button>
            <div className='red-text center'>
              {authError ? <p>{authError} </p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
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
    signIn: (creds) => {
      dispatch(signIn(creds));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

//export default SignIn;
