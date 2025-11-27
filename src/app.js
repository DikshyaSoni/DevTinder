
const express= require ('express')

const app = express();



app .use("/",(err,req,res,next) => {
    if(err){
        res.send("soething went wrong")
    }
});
app.get("/admin",(req,res) => {
    // try{
        throw new Error("dhgj");

        res.send("admin data");
    // }
    // catch(err){
// res.status(401).send("some error  contact support team");
    // }

    
});
app .use("/",(err,req,res,next) => {
    if(err){
        res.send("soething wrong")
    }
});

app.listen(4000 , ()=>{
    console.log("succesfuly created a server on port 4000");
});
