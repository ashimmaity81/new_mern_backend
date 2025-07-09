const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_URL_LINK, {
    dbName: "day17",
  })
  .then(() => {
    console.log("----- DB connected -----");
  })
  .catch((err) => {
    console.log("DB connection Error");
    console.log(err.message);
    console.log("-- ------------ --");
  });
