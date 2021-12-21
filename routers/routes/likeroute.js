const express=require("express")
const LikeRoute= express.Router()


const{addlike}=require("../controllers/like")

LikeRoute.post("/addlike",addlike)

module.exports=LikeRoute