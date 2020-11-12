import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, InputBase, Box, Button } from "@material-ui/core";
import { Add as AddIcon, Search as SearchIcon } from "@material-ui/icons";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "rgba(0, 0, 0, 0.54)",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: "1px solid rgba(0, 0, 0, 0.12)",
    backgroundColor: "#FFFFFF",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
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
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "100%",
  },
}));

function ListViewHeaderWithoutAddButton({
  title,
  btnLabel,
  btnLink,
  history,
  searchHandler,
}) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h6" style={{ paddingBottom: "10px" }}>
        {title}
      </Typography>
      <Grid container className={classes.header} justify="space-between">
        <Grid item sm={4}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <div style={{ display: "flex" }}>
              <InputBase
                onBlur={searchHandler}
                placeholder="Search by Name"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
              <Button
                variant="filled"
                color="secondary"
                className={classes.button}
                style={{
                  fontSize: 12,
                  color: "white",
                  backgroundColor: "#817aff",
                }}
                // onClick={loadSearch}
              >
                search
              </Button>
            </div>
          </div>
        </Grid>
        {}
        {/* <Grid item>
          <Button
            variant="outlined"
            color="primary"
            endIcon={<AddIcon />}
            className={classes.button}
            onClick={() => history.push(btnLink)}
          >
            {btnLabel}
          </Button>
        </Grid> */}
      </Grid>
    </Box>
  );
}

export default withRouter(ListViewHeaderWithoutAddButton);
