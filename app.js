const dotEnv = require("dotenv");
dotEnv.config();
const express = require("express");
require("./config/db.js");
const cors = require("cors");
const { apiRouter } = require("./api/v1/routes.js");
const app = express();
app.use(cors());
app.use(express.json()); // read the body in json format
app.use((req, res, next) => {
  console.log("------------");
  console.log(new Date(), req.url, req.method);
  console.log("------------");
  next();
});

app.use("/api/v1", apiRouter);
// app.get("/", (req, res) => {
//   res.json({
//     isSucess: true,
//     message: "Server is running",
//     data: {},
//   });
// });
// app.get("/hello", (req, res) => {
//   res.json({
//     isSucess: true,
//     message: "hello, how are you",
//     data: {},
//   });
// });
// app.use((req, res, next) => {
//   console.log("!!!!!!!!!!!!");
//   next();
// });

app.listen(2900, () => {
  console.log("--- Server is running ---");
});
