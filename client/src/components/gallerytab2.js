import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

class AddTabs extends React.Component {
  state = {
    value: 0,
    title: "",
    location: "",
    tag: [],
    selecttag: "",
    newTag: "",
    currentTag: [],
    spacing: "16",

    imgFile: ""
  };
  componentDidMount() {
    axios.get("http://localhost:5000/tag").then(res => {
      this.setState({ currentTag: res.data });
      this.setState({ tag: res.data });

      console.log(res);
      console.log("check");
      console.log(this.state.currentTag.length);
    });
  }

  handleChange = event => {
    // console.log(event.target.files[0]);
    this.setState(
      { imgFile: "/uploads/" + event.target.files[0].name },
      function() {
        console.log("imgFile", this.state.imgFile);
      }
    );
    let formdata = new FormData();
    formdata.append("image", event.target.files[0]);
    console.log("ImageFile", this.state.imgFile);

    formdata.append("file[size]", event.target.files[0].size);
    formdata.append("file[type]", event.target.files[0].type);

    axios
      .post("http://localhost:5000/fileupload", formdata)
      .then(function(response) {
        console.log("saved successfully");
      });
  };

  handleChange2 = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange4 = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange3 = event => {
    let that = this;
    this.setState({ selecttag: event.target.value }, function() {
      console.log(this.state.selecttag);
    });
  };
  handleSubmit = event => {
    console.log("imgfromsub", this.state.imgFile);
    axios
      .post("http://localhost:5000/pst", {
        title: this.state.title,
        location: this.state.location,
        tag: this.state.selecttag,
        imgFile: this.state.imgFile
      })
      .then(function(response) {
        console.log("saved successfully");
      });
  };
  handleTagAdd = event => {
    // console.log(event.target.value);
    let dropTag = [];
    let showTag = [];
    dropTag = this.state.tag;
    showTag = this.state.currentTag;
    dropTag.push(this.state.newTag);
    showTag = dropTag;
    console.log(dropTag);
    // showTag.push(this.state.newTag);
    this.setState({ tag: dropTag });
    this.setState({ currentTag: showTag });
    this.setState({ newTag: "" });
    // axios
    //   .post("http://localhost:5000/pst", {
    //     title: this.state.title,
    //     location: this.state.location,
    //     tag: this.state.selecttag
    //   })
    //   .then(function(response) {
    //     console.log("saved successfully");
    //   });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const { spacing } = this.state;

    let tags = this.state.tag;
    let cTags = this.state.currentTag;
    let tagdrop = tags.map(tag => <option key={tag}>{tag}</option>);
    let tagString = "";
    tagString = cTags.map(tag => <h1 key={tag}> {tag}</h1>);

    // console.log(this.state.selecttag);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Gallery" />
            {/* <Tab label="Item Two" />
            <Tab label="Item Three" href="#basic-tabs" /> */}
          </Tabs>
        </AppBar>
        <br />
        <Grid container className={classes.root} spacing={24}>
          <Grid item xs={12} sm={3} />
          <Grid item xs={12} sm={3}>
            <br />
            <br />
            <div class="custom-file" id="customFile" lang="es">
              <input
                type="file"
                class="custom-file-input"
                id="exampleInputFile"
                aria-describedby="fileHelp"
                onChange={this.handleChange}
              />
              <label class="custom-file-label" for="exampleInputFile">
                Select file...
              </label>
            </div>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Title</InputLabel>
              <Input
                id="component-simple"
                name="title"
                value={this.state.title}
                onChange={this.handleChange2}
              />
            </FormControl>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Location</InputLabel>
              <Input
                id="component-simple"
                name="location"
                value={this.state.location}
                onChange={this.handleChange2}
              />
            </FormControl>
            <br />
            <br />
            <br />

            <label>Tag : </label>
            <select onChange={this.handleChange3}>{tagdrop}</select>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleSubmit}
              //   href="add"
            >
              Submit
            </Button>
            {/* </Grid> */}
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <Grid
              container
              className={classes.demo}
              justify="center"
              spacing={Number(spacing)}
            > */}
            <br />
            <h2>Add Tag</h2>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">NewTag</InputLabel>
              <Input
                id="component-simple"
                name="newTag"
                value={this.state.newTag}
                onChange={this.handleChange2}
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleTagAdd}
              href="#"
            >
              Add
            </Button>
            {tagString}
          </Grid>
          {/* </Grid> */}
        </Grid>
      </div>
    );
  }
}

AddTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddTabs);
