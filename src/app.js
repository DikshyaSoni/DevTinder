
const express= require ('express')

const app = express();


// request handler



app.use("/hello",(req,res) =>{
    res.send("hello 3000")
    
});
app.use("/test",(req,res) =>{
    res.send("hello from the server 4000")
    
});
app.listen(4000 , ()=>{
    console.log("succesfuly created a server on port 4000")
});
