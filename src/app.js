const express = require("express");
const app = express();
const PORT = 5000 || process.env.PORT;
require("./db/mongoose");

// Express configuration
app.use(express.json());

// Uploading files
const multer = require("multer");
const upload = multer({
  dest: "./src/uploads",
  limits: 1000000,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      cb(new Error("Please upload a word document"));
    }

    cb(undefined, true);
  },
});

app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
});

// routes
app.use(require("./routes/userRouter"));
app.use(require("./routes/taskRouter"));

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
