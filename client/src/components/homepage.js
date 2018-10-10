import React, { Component } from "react";
// import LandingPage from './LandingPage/LandingPage';
// import SvgIcons from './LandingPage/checkIcon';

// import Header from './Headers/Header';
// import Footer from './Footers/Footer';
import axios from "axios";
import GalleryBar from "./gallerybar";
import SimpleTabs from "./gallerytab";
import GuttersGrid from "./grid";
import SimpleModal from "./modal";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

var img = [];

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

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      value: 0,
      imgpth: [],
      poptitle: [],
      poploc: [],
      poptag: [],
      c: 0
    };

    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleCatchValue = this.handleCatchValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDlt = this.handleDlt.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
  }
  componentDidMount() {
    img = [];
    let that = this;
    axios.get("http://localhost:5000/app").then(res => {
      var imgpath = [];
      var title = [];
      var tag = [];
      console.log(res);
      console.log(res.data[17]);
      for (var i = 0; i < res.data.length; i++) {
        imgpath.push(res.data[i].imgFile);
        title.push(res.data[i].title);
        tag.push(res.data[i].tag);
      }
      that.setState({ imgpth: res.data, poptitle: title, poptag: tag });
      //   img = res.data;
    });
  }

  handleLinkChange(e) {
    this.setState({ link: e.target.value });
    console.log(this.state.link);
  }

  handleDlt(a) {
    console.log("Pain" + a);
    this.setState({ imgpth: a });
  }
  handleDetail(a) {
    console.log("detait" + a.tag);
    this.setState({ poploc: a.location, poptag: a.tag, c: 1 });
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
    console.log("image " + img);
    var modal = "";
    console.log(this.state.c);

    if (this.state.c == 1) {
      console.log("end");
      modal = (
        <React.Fragment>
          <div
            class="modal fade"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">...</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <div className="container-fluid">
        {/* <GalleryBar /> */}
        <SimpleTabs />
        <br />
        <br />
        <br />

        <GuttersGrid
          img={this.state.imgpth}
          ttl={this.state.poptitle}
          tg={this.state.poptag}
          dltfnc={this.handleDlt}
          dtl={this.handleDetail}
        />
        {modal}
      </div>
    );
  }
}
