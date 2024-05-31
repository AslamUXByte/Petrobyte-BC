const User = require("../models/user");

const Signup = async (req, res) => {
  let userData = req.body;
  try {
    let email = userData.email;
    let existingUser = null
    // await User.findOne({ email });

    if (existingUser) {
      res.status(200).json({message:"User Alredy Registerd..!"});
    } else {
      const newUser = await User.create(userData);
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

const Signin = async (req, res) => {
  let userData = req.body;
  try {
    if (!userData.email || !userData.password) {
      return res.json({ message: "All fields are required" });
    }
    let email = userData.email;
    let existingUser = await User.findOne({
      email,
    });
    if (!existingUser) {
      return res.json({ message: "This Email Is Not Registered" });
    }
    if (
      existingUser.email != userData.email ||
      existingUser.password != userData.password
    ) {
      res
        .status(400)
        .json({ message: "Login Failed, check your details again" });
    } else {
      res.status(201).json({ message: "Login Success" });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { Signup, Signin };
