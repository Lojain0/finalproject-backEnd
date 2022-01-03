const likeModel = require("../../db/models/LikeModel");
//
const postLike = async (req, res) => {
  const id = req.params.id;
  const user = req.token.userId;
  try {
    const foundUser = await likeModel.findOne({ user });
    console.log(foundUser);
    if (foundUser == null) {
      const newLike = new likeModel({ user: user, like: [id] });
      const response = await newLike.save();
      console.log(response);
      res.status(201).json(response);
    } else {
      const newLike = await likeModel.findOneAndUpdate(
        { user: user },
        { $push: { like: id } },
        { new: true }
      );
      const like = await likeModel.findOne({ user }).populate("like");
      res.status(200).json(like.like);
    }
  } catch (error) {
    res.send(error);
  }
};

const getLike = async (req, res) => {
  const user = req.token.userId;
  try {
    const like = await likeModel.findOne({ user }).populate("like");
    res.status(200).json(like.like);
  } catch (error) {
    res.send(error);
  }
};

const deleteLike = async (req, res) => {
  const id = req.params.id;
  const user = req.token.userId;
  try {
    const deleteLike = await likeModel.findOneAndUpdate(
      { user: user },
      { $pull: { like: id } },
      { new: true }
    );
    const like = await likeModel.findOne({ user }).populate("like");
    res.status(200).json(like.like);
  } catch (error) {
    res.send(error);
  }
};
//
module.exports = { postLike, getLike, deleteLike };
