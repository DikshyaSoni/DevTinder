const express = require("express");
const userRouter = express.Router();
const {userAuth} = require ("../../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const mongoose = require("mongoose"); 

const Safe_data = "firstName lastName Gender Age";

// get all the pending connection request of the logged in user
userRouter.get("/requests/received",userAuth ,  async (req,res) => {
try{

    const loggedInUser = req.user._id;

const receivedRequest = await ConnectionRequest.find({
    toUserId : loggedInUser,
        //   toUserId: loggedInUser._id,

    status : "interested",
}).populate("fromUserId","firstName lastName");
// populate("fromUserId",["firstName","lastName"]);

res.json({message: "connection fetched",
    data: receivedRequest
});

}
catch(err){
    res.status(404).send("ERROR : " + err.message);
}

});

userRouter.get("/user/connections",userAuth, async (req,res) => {
    try{
    const loggedInUser = req.user._id;
    const allConnections = await ConnectionRequest.find({
        $or:[
            {toUserId : loggedInUser ,status: "accepted"},
            {fromUserId : loggedInUser, status : "accepted"}
            
        ],
    }).populate("fromUserId",Safe_data)
    .populate("toUserId",Safe_data);

    const data = allConnections.map((row) => {
if(row.fromUserId._id.toString() == loggedInUser.toString()){
    return row.toUserId;
}
return row.fromUserId;
});
       
    res.json({data:data});
}
catch(err){
    res.status(400).send({mesage : err.message})
}
});


userRouter.get("/feed",userAuth,async(req,res) => {
try{
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or:[
            {toUserId : loggedInUser},
            {fromUserId : loggedInUser} 
        ]
    }).select("fromUserId toUserId");
    
    
    
const hideUserFromFeed = new Set();
connectionRequest.forEach((req) => {
    hideUserFromFeed.add(req.fromUserId.toString());
        hideUserFromFeed.add(req.toUserId.toString());
});
    const users = await User.find({
        $and: [
            {_id:{$nin:Array.from(hideUserFromFeed)}},
            {_id:{$ne :loggedInUser}},
        ],
 }).select(Safe_data);
  res.json({ data: users });

}
catch(err){
    res.status(400).send({mesage : err.message})
}
});




module.exports = userRouter;