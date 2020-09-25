/** @format */

import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
} from "@material-ui/core";

function SignInn() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };
  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailOnChange = (e) => {
    setUserEmail(e.target.value);
  };

  return (
    <div>
      <Grid container spacing={0} justify='center' direction='row'>
        <Grid item>
          <Grid
            container
            direction='column'
            justify='center'
            spacing={2}
            className='login-form'>
            <Paper
              variant='elevation'
              elevation={3}
              className='login-background'>
              <Grid item>
                <Typography component='h1' variant='h5'>
                  Sign in
                </Typography>
              </Grid>

              <form onSubmit={handleSubmit}>
                <Grid container direction='column' spacing={4}>
                  <Grid item>
                    <TextField
                      id='outlined-basic'
                      label='Email'
                      variant='outlined'
                      type='email'
                      placeholder='Email'
                      name='email'
                      value={userEmail}
                      onChange={handleEmailOnChange}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id='outlined-basic'
                      label='Password'
                      variant='outlined'
                      type='password'
                      placeholder='Password'
                      name='password'
                      value={password}
                      onChange={handlePasswordOnChange}
                      required
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      className='button-block'>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>

              <Grid item>
                <Link href='#' variant='body2'>
                  Forgot Password?
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignInn;
