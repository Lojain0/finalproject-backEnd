const userModel = require("../../db/models/userModel");
const bcrypt = require("bcrypt");

const getuser = async (req, res) => {
  const user = req.token.userId;
  try {
    const getinfo = await userModel.findOne({ _id: user });
    res.status(200).json(getinfo);
  } catch (err) {
    res.send(err);
  }
};
const updateinfo = async (req, res) => {
  const user = req.token.userId;
  let { name, photo, password, email } = req.body;
  try {
    password = await bcrypt.hash(password, 10);
    const updateinfo = await userModel.findByIdAndUpdate(
      { _id: user },
      { name, photo, password, email },
      { new: true }
    );

    console.log(updateinfo);

    res.status(200).json(updateinfo);
  } catch (err) {
    res.send(err);
  }
};

module.exports = { updateinfo, getuser };
