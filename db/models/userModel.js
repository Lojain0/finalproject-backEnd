const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  admin: { type: Boolean },
  photo: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png",
  },
});

module.exports = mongoose.model("userModel", userModel);
