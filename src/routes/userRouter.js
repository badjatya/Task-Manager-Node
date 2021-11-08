const router = require("express").Router();

// Importing models
const User = require("../models/user");

// Middleware
const auth = require("../middlewares/auth");
const { response } = require("express");

// ** Signup
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

// get users
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// Update user
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(401).send({ message: "not a valid update" });
  }

  try {
    updates.map((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete user
router.delete("/users/:id", auth, async (req, res) => {
  try {
    req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
