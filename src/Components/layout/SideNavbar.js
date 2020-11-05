/** @format */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import {
  Dashboard,
  Assessment,
  TrendingDown,
  BusinessCenter,
  People,
  StoreMallDirectory,
  AttachMoney,
  AccountCircle,
} from "@material-ui/icons";

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  typography: {
    flex: 1,
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  contentArea: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
  },
});

const itemList1 = [
  {
    id: 1,
    text: "Home",
    icon: <Dashboard />,
    url: "/",
  },
  {
    id: 2,
    text: "Statistics",
    icon: <Assessment />,
    url: "/Statistics",
  },
  {
    id: 3,
    text: "Sales & Reports",
    icon: <TrendingDown />,
    url: "/Sales",
  },
  {
    id: 4,
    text: "Resolution Center",
    icon: <BusinessCenter />,
    url: "/Resolution",
  },
];

const itemList2 = [
  {
    id: 5,
    text: "User Management",
    icon: <People />,
    url: "/user",
  },
  {
    id: 6,
    text: "Inventory Management",
    icon: <StoreMallDirectory />,
    url: "/inventory",
  },
  {
    id: 7,
    text: "Orders",
    icon: <StoreMallDirectory />,
    url: "/orders",
  },
  {
    id: 8,
    text: "Transactions",
    icon: <StoreMallDirectory />,
    url: "/transactions",
  },
  {
    id: 9,
    text: "Finanical Management",
    icon: <AttachMoney />,
    url: "/Financial",
  },
];

class SideNavbar extends Component {
  state = {
    mobileOpen: false,
    anchorEl: null,
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
    //setAnchorEl(event.currentTarget);
  };

  handleLogout = () => {
    this.setState({ anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
    //setAnchorEl(null);
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  render() {
    const { children, classes, auth } = this.props;
    const { mobileOpen } = this.state;
    const open = Boolean(this.state.anchorEl);
    const drawer = (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>
        <List>
          {itemList1.map((item) => {
            const { text, url, icon, id } = item;
            return (
              <ListItem button component={Link} to={url} key={id}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText secondary={text} />
              </ListItem>
            );
          })}
        </List>
        <Divider />

        <List>
          {itemList2.map((item) => {
            const { text, url, icon, id } = item;
            return (
              <ListItem button component={Link} to={url} key={id}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText secondary={text} />
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </div>
    );

    return (
      <React.Fragment>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap className={classes.typography}>
                Peerdrop
              </Typography>
              <div>
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                    {auth && (
                      <MenuItem onClick={this.props.signOut}>Logout</MenuItem>
                    )}
                  </Menu>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.contentArea}>
            <Toolbar />
            {children}
          </main>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {
      dispatch(signOut());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(SideNavbar);

//export default withStyles(styles)(SideNavbar);
