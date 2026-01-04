const express = require("express");
const validator = require("validator");

const authRouter = express.Router();
const User = require("../models/user");
const{validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login",async(req,res) => {
try{
   const{ emailId , password} = req.body ;
   if(!validator.isEmail(emailId)){
           throw new Error("email not valid");
   }
   const user =await User.findOne({emailId:emailId});
           if(!user){
            throw new Error("Invalid Credentials");
           }
           const isPasswordValid = await user.validatePassword(password)
           if(isPasswordValid){
            
            // create a jwt token 

            const token = await user.getJWT();
        
            // add token to the cookie and send response back to the user
            res.cookie("token",token, {
              expires:new Date( Date.now()+ 8*3600000),
            });
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

authRouter.post("/logout",async(req,res) => {
    res.cookie("token",null, {
              expires:new Date( Date.now()),
            });
            res.send("logout successfully done ");
}
)

module.exports = authRouter;