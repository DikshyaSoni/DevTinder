const express = require("express");
const userRouter = express.Router();
const {userAuth} = require ("../../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const mongoose = require("mongoose"); 

// get all the pending connection request of the logged in user
userRouter.get("/requests/received",userAuth ,  async (req,res) => {
try{

    const loggedInUser = req.user._id;

    console.log("req.user:", req.user);
console.log("typeof req.user._id:", typeof req.user._id);

const receivedRequest = await ConnectionRequest.find({
    toUserId : loggedInUser,
        //   toUserId: loggedInUser._id,

    status : "interested",
}).populate("fromUserId","firstName lastName");
// populate("fromUserId",["firstName","lastName"]);

res.json({message: "connection fetched",
    data : receivedRequest,
});

}
catch(err){
    res.status(404).send("ERROR : " + err.message);
}

});


module.exports = userRouter;