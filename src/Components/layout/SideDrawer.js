/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import SettingsIcon from "@material-ui/icons/Settings";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import PeopleIcon from "@material-ui/icons/People";
import StoreMallDirectoryIcon from "@material-ui/icons/StoreMallDirectory";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AssessmentIcon from "@material-ui/icons/Assessment";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#2E3B55",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  customizeToolbar: {
    minHeight: 45,
  },
}));

const itemList1 = [
  {
    id: 1,
    text: "Dashboard",
    icon: <DashboardIcon />,
    url: "/",
  },
  {
    id: 2,
    text: "Statistics",
    icon: <AssessmentIcon />,
    url: "/Statistics",
  },
  {
    id: 3,
    text: "Sales & Reports",
    icon: <TrendingDownIcon />,
    url: "/Sales",
  },
  {
    id: 4,
    text: "Resolution Center",
    icon: <BusinessCenterIcon />,
    url: "/Resolution",
  },
];

const itemList2 = [
  {
    id: 5,
    text: "User Management",
    icon: <PeopleIcon />,
    url: "/Usermanagement",
  },
  {
    id: 6,
    text: "Inventory Management",
    icon: <StoreMallDirectoryIcon />,
    url: "/Inventory",
  },
  {
    id: 7,
    text: "Finanical Management",
    icon: <AttachMoneyIcon />,
    url: "/Financial",
  },
];
const itemList3 = [
  {
    id: 8,
    text: "Settings",
    icon: <SettingsIcon />,
    url: "/settings",
  },
  {
    id: 9,
    text: "Logout",
    icon: <ExitToAppIcon />,
    url: "/logout",
  },
];

function SideDrawer(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.customizeToolbar}>
          <Typography variant='h6' noWrap>
            <Link to='/' className='admin-dashboard'>
              Peerdrop Admin Dashboard
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}>
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {itemList1.map((item) => {
              const { text, url, icon, id } = item;

              return (
                <Link to={url} key={id}>
                  <ListItem button>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText secondary={text} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
          <Divider />
          <List>
            {itemList2.map((item) => {
              const { text, icon, url, id } = item;

              return (
                <Link to={url} key={id}>
                  <ListItem button>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText secondary={text} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
          <Divider />
          <List>
            {itemList3.map((item) => {
              const { text, icon, url, id } = item;
              if (text === "Logout") {
                return (
                  <a key={id} onClick={props.signOut}>
                    <ListItem button>
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText secondary={text} />
                    </ListItem>
                  </a>
                );
              } else {
                return (
                  <Link to={url} key={id}>
                    <ListItem button>
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText secondary={text} />
                    </ListItem>
                  </Link>
                );
              }
            })}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {
      dispatch(signOut());
    },
  };
};

export default connect(null, mapDispatchToProps)(SideDrawer);

//export default SideDrawer;
