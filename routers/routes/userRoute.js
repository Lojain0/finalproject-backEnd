const express = require("express");
const infouser = express.Router();

const { getuser, updateinfo } = require("../controllers/user");
const { authentication } = require("../middlewares/authentication");
infouser.get("/infouser", authentication, getuser);
infouser.put("/updateuser", authentication, updateinfo);

module.exports = infouser;
