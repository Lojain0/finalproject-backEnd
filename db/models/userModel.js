const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: { type: String },
  email: { type: String ,unique:true },
  password: { type: String },
  admin :{type:Boolean}

});

module.exports = mongoose.model("userModel", userModel);
