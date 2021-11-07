const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
require("./db/mongoose");

// Express configuration
app.use(express.json());

// routes
app.use(require("./routes/userRouter"));

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
