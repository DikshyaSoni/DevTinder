const mongoose = require("mongoose");

const userSchema = new mongoose.schema({
        firstName: {
            type:string,
        },
    
        lastName: {
            type:string,
        },
    
     emailId: {
            type:string,
        },
});
module.exports =mongoose.model("User",userSchema)