const mongoose = require("mongoose");
const config = require("./configExample.js");

// const assert = require("assert");
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

var imageSchema = mongoose.Schema({
  title: String,

  location: String,
  tag: String,
  imgFile: String
});

module.exports = Image = mongoose.model("Image", imageSchema);

// var image = new Schema({
//   url: String,
//   tag: String
// });
// var imgclt = mongoose.model("image", image);
// module.exports(Image);
