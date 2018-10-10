import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

// const styles = {
//   card: {
//     maxWidth: 345
//   },
//   media: {
//     // ⚠️ object-fit is not supported by IE11.
//     objectFit: "cover"
//   }
// };

const styles = theme => ({
  card: {
    maxWidth: 345,
    minWidth: 250,
    margin: "2%"
  },
  media: {
    height: 140
  },
  custom: { width: "100%" },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 25,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class ImgMediaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      open: false,
      link: this.props.lnk,
      poptitle: "",
      poploc: "",
      poptag: ""
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
  }
  handleDelete(e) {
    console.log("delete " + this.state.link);
    let that = this;
    axios
      .post("http://localhost:5000/delete", {
        dltLink: that.state.link
      })
      .then(function(response) {
        console.log("delete successfully");
        console.log(response.data);
        that.props.dltfn(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    // this.setState({ link: e.target.value });
    // console.log(this.state.link);
  }
  handleDetail(e) {
    console.log("delete " + this.state.link);
    this.setState({ open: true });

    let that = this;
    axios
      .post("http://localhost:5000/detail", {
        dltLink: that.state.link
      })
      .then(function(response) {
        console.log(response.data);
        that.props.detail(response.data);
        that.setState({
          poploc: response.data.location,
          poptag: response.data.tag
        });
        console.log(that.state.poploc + that.state.poptag);
      })
      .catch(err => {
        console.log(err);
      });
    // this.setState({ link: e.target.value });
    // console.log(this.state.link);
  }
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    console.log("hllo" + this.props.link);

    return (
      <div>
        <div>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                height="140"
                image={this.props.lnk}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  {this.props.ttl}
                </Typography>
                <Typography component="p">{this.props.tg}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                value={this.state.link}
                onClick={this.handleDetail}
                data
              >
                Detail
              </Button>

              <Button
                size="small"
                color="primary"
                value={this.state.link}
                onClick={this.handleDelete}
              >
                Delete
              </Button>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
              >
                <div style={getModalStyle()} className={classes.paper}>
                  <Typography variant="h6" id="modal-title">
                    Location : {this.state.poploc}
                  </Typography>
                  <Typography variant="subtitle1" id="simple-modal-description">
                    Tag :{this.state.poptag}
                  </Typography>
                </div>
              </Modal>
            </CardActions>
          </Card>
        </div>
        <div />
      </div>
    );
  }
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImgMediaCard);
// ImgMediaCard.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(ImgMediaCard);
