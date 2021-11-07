const mongoose = require("mongoose");
const databaseURL = "mongodb://127.0.0.1:27017/task-manager-nodejs";

mongoose.connect(
  databaseURL,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("Database connected");
  }
);
