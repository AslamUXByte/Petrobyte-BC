const User = require("../models/user");
const jwt = require('jsonwebtoken');

const Signup = async (req, res) => {
  let userData = req.body;
  try {
    let email = userData.email;
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(200).json({ message: "User Alredy Registerd..!" });
    } else {
      const newUser = await User.create(userData);
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

const Signin = async (req, res) => {
  const { email, password } = req.body;
  const JWT_SECRET = 'PETROBYTES';

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({message:'Invalid username or password'});
  }

  // const isPasswordValid = await bcrypt.compare(password, user.password);

  // if (!isPasswordValid) {
  //   return res.status(400).json({message:'Invalid username or password'});
  // }

  const token = jwt.sign({ user: user }, JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ message:token });
};

module.exports = { Signup, Signin };
