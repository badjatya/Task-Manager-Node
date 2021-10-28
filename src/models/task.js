const mongoose = require("mongoose");

// Task Schema
const taskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Model
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
