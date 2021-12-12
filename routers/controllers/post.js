const postModel= require("../../db/models/postModel")


const getPost = async (req,res)=>{
    try {
         const posts = await postModel.find({}).populate("user");
        res.status(200).json(posts)
    } catch (error){
        res.send(error)
    }
}

const postNewPost= async (req, res)=>{
  const {newImg , newtext } = req.body;
  const user =req.token.userId
  const newPosst = new postModel({img:newImg, text:newtext , user})
  try {
      const savedpost= await newPosst.save()
       const post = await postModel.find({});
      res.status(200).json(post)

  }catch (error){
      res.send(error)
  }
}

const deletePost = async (req, res) => {
  const id = req.params.id;
  const user = req.token.userId;
  try {
    const del = await postModel.findOneAndDelete({ _id: id, user: user });
    if (del){
      res.send("deleted")
    }else{
      res.send("cant deleted")
    }
  } catch (err) {
    res.send(err , "err");
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  try {
    const updateOne = await postModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    const posts = await postModel.find({}).populate('userId');
    res.status(201).json(posts);
  } catch (error) {
    res.send(error);
  }
};

const getcard = async (req,res)=>{
  const id = req.params.id
  console.log(id)
try {

  const posts = await postModel.find({ _id: id, }).populate("user");
 res.status(200).json(posts)
} catch (error){
 res.send(error)
}
};

module.exports = { getPost, postNewPost, deletePost , getcard , updatePost};