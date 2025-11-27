
const express= require ('express')

const app = express();
const {adminAuth} = require ("../middleware/auth");

app.use ("/admin",adminAuth);

app.use ("/admin",adminAuth,(req,res,next) => {
    console.log("request handler");
    res.send("response  2");
});
app.listen(4000 , ()=>{
    console.log("succesfuly created a server on port 4000");
});
