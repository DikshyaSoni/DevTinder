
const express= require ('express');


  const connectdb = require("./config/database");
connectdb();

const app = express();
connectdb()
    .then( ()=>{
        console.log("database connected succesfully")

        app.listen(4000 , ()=>{
            console.log("succesfuly created a server on port 4000");
        });
    })
     .catch(err => {
    console.error("database cannot be connected");
    
  });
