const express = require("express");
const app = express.Router();
const Image = require("../schema");
app.get("/app", (req, res) => {
  var imgPath = [];
  Image.find(function(err, response) {
    //   console.log(response);
    for (var i = 0; i < response.length; i++) {
      //   imgPath.push(response[i].imgFile);
    }
    // console.log(imgPath);
    res.send(response);
    //   tag.push(response.tag);
  });
});
app.get("/showImage", (req, res) => {
  var imgPath = [];
  Image.find(function(err, response) {
    //   console.log(response);
    for (var i = 0; i < response.length; i++) {
      imgPath.push(response[i].imgFile);
    }
    console.log(imgPath);
    res.send(imgPath);
    //   tag.push(response.tag);
  });
});
var tag = [];
app.post("/pst", (req, res) => {
  console.log("imgFile " + req.body.imgFile);
  var newImage = new Image({
    title: req.body.title,
    location: req.body.location,
    tag: req.body.tag,
    imgFile: req.body.imgFile
  });
  newImage.save(function(err, Image) {
    if (err) console.log("error");
    else console.log("okkkkkk");
  });
});

app.get("/tag", (req, res) => {
  // console.log();
  //   Image.find(function(err, response) {
  //     console.log(response);
  //     //   tag.push(response.tag);
  //   });
  tag = [];
  Image.find().distinct("tag", function(error, tags) {
    console.log(tags);
    for (var i = 0; i < tags.length; i++) {
      tag.push(tags[i]);
    }
    res.send(tag);
  });
});

app.post("/fileupload", (req, res) => {
  console.log("fileBB", req.file);
  console.log("bodyBB", req.body);
  upload(req, res, function(err) {
    if (err) {
      // A Multer error occurred when uploading.
      console.log("file", req.file);
      console.log("body", req.body);
      res.send(err);
    } else {
      console.log("file", req.file);
      console.log("body", req.body);
      res.send("success");
      // An unknown error occurred when uploading.
    }

    // Everything went fine.
  });
});

app.post("/delete", (req, res) => {
  var str = req.body.dltLink;
  var s = str.slice(21);

  console.log("delete" + s);
  Image.deleteOne({ imgFile: s }, function(err) {
    if (err) return handleError(err);
    else {
      console.log("deleted");
      var imgPath = [];
      Image.find(function(err, response) {
        //   console.log(response);
        // for (var i = 0; i < response.length; i++) {
        //   imgPath.push(response[i].imgFile);
        // }
        // console.log(imgPath);
        res.send(response);
      });
    }
  });
});

app.post("/detail", (req, res) => {
  var str = req.body.dltLink;
  var s = str.slice(21);

  console.log("delete" + s);
  Image.findOne({ imgFile: s }, function(err, response) {
    if (err) return handleError(err);
    else {
      console.log("found");
      console.log(response);
      res.send(response);
    }

    // Prints "Space Ghost is a talk show host".
  });
});
module.exports = app;
