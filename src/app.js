const express = require("express");
const port = process.env.PORT || 5000;

const app = express();

// Creating a user
app.post("/users", (req, res) => {
  console.log(req.body);
});

// Starting Server
app.listen(port, () => {
  console.log(`Task Manager app listening at http://localhost:${port}`);
});
