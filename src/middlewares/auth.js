// Importing Lib
const jwt = require("jsonwebtoken");

// Importing Models
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    // Verifying token
    const decodedToken = jwt.verify(token, process.env.AUTH_JWT_SECRET_KEY);

    // Checking user
    const user = await User.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
