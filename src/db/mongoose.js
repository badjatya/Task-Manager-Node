const mongoose = require("mongoose");
const databaseURL = "mongodb://127.0.0.1:27017/task-nodejs";

mongoose.connect(databaseURL, {
    useNewUrlParser:true
}, () => {
    console.log("Db connected");
})