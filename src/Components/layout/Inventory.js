import React, { useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { compose } from "redux";
import { connect } from "react-redux";
import { GetInventory } from "../../redux/actions/inventoryActions";
import {
  Typography,
  AppBar,
  Popover,
  Toolbar,
  InputBase,
  Box,
  Fab,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import InventoryCard from "./InventoryCard";
import { withStyles } from "@material-ui/core/styles";

const Styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  popover: {
    pointerEvents: "none",
  },
  fab: {
    position: "fixed",
    top: 112,
    right: 50,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    color: "grey",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
});

function Inventory(props) {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    // props.getInventories();
    props.getInventories();
  }, []);
  console.log(props.inventories);
  return (
    <Box mx={2}>
      <Typography
        variant={"h6"}
        style={{ fontWeight: "bold" }}
        className={classes.paper}
      >
        Inventory
      </Typography>
      <Grid container>
        <Grid item>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Grid>
        <Grid item>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <AddIcon />
          </Fab>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography>Add Inventory.</Typography>
          </Popover>
          <Toolbar />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {props.inventories.map((val, index) => (
          <Grid item md={4}>
            <InventoryCard item={val} key={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    getInventories: () => {
      dispatch(GetInventory());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    inventories: state.inventory.data,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles)
)(Inventory);
