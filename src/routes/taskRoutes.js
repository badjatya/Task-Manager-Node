const taskRouter = require("express").Router();

// Model
const Task = require("../models/task");

// Creating Task
taskRouter.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Getting tasks
taskRouter.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

// get task
taskRouter.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

// Update Task
taskRouter.patch("/tasks/:id", async (req, res) => {
  // Validating updates
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "not allowed" });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

// Delete task
taskRouter.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = taskRouter;
