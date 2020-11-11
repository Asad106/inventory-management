import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#ccc",
  },
}));

export default function Loader(props) {
  const { open } = props;
  const classes = useStyles();
  //   const [open, setOpen] = React.useState(true);
  console.log("sasadsadsadsadsadsadsa", open);
  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
