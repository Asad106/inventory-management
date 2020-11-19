import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import InventoryData from "./InventoryData";
import ListViewHeader from "../common/ListViewHeader";
import { compose } from "redux";
import { connect } from "react-redux";
import Pagination from "./Pagination";
// import Loader from "../../Components/common/Loader";
import {
  getInventories,
  deleteInventory,
} from "../../redux/actions/inventoryActions";
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

function Inventory(props) {
  const { classes } = props;
  const [showPerPage, setShowPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const history = props.history;
  const [filterdata, setStateFilterData] = React.useState("");

  const onEdit = (id) => {
    // console.log("id of an inventory" + id);
    history.push(`/addInventory/${id}`);

    // props.editInventories(id);
  };

  const onDelete = (id) => {
    props.deleteInventory(id);
    props.getInventories(showPerPage, page);
  };

  const onPageChange = (e) => {
    setShowPerPage(e.target.value);
    setPage(0);
  };

  const onBack = () => {
    if (page === 0) return;
    setPage(page - showPerPage);
    // limit = limit - 20;
  };
  const onForward = () => {
    setPage(page + showPerPage);
    console.log("chk" + page, "limit" + showPerPage);
    // limit = limit + 20;
  };

  const searchHandler = (e) => {
    const searchValue = e.target.value;
    setPage(0);
    // console.log(searchValue);
    if (searchValue) {
      const filterResult = props.inventories.filter((inventory) =>
        inventory.productName.toLowerCase().includes(searchValue)
      );
      setStateFilterData(filterResult);
    } else {
      setStateFilterData(props.inventories);
    }
  };

  useEffect(() => {
    props.getInventories(showPerPage, page);
    console.log("chk" + page, "limit" + showPerPage);
  }, []);
  // console.log(props.inventories);
  return (
    <Box mx={2} className={classes.root}>
      <ListViewHeader
        searchHandler={searchHandler}
        title="Inventory Management"
        btnLabel="Add Product"
        btnLink="/addInventory"
      />
      <Box my={2}>
        <InventoryData
          inventories={filterdata ? filterdata : props.inventories}
          page={page}
          showPerPage={showPerPage}
          onDelete={onDelete}
          onEdit={onEdit}
        />
        <Pagination
          dataSize={props.inventories.slice(page, page + showPerPage).length} // Slice will be removed when pagination from backend implemented
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
    getInventories: (limit, startAt) => {
      dispatch(getInventories(limit, startAt));
    },
    deleteInventory: (id) => {
      dispatch(deleteInventory(id));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    inventories: state.inventory.dataList,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(Styles)
)(Inventory);
