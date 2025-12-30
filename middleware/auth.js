
const jwt = require("jsonwebtoken");
const User = require("../src/models/user");

const userAuth = async (req,res,next) => {
//   read the token from the  req cookies
try{
const {token }= req.cookies;
//  validate the token
  if(!token){
    throw new Error ("not valid token");
  } 
const decodedObj = await jwt.verify(token , "Devtinder@0709");
const _id = decodedObj;
// find the user
const user = await User.findById( _id);
  if(!user){
    throw new Error ("user doesnt exits");
  }
  // res.send(user);
  req.user = user;
   next();
}
  catch(err){
    res.status(404).send("ERROR :  " + err.message);
  }
};
module.exports ={
userAuth,
};