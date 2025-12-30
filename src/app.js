
const express = require("express");
const app = express();
const connectdb = require("./config/database");
const User = require("./models/user");
const user = require("./models/user");
const{validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require ("../middleware/auth")
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
// validation of data
validateSignUpData(req);
// encrypting passwords
const {firstName,lastName,emailId,password} = req.body;
const passwordHash = await bcrypt.hash(password,10);
console.log(passwordHash);
const user =  new User ({
  firstName,
  lastName,
  emailId,
  password : passwordHash,


});
// creating  new instance of a  user model



    await user.save();
    res.send("user signup succesfull");
  }
  catch (err) {
    res.status(401).send("error " + err.message);
  }
  console.log(doc.createdAt); 
console.log(doc.updatedAt);
});
// get user by email
app.post("/login",async(req,res) => {
try{
   const{ emailId , password} = req.body ;
   if(!validator.isEmail(emailId)){
           throw new Error("email not valid");
   }
   const user =await User.findOne({emailId:emailId});
           if(!user){
            throw new Error("Invalid Credentials");
           }
           const isPasswordValid = await bcrypt.compare(password,user.password);
           if(isPasswordValid){
            
            // create a jwt token 

            const token = await jwt.sign({_id:user._id}  , "Devtinder@0709") ;
            console.log(token);
            // add token to the cookie and send response back to the user
            res.cookie("token",token);
            res.send("login succesfull"); 
          }
          else{
             throw new Error("Invalid Credentials");
        
           }
}
    catch(err){
    res.status(401).send("ERROR :  " + err.message);
  }
});

app.get("/profile", userAuth ,async(req,res) => {
  try{
   const user =req.user;
  
  res.send(user);
  }catch(err){
    res.status(401).send("ERROR :  " + err.message);
  }
});


app.post("/sendconnectionrequest",userAuth ,async(req,res) => {
  const user = req.user;
  console.log("connection request sent");
  res.send(user.firstName + " sent the connection request")
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