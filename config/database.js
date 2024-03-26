const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("mongoose connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
