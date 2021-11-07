const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
require("./db/mongoose");

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
