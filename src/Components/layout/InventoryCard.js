import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 200,
  },
  pos: {
    marginBottom: 12,
  },
  cover: {
    objectFit: "cover",
    width: 250,
    height: 200,
  },
});

export default function InventoryCard({ item }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={(classes.media, classes.cover)}
          image={item.imageLink}
          title={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            {item.productName}
          </Typography>
          <div>
            <Typography className={classes.pos} color="textSecondary">
              {item.productType}" " {item.price}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {item.pricePerUnit}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "space-between" }}>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
