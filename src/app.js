const express = require("express");
const port = process.env.PORT || 5000;
const app = express();

// Importing Mongodb
require("./db/mongoose");

// Importing routes
const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/Tasks");

// Configuration
app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);

// Starting Server
app.listen(port, () => {
  console.log(`Task Manager app listening at http://localhost:${port}`);
});
