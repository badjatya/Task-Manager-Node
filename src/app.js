const express = require("express");
const app = express();
const PORT = process.env.PORT;
require("./db/mongoose");

// Express configuration
app.use(express.json());

// routes
app.use(require("./routes/userRouter"));
app.use(require("./routes/taskRouter"));

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
