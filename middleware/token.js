const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const tokenHeader = req.header("Authorization");

  if (!tokenHeader || !tokenHeader.split(" ")[1])
    return res.status(401).json({ message: "Access denied" });

  const token = tokenHeader.split(" ")[1];
  const SECRET_KEY = "PETROBYTES";

  try {
    const jwtDecode = jwt.verify(token, SECRET_KEY);
    req.user=jwtDecode
    next()
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateToken };
