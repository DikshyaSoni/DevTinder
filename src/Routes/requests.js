const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require ("../../middleware/auth")



requestRouter.post("/sendconnectionrequest",userAuth ,async(req,res) => {
  const user = req.user;
  console.log("connection request sent");
  res.send(user.firstName + " sent the connection request")
});

module.exports = requestRouter;