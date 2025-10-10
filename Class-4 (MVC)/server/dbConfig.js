const mongoose = require("mongoose");

function connectDB(dbURL) {
  return mongoose
    .connect(dbURL)
    .then(() => {
      console.log("Db connected");
    })
    .catch((err) => {
      console.log(err);
    });
}


module.exports = {
    connectDB,
}
