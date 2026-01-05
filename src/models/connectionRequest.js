const mongoose = require("mongoose");

const connectionRequestSchema =  new mongoose.Schema(
    {
        fromUserId :{
                   type:mongoose.Schema.Types.ObjectId,
                   required :true,
        },

        toUserId:{

                   type:mongoose.Schema.Types.ObjectId,
                   required : true,
        },
        status : {
            type:String,
            required :true ,
            enum : {
                values : [ "ignored","accepted","interested","rejected"],
                message : `{value} is incorrect message type`
            },
        },
    },
    {
        timestamps : true
    }
);

connectionRequestSchema.index({fromUserId :1, toUsserId : 1});
// Use NORMAL function (not async) to get next()
connectionRequestSchema.pre("save", function () {
  const connectionRequest = this;

  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
  
  throw new Error('cant send request to yourself');
  }
});
const connectionRequest = new mongoose.model(
    "connectionRequest",connectionRequestSchema
);
module.exports = connectionRequest;