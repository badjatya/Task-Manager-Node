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

// Starting Server
app.listen(port, () => {
  console.log(`Task Manager app listening at http://localhost:${port}`);
});
