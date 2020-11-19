import React, { useState, useEffect } from "react";
import moment from "moment";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";

import {
  Button,
  IconButton,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { Row } from "react-bootstrap";
import { setDefaultLocale } from "react-datepicker";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    flexWrap: "wrap",
    marginTop: "auto",
    paddingLeft: 0,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  cover: {
    width: "50px",
    height: "50px",
  },
  header: {
    color: "white",
  },
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid lightGray",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ProblemsData(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle());
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({});
  const [solutionArea, setSolutionArea] = useState({
    solutionDate: "",
    comments: "",
  });
  const [newObj, setNewObj] = useState({});
  //model

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const onSolve = (problem) => {
    setOpen(true);
    setState(problem);
  };
  const handleChange = (e) => {
    setSolutionArea({
      ...solutionArea,
      [e.target.name]: e.target.value,
    });
    // console.log(e.target.value);
    let newObj = { ...state, ...solutionArea };
    setNewObj(newObj);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const mergedObj = (state, solutionArea) => {
  //   let newObj = { ...state, ...solutionArea };
  //   return newObj;
  // };
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Order-table">
          <TableHead
            style={{
              borderWidth: "2px solid grey ",
              backgroundColor: "#817aff",
            }}
          >
            <TableRow>
              <TableCell className={classes.header}>User</TableCell>
              <TableCell className={classes.header}>Category</TableCell>

              <TableCell className={classes.header}>Problem</TableCell>
              <TableCell className={classes.header}>Problem Date</TableCell>

              <TableCell className={classes.header} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.problems
              .slice(props.page, props.page + props.showPerPage) // slice method will change with backend pagination
              .map((problem, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {problem.user_name}
                  </TableCell>
                  <TableCell>{problem.category}</TableCell>
                  <TableCell>{problem.problem}</TableCell>
                  <TableCell>
                    {new Date(
                      problem.problemdate.seconds * 1000
                    ).toLocaleString()}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      aria-label="solve"
                      color="primary"
                      variant={"outlined"}
                      onClick={() => onSolve(problem)}
                    >
                      Detail
                      <DoneOutlinedIcon
                        fontSize="small"
                        style={{ paddingLeft: 5 }}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        data={state}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 style={{ color: "rebeccapurple" }} id="simple-modal-title">
            Problem Details
          </h2>
          <div>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" style={{ fontWeight: "bolder" }}>
                User Name:
              </Typography>
              <Typography variant="h6" style={{ paddingLeft: 20 }}>
                {state.user_name}
              </Typography>
            </Row>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" style={{ fontWeight: "bolder" }}>
                Category:
              </Typography>
              <Typography variant="h6" style={{ paddingLeft: 20 }}>
                {state.category}
              </Typography>
            </Row>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" style={{ fontWeight: "bolder" }}>
                Problem:
              </Typography>
              <Typography
                variant="h6"
                style={{ paddingLeft: 20, color: "red" }}
              >
                {state.problem}
              </Typography>
            </Row>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                style={{
                  fontWeight: "bolder",
                  justifyContent: "space-between",
                }}
              >
                Problem Date:
              </Typography>
              <Typography>
                {state.problemdate &&
                  new Date(state.problemdate.seconds * 1000).toLocaleString()}
              </Typography>
            </Row>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" style={{ fontWeight: "bolder" }}>
                Problem Status:
              </Typography>
              <Typography variant="h6" style={{ paddingLeft: 20 }}>
                Active
              </Typography>
            </Row>
            <h2 style={{ color: "rebeccapurple" }} id="simple-modal-title">
              Fix Problem Here
            </h2>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">
                <form className={classes.container} noValidate>
                  <TextField
                    name="solutionDate"
                    label="Solution Date"
                    type="datetime-local"
                    onChange={handleChange}
                    value={solutionArea.solutionDate}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </Typography>
              <TextField
                name="comments"
                label="Solution Description"
                multiline
                rows={2}
                onChange={handleChange}
                value={solutionArea.comments}
              />
            </Row>
            <Row
              style={{
                display: "flex",
                justifyContent: "space-around",
                paddingTop: 20,
              }}
            >
              <Button
                variant="outlined"
                size="small"
                color={"primary"}
                onClick={() => props.handleResolve(newObj)}
              >
                Resolve
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleClose}
              >
                cancel
              </Button>
            </Row>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProblemsData;
