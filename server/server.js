const express = require("express");
const path = require("path");
const mongoClient = require("mongodb").MongoClient;
const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));

const DB_URL =
  "mongodb+srv://kishorekrissh7:kishorekrissh7@cluster0.slyeo.mongodb.net/test";

mongoClient
  .connect(DB_URL)
  .then((client) => {
    const dbObj = client.db("mobileecom");
    const userCollectionObject = dbObj.collection("usercollection");
    app.set("userCollectionObject", userCollectionObject);
    console.log("connected to usercollection");
  })
  .catch((err) => console.log("error in connecting to usercollection", err));

const registerApp = require("./APIs/registerApi");
const loginApp = require("./APIs/loginApi");

app.use("/user/register", registerApp);
app.use("/user/login", loginApp);

app.listen(5000, () => console.log("server running on 5000..."));
