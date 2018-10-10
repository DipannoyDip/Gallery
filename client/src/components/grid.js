import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import ImgMediaCard from "./card";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class GuttersGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      spacing: "16",

      link: "",
      imgaray: this.props.img
    };
    this.handleCatchValue = this.handleCatchValue.bind(this);
  }

  componentDidMount() {
    // this.setState({ imgaray: this.props.img });
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  handleCatchValue(e) {
    this.setState({ imgaray: e });

    // this.setState({ link: e.target.value });
    // console.log(this.state.link);
  }

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;
    console.log(this.props.img);
    // var imgarray = [];
    // imgarray = this.props.img;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={Number(spacing)}
          >
            {this.props.img.map((value, index) => (
              <Grid key={index} value={value.imgFile} item>
                {/* {value} */}
                <ImgMediaCard
                  lnk={"http://localhost:5000" + value.imgFile}
                  ttl={value.title}
                  tg={value.tag}
                  dltfn={this.props.dltfnc}
                  detail={this.props.dtl}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container>
              <Grid item>
                <FormLabel>spacing</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="Spacing"
                  value={spacing}
                  onChange={this.handleChange("spacing")}
                  row
                >
                  <FormControlLabel value="0" control={<Radio />} label="0" />
                  <FormControlLabel value="8" control={<Radio />} label="8" />
                  <FormControlLabel value="16" control={<Radio />} label="16" />
                  <FormControlLabel value="24" control={<Radio />} label="24" />
                  <FormControlLabel value="32" control={<Radio />} label="32" />
                  <FormControlLabel value="40" control={<Radio />} label="40" />
                </RadioGroup>
              </Grid>
            </Grid>
          </Paper>
        </Grid> */}
      </Grid>
    );
  }
}

GuttersGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GuttersGrid);
