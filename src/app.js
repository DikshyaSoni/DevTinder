
const express= require ('express')

const app = express();


// request handler


// app.use("/hello",(req,res) =>{
//     res.send("hello 3000");
    
// });
app.get("/test",(req,res) =>{
        console.log(req.query);
    
    res.send({firstname: "dikshya" , secondname: "soni"});
    
});
app.post("/test/:testid/:name/:password",(req,res) =>{
    console.log(req.params);


    res.send("succestfully posted");

});
app.delete("/test",(req,res) =>{
    res.send("seuccesfully deleted");
});
// app.use("/test/2",(req,res) =>{
//     res.send(" server 4000");
    
// });

// app.use("/", (req, res) => {
//   res.send("Home");
// });
app.listen(4000 , ()=>{
    console.log("succesfuly created a server on port 4000");
});
