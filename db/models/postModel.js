const mongoose = require("mongoose");

const postModel = new mongoose.Schema({
  img: { type: String },
  text: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
});

module.exports = mongoose.model("postModel", postModel);
