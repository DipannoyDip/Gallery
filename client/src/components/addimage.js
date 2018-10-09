import React, { Component } from "react";
// import LandingPage from './LandingPage/LandingPage';
// import SvgIcons from './LandingPage/checkIcon';

// import Header from './Headers/Header';
// import Footer from './Footers/Footer';
import axios from "axios";
import GalleryBar from "./gallerybar";
import AddTabs from "./gallerytab2";

export default class AddImage extends Component {
  componentDidMount() {
    axios.get("http://localhost:5000/app").then(res => {
      console.log(res);
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      value: 0
    };

    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleCatchValue = this.handleCatchValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLinkChange(e) {
    this.setState({ link: e.target.value });
    console.log(this.state.link);
  }
  handleSubmit(e) {
    // this.setState({ link: e.target.value });
    axios
      .post("http://localhost:5000/pst", { link: this.state.link })
      .then(function(response) {
        console.log("saved successfully");
      });
  }

  handleCatchValue(e) {
    axios
      .post("/save", { firstName: "Marlon", lastName: "Bernardes" })
      .then(function(response) {
        console.log("saved successfully");
      });
    // this.setState({ value: e });
  }

  render() {
    return (
      <div className="container-fluid">
        {/* <GalleryBar /> */}
        <AddTabs />
      </div>
    );
  }
}
