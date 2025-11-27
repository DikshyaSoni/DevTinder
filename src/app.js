
const express= require("express");
const app = express();

const connectdb = require("./config/database");

const User = require("./models/user");


app.use(express.json());
app.post("/signup", async(req,res) => {
  // creating a new instnce of a user model
res.send(req.body);
  try{

    await user.save();
    res.send("user signup succesfull");
  }
  catch(err){
res.status(401).send("error saving user");
  }
});

// connectdb();
connectdb()
.then( ()=>{
    console.log("database connected succesfully");
    
    app.listen(4000 , () => {
        console.log("succesfuly created a server on port 4000");
    });
})
.catch(err => {
    console.error("database cannot be connected");
    
});