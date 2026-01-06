const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      index : true,
      required: true,
      lowercase: true,
    },

    photoUrl: {
      type: String,
      default: "any link here",
    },

    lastName: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      default: "this is the default bio",
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value){
      if(!validator.isEmail(value)){
        throw new Error ("Email id not valid");
      }
    }
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
    },

    age: {
      type: Number,
      min: 18,
    },

    skills: {
      type: [String],
    
    },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("gender data is not valid");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);
userSchema.index({firstName :1, lastName :1});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id}  , "Devtinder@0709" , {expiresIn:"1d",
                 });
                 return token ;

            
}
userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this ;
    const passwordHash = user.password
           const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
           return isPasswordValid;
}
module.exports = mongoose.model("User", userSchema);


module.exports = mongoose.model("User", userSchema);
