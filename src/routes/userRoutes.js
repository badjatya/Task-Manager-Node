const userRouter = require("express").Router();

// Model
const User = require("../models/user");

// Signup
userRouter.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = userRouter;