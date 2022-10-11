const express = require("express");
const loginApp = express.Router();
loginApp.use(express.json());
const bcryptjs = require("bcryptjs");

loginApp.post("/", async (request, response) => {
  const userObj = request.body;
  const userCollectionObject = request.app.get("userCollectionObject");
  const user = await userCollectionObject.findOne({
    email: userObj.email,
  });
  if (user === null) {
    response.send({ message: "User not registered...please register" });
  } else {
    const isTrue = await bcryptjs.compare(userObj.password, user.password);
    if (isTrue !== true) {
      response.send({ message: "Incorrect Password" });
    } else {
      response.send({ message: "success", userObj: user });
    }
  }
});

module.exports = loginApp;
