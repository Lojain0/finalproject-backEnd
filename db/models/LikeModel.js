const mongoose = require("mongoose");

const LikeModel = new mongoose.Schema({
 
  likePosts:  [{type: mongoose.Schema.Types.ObjectId, ref: "userModel",}] ,
  likesPosts:[{type: mongoose.Schema.Types.ObjectId, ref: "postModel",}] 

});

module.exports = mongoose.model("LikeModel", LikeModel);
