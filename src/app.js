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
app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => res.status(201).send(user))
    .catch((error) => {
      res.status(401).send(error);
    });
});

// Creating a task
app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((error) => {
      res.status(401).send(error);
    });
});

// Reading Users
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

// Reading Single users
app.get("/users/:id", (req, res) => {
  const _id = req.params.id;

  User.findById(_id)
    .then((user) => {
      if (user) {
        return res.send(user);
      } else {
        return res.status(404).send();
      }
    })
    .catch((e) => {
      res.status(404).send();
    });
});

// Reading All Tasks
app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => res.send(tasks))
    .catch((e) => res.status(500).send());
});

// Reading Single Task
app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;

  Task.findById(_id)
    .then((user) => res.send(user))
    .catch((e) => res.status(404).send());
});

// Starting Server
app.listen(port, () => {
  console.log(`Task Manager app listening at http://localhost:${port}`);
});
