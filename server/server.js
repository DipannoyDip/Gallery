const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
var image = require("./schema.js");
const config = require("./configExample.js");
// const path = require("path");
const bodyParser = require("body-parser");
mongoose.Promise = require("bluebird");
mongoose
  .connect(
    config.dbUrl,
    { useNewUrlParser: true }
  )
  .then(() => {
    // if all is ok we will be here
    console.log("Db initialized");
  })
  .catch(err => {
    // if error we will be here
    console.error("DB starting error", err);
    //process.exit(1);
  });

var personSchema = mongoose.Schema({
  name: String
  // age: Number,
  // nationality: String
});
var imageSchema = mongoose.Schema({
  title: String,

  location: String,
  tag: String,
  imgFile: String
});
var Person = mongoose.model("Person", personSchema);
// var newPerson = new Person({
//   name: "dip"
// });
var Image = mongoose.model("Image", imageSchema);
// newPerson.save(function(err, Person) {
//   if (err) console.log("error");
//   else console.log("okkkkkk");
// });

// Person.find({ name: "dip" }, function(err, response) {
//   console.log(response);
// });

const port = 5000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("./uploads"));

app.get("/app", (req, res) => {
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
  //   Image.find(function(err, response) {
  //     console.log(response);
  //     //   tag.push(response.tag);
  //   });

  //   console.log(req.body.link);
  // res.send("hi dipannoy");
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

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb("Only images please!!", false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
}).single("image");

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
        for (var i = 0; i < response.length; i++) {
          imgPath.push(response[i].imgFile);
        }
        console.log(imgPath);
        res.send(imgPath);
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

app.listen(port);
console.log(`Bigprint listening on ${port}`);
