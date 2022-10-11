const express = require("express");
const registerApp = express.Router();
registerApp.use(express.json());
const bcryptjs = require("bcryptjs");

registerApp.post("/", async (request, response) => {
  const userCollectionObject = request.app.get("userCollectionObject");
  const userObj = request.body;
  const userAlreadyInDb = await userCollectionObject.findOne({
    email: userObj.email,
  });
  if (userAlreadyInDb !== null) {
    response.send({ message: "User already registered...please login" });
  } else {
    let hashPassword = await bcryptjs.hash(userObj.password, 6);
    userObj.password = hashPassword;
    await userCollectionObject.insertOne(userObj);
    response.send({ message: "User Created" });
  }
});

module.exports = registerApp;
