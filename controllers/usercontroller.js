const User = require("../models/user");

let getUser = async (req, res) => {
  try {
    let user =await User.find()
    res.status(200).json({message:user})
  } catch (error) {
    res.json(error)
  }
};

let getUserById = async (req, res) => {
  let email=req.query.email
  try {
    let user =await User.findOne({email})
    res.status(200).json({message:user})
  } catch (error) {
    res.json(error)
  }
};

let putUser = async (req, res) => {};

let deleteUser = async (req, res) => {};

module.exports = { getUser, getUserById, putUser, deleteUser };
