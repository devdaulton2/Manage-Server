require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();
app.use(require("./middleware/headers"));
const controllers = require("./controllers");

app.use(express.json());

app.use("/user", controllers.User);
app.use("/task", controllers.Task);
app.use("/comment", controllers.Comment);


db.authenticate()
  .then(() => db.sync())
  .then(() =>
    app.listen(3000, () => {
      console.log(`[server]: App is listening on localhost:3000`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });