const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
require("./db/mongoose");

// Express configuration
app.use(express.json());

// routes
app.use(require("./routes/userRouter"));
app.use(require("./routes/taskRouter"));

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

// (async () => {
//   const Task = require("./models/task");
//   const task = await Task.findById("6188c57e6e958e5f92364f48");
//   await task.populate("owner");
//   console.log(task.owner);

//   const User = require("./models/user");
//   const user = await User.findById("6188c5716e958e5f92364f42");
//   await user.populate("tasks");
//   console.log(user.tasks);
// })();
