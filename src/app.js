const express = require("express");
const port = process.env.PORT || 5000;

// Importing Mongodb
require("./db/mongoose");
const User = require("./models/user");

const app = express();

// Configuration
app.use(express.json());

// Creating a user
app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => res.send(user))
    .catch((error) => {
      res.status(401).send(error);
    });
});

// Starting Server
app.listen(port, () => {
  console.log(`Task Manager app listening at http://localhost:${port}`);
});
