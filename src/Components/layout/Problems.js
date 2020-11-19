/** @format */

import React, { useEffect, useState } from "react";
import ListViewHeaderWithoutAddButton from "../common/ListViewHeaderWithoutAddButton";
import {
  Box,
  Button,
  Grid,
  InputBase,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import ProblemsData from "./ProblemsData";
import { compose } from "redux";
import { connect } from "react-redux";
import Pagination from "./Pagination";
import { getProblems, deleteProblem } from "../../redux/actions/problemActions";
import {
  getSolvedProblems,
  addProblemToSolution,
} from "../../redux/actions/solvedproblemActions";
import { withStyles } from "@material-ui/core/styles";
import SolutionsData from "./SolutionsData";

const Styles = (theme) => ({
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
    width: "80%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "80%",
  },
  header: {},
  extendedIcon: {
    marginRight: theme.spacing(0),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
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
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
});

function Problems(props) {
  const { classes } = props;
  const [showPerPage, setShowPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [filterdata, setFilterData] = useState("");
  const history = props.history;
  const [value, setValue] = React.useState(0);
  const [signal, setSignal] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    props.getProblems();
  }, []);
  useEffect(() => {
    props.getSolutions();
  }, []);
  useEffect(() => {
    props.getProblems();
  }, [signal]);
  useEffect(() => {
    props.getSolutions();
  }, [signal]);
  const onPageChange = (e) => {
    setShowPerPage(e.target.value);
    setPage(0);
  };
  const onBack = () => {
    if (page === 0) return;
    setPage(page - showPerPage);
  };
  const onForward = () => {
    setPage(page + showPerPage);
  };
  const searchHandler = (e) => {
    const searchValue = e.target.value;
    setPage(0);
    if (value === 0) {
      if (searchValue) {
        const filterResult = props.problems.filter((problem) =>
          problem.user_name.includes(searchValue)
        );

        setFilterData(filterResult);
      } else {
        setFilterData(props.problems);
      }
    } else {
      if (searchValue) {
        const filterResult = props.solutions.filter((solution) =>
          solution.user_name.includes(searchValue)
        );

        setFilterData(filterResult);
      } else {
        setFilterData(props.problems);
      }
    }
  };
  const handleResolve = (problem) => {
    // console.log("data dada", problem);
    props.addProblemToSolution(problem);
    props.deleteProblem(problem.id);
    setValue(1);
    setSignal(true);
  };
  console.log("solution updated ", props.solutions);
  return (
    <Box mx={2} className={classes.root}>
      <Typography variant="h6" style={{ paddingBottom: "10px" }}>
        Resolution Center
      </Typography>
      <Grid
        container
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid item>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <searchIcon />
            </div>
            <div style={{ display: "flex" }}>
              <InputBase
                onBlur={searchHandler}
                placeholder="SearchName"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
              <Button
                variant="contained"
                color="secondary"
                size={"small"}
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
        <Grid item>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
            style={{
              backgroundColor: "white",
              border: "1px solid lightGray",
              borderRadius: 10,
            }}
          >
            <Tab label="Problems" selected />
            <Tab label="Resolved" />
          </Tabs>
        </Grid>
      </Grid>

      <Box my={2}>
        {value === 0 ? (
          <ProblemsData
            problems={filterdata ? filterdata : props.problems}
            page={page}
            showPerPage={showPerPage}
            handleResolve={handleResolve}
          />
        ) : (
          <SolutionsData
            solutions={filterdata ? filterdata : props.solutions}
            page={page}
            showPerPage={showPerPage}
            // handleResolve={handleResolve}
          />
        )}
        {value === 0 ? (
          <Pagination
            dataSize={props.problems.slice(page, page + showPerPage).length} // Slice will be removed when pagination from backend implemented
            page={page}
            onBack={onBack}
            onForward={onForward}
            showPerPage={showPerPage}
            onPageChange={onPageChange}
          />
        ) : (
          <Pagination
            dataSize={props.solutions.slice(page, page + showPerPage).length} // Slice will be removed when pagination from backend implemented
            page={page}
            onBack={onBack}
            onForward={onForward}
            showPerPage={showPerPage}
            onPageChange={onPageChange}
          />
        )}
      </Box>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProblems: () => {
      dispatch(getProblems());
    },
    getSolutions: () => {
      dispatch(getSolvedProblems());
    },
    addProblemToSolution: (problem) => {
      dispatch(addProblemToSolution(problem));
    },
    deleteProblem: (problem_id) => {
      dispatch(deleteProblem(problem_id));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    problems: state.problem.problemlist,
    solutions: state.solvedproblem.solvedproblemlist,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles)
)(Problems);
