const adminAuth = (req,res,next) => {
    console.log("authorixation is initialized");
      const token = "xyz";
    const isauthorization = token == "xyz";
    if(!isauthorization){
        res.status(400).send("unauthorized");

    }
    else{
        next();
    }

   
};
module.exports ={
adminAuth,
};