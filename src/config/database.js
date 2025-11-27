
const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dikshyasoni938:kMkBj70ti592dV0h@learn.34youiu.mongodb.net/devTinder"
    );
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    throw err;
  }
};

module.exports = connectdb;


module.exports = connectdb;


