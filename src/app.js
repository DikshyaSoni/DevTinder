
const express = require("express");
const app = express();

const connectdb = require("./config/database");

const User = require("./models/user");
const user = require("./models/user");


app.use(express.json());
app.post("/signup", async (req, res) => {
  console.log(req.body);
  // creating a new instnce of a user model
  const user = new User(req.body);
  try {


    await user.save();
    res.send("user signup succesfull");
  }
  catch (err) {
    res.status(401).send("error saving user" + err.message);
  }
});
// get user by email

app.get ("/user", async (req,res) => {
  const userEmail = req.body.emailId;
  try{
    const user = await User.findOne({emailId:userEmail});
  
  if(!user){
    res.status(400).send("user not found");
  }else{
    res.send(user);
  }
}
  // try{
  //    const users = await User.find({emailId:userEmail});
  //    if(users.length == 0){
  //     res.status(400).send("user not found");
  //    }
  //    else{

  //      res.send(users);
  //    }

  
  catch(err){
    res.status(400).send("something got wrong");
  }
  
});

// FEED API - GET/feed -  get all the users from the database
app.get("/feed",async (req,res) => {
  try{
const users = await user.find({})
res.send(users)
  }
    catch (err) {
    res.status(401).send("error saving user" + err.message);
  }
});


connectdb()
  .then(() => {
    console.log("database connected succesfully");

    app.listen(4000, () => {
      console.log("succesfuly created a server on port 4000");
    });
  })
  .catch(err => {
    console.error("database cannot be connected");

  });