const mongoose = require("mongoose");
const connectdb = async () =>{
  await  mongoose.connect( "mongodb+srv://dikshyasoni938:ht1mFUcm7IjHceN4@learn.34youiu.mongodb.net/devTinder");
};


module.exports = connectdb;

