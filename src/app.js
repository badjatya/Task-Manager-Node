const express = require("express");
const port = process.env.PORT || 5000;
const app = express();

// Importing Mongodb and models
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

// Configuration
app.use(express.json());

// Creating a user
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(401).send(error);
  }
});

// Reading Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

// Reading Single users
app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

// Creating a task
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(401).send(error);
  }
});

// Reading All Tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

// Reading Single Task
app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    res.send(task);
  } catch (error) {
    res.status(404).send();
  }
});

// Starting Server
app.listen(port, () => {
  console.log(`Task Manager app listening at http://localhost:${port}`);
});
