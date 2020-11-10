/** @format */

import React, { useEffect, useState } from "react";
import ListViewHeaderWithoutAddButton from "../common/ListViewHeaderWithoutAddButton";
import { Box } from "@material-ui/core";
import ProblemsData from "./ProblemsData";
import { compose } from "redux";
import { connect } from "react-redux";
import Pagination from "./Pagination";
import { getProblems } from "../../redux/actions/problemActions";
import { withStyles } from "@material-ui/core/styles";

const Styles = (theme) => ({
  root: {
    flexGrow: 1,
    color: "rgba(0, 0, 0, 0.54)",
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
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

  useEffect(() => {
    props.getProblems();
  }, []);
  const onPageChange = (e) => {
    setShowPerPage(e.target.value);
    setPage(0);
  };
  // const getTransactionForOrder = (id) => {
  //   console.log("id of an order" + id);
  //   history.push(`/adduser/${id}`);
  // };
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
    if (searchValue) {
      const filterResult = props.problems.filter((problem) =>
      problem.user_name.includes(searchValue)
      );

      setFilterData(filterResult);
    } else {
      setFilterData(props.problems);
    }
  };
  return (
    <Box mx={2} className={classes.root}>
      <ListViewHeaderWithoutAddButton
        searchHandler={searchHandler}
        title="Problems"
        // btnLabel="Add User"
        // btnLink="/addUser"
      />
      <Box my={2}>
        <ProblemsData
          problems={filterdata ? filterdata : props.problems}
          page={page}
          showPerPage={showPerPage}
          // onDelete={onDelete}
          // onEdit={onEdit}
        />
        <Pagination
          dataSize={props.problems.slice(page, page + showPerPage).length} // Slice will be removed when pagination from backend implemented
          page={page}
          onBack={onBack}
          onForward={onForward}
          showPerPage={showPerPage}
          onPageChange={onPageChange}
        />
      </Box>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProblems: () => {
      dispatch(getProblems());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    problems: state.problem.problemlist,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles)
)(Problems);
