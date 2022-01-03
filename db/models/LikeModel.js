const mongoose = require("mongoose");

const LikeModel = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "postModel" }],
});

module.exports = mongoose.model("LikeModel", LikeModel);
