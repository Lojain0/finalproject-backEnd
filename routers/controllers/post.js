const postModel = require("../../db/models/postModel");
const userModel = require("../../db/models/userModel");

const getPost = async (req, res) => {
  try {
    const posts = await postModel.find({}).populate("user");
    console.log(posts, "posts");
    res.status(200).json(posts);
  } catch (error) {
    res.send(error);
  }
};

const postNewPost = async (req, res) => {
  const { newImg, newtext } = req.body;
  const user = req.token.userId;
  const newPosst = new postModel({ img: newImg, text: newtext, user });
  try {
    const savedpost = await newPosst.save();
    res.status(200).json(savedpost);
  } catch (error) {
    res.send(error);
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const user = req.token.userId;
  try {
    const userAdmin = await userModel.findOne({ _id: user });

    if (userAdmin.admin == true) {
      const del = await postModel.findOneAndDelete({ _id: id });
      if (del) {
        res.send("deleted");
      } else {
        res.send("can't deleted");
      }
    } else {
      const del = await postModel.findOneAndDelete({ _id: id, user: user });
      if (del) {
        res.send("deleted");
      } else {
        res.send("can't deleted");
      }
    }
  } catch (error) {
    res.send(error, "error");
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const user = req.token.userId;
  let { text } = req.body;
  try {
    const isUser = await userModel.findOne({ _id: user });
    if (isUser) {
      const update = await postModel.findOneAndUpdate(
        { _id: id },
        { text: text },
        { new: true }
      );
      const posts = await postModel.find({}).populate("user");
      res.status(201).json(posts);
    }
  } catch (error) {
    res.send(error, "error");
  }
};

module.exports = { getPost, postNewPost, deletePost, updatePost };
