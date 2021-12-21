const postModel= require("../../db/models/postModel");
const userModel = require("../../db/models/userModel");


const getPost = async (req,res)=>{
    try {
         const posts = await postModel.find({}).populate("user");
         console.log(posts,"posts");
        res.status(200).json(posts)
    } catch (error){
        res.send(error)
    }
};

const postNewPost= async (req, res)=>{
  const {newImg , newtext } = req.body;
  const user =req.token.userId
  const newPosst = new postModel({img:newImg, text:newtext , user})
  try {
      const savedpost= await newPosst.save()
      res.status(200).json(savedpost)

  }catch (error){
      res.send(error)
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const user = req.token.userId;
  try {
    const userAdmin = await userModel.findOne({_id:user})

    if(userAdmin.admin==true){
      const del = await postModel.findOneAndDelete({ _id: id });
      if (del){
        res.send("deleted")
      }else{
        res.send("can't deleted")
      }
    } else{
      const del = await postModel.findOneAndDelete({ _id: id, user: user });
      if (del){
        res.send("deleted")
      }else{
        res.send("can't deleted")
      }    
    }
  } catch (error) {
    res.send(error , "error");
  }
};

const updatePost = async (req, res) => {

  const id = req.params.id;
  let {img, text} = req.body;
  
  postModel.findByIdAndUpdate({ _id: id }, { img, text },)
    .then((result) => {
      const post = postModel.find({});

      res.status(200).json(post);
    })
    .catch((err) => {
      res.send(err);
    });
};


module.exports = { getPost, postNewPost, deletePost , updatePost };