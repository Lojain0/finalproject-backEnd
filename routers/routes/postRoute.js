const express = require("express");
const postRoute = express.Router();

const { getPost, postNewPost, deletePost , updatePost} = require("../controllers/post");
const {authentication} = require("../middlewares/authentication")

postRoute.get("/posts",authentication, getPost);
postRoute.post("/posts",authentication, postNewPost);
postRoute.delete("/posts/:id", authentication, deletePost);
postRoute.put("/posts/:id",authentication, updatePost);


module.exports = postRoute;
