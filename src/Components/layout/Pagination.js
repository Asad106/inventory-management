import React from "react";
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const Pagination = ({
  showPerPage,
  dataSize,
  page,
  onPageChange,
  onBack,
  onForward,
}) => {
  return (
    <Box mx={6} my={2}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="caption">Rows per page: &nbsp;</Typography>
          <Select
            labelId="rows-per-page"
            value={showPerPage}
            onChange={onPageChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </Grid>
        <Grid item>
          <IconButton onClick={onBack} disabled={page === 0}>
            <ArrowBackIosIcon size="small" />
          </IconButton>
          <IconButton onClick={onForward} disabled={dataSize < showPerPage}>
            <ArrowForwardIosIcon size="small" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pagination;
