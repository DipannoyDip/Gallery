import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ImgMediaCard from "./card";
import styles from "./style";

import axios from "axios";

class SimpleTabs extends React.Component {
  state = {
    value: 0,
    link: ""
  };
  componentDidMount() {
    axios.get("http://localhost:5000/showImage").then(res => {
      console.log("ImagePath" + res);
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    // console.log("length" + this.props.img.length);
    var showImage = "";

    // let Images = this.props.img.map(tag => {
    //   console.log("tag", tag);
    //   return (
    //     <div>
    //       <ImgMediaCard link={"http://localhost:5000" + tag} />{" "}
    //     </div>
    //   );

    //   return <img src={"http://localhost:5000" + tag} alt="ddd" />;
    // });

    // for (var i = 0; i < this.props.img.length; i++) {
    //   let link = "localhost:5000" + this.props.img[i];
    //   showImage += (
    //     <div>
    //       <img src="http://localhost:5000/uploads/CardSliderInLandingpage.PNG" />
    //     </div>
    //   );
    // }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Gallery" />
            {/* <Tab label="Item Two" />
            <Tab label="Item Three" href="#basic-tabs" /> */}
          </Tabs>
        </AppBar>
        {/* <img src="http://localhost:5000/uploads/CardSliderInLandingpage.PNG" /> */}
        {/* <div>{Images}</div> */}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          href="add"
        >
          AddImage
        </Button>{" "}
        <br />
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTabs);
