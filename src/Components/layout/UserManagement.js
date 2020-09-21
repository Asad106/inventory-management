/** @format */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
const userList = [
  {
    id: 1,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));
function UserManagement() {
  const classes = useStyles();
  return (
    <div className>
      <h4 className='center grey-text text-darken-3'>User Management</h4>

      <div class='divider'></div>
      <Link className='link'>
        <div class='user-container'>
          <div className='display-container'>
            <Avatar
              alt='T'
              src='/static/images/avatar/1.jpg'
              className={classes.large}
            />
          </div>
          <div className='user-content'>
            <h5>Tarun Kumar</h5>
            <p>tkumar@gmail.com</p>
            <p>Last signed in time : 24 September, 5PM</p>
          </div>
          <div className=''>
            <a class='waves-effect waves-light btn'>Block</a>
          </div>
        </div>
      </Link>

      <div class='divider'></div>
      <Link className='link'>
        <div class='user-container'>
          <div className='display-container'>
            <Avatar
              alt='D'
              src='/static/images/avatar/1.jpg'
              className={classes.large}
            />
          </div>
          <div className='user-content'>
            <h5>David Batero</h5>
            <p>dbatero@live.com</p>
            <p>Last signed in time : 2nd September, 2AM</p>
          </div>
          <div className=''>
            <a class='waves-effect waves-light btn'>Block</a>
          </div>
        </div>
      </Link>

      <div class='divider'></div>
      <Link className='link'>
        <div class='user-container'>
          <div className='display-container'>
            <Avatar
              alt='J'
              src='/static/images/avatar/1.jpg'
              className={classes.large}
            />
          </div>
          <div className='user-content'>
            <h5>John Doe</h5>
            <p>John_Doe@gmail.com</p>
            <p>Last signed in time : 10 October, 10AM</p>
          </div>
          <div className=''>
            <a class='waves-effect waves-light btn'>Block</a>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UserManagement;
