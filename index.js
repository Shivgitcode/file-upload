const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.json());

const fileupload = require("express-fileupload");

app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const db = require("./config/database");

db.connect();

const cloudinary = require("./config/cloudinary");

cloudinary.cloudinaryConnect();

const Upload = require("./routes/Fileupload");

app.use("/api/v1/upload", Upload);

app.listen(port, () => {
  console.log("server running at port 3000");
});
