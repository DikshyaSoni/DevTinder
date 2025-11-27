
const express= require ('express')

const app = express();


app.get("/test",
    (req,res,next) =>{
        console.log("request handler");
    
        next();
        // res.send("first respoonse");

    
},

(req,res,next) => {
    console.log("2 request handler ");
    next();
    // res.send ("sec response");
},
(req,res,next) => {
    console.log("3 request handler ");
    res.send ("third response");
});
app.listen(4000 , ()=>{
    console.log("succesfuly created a server on port 4000");
});
