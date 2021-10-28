// Model
const User = require("../models/user");

// lib
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await jwt.verify(token, "thisIsMe");

    const user = await User.findOne({ _id: decoded._id, "token.token": token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(400).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
