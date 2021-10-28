const express = require("express");
const app = express()
const PORT = process.env.PORT || 5000;
require("./db/mongoose")

// config
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})