const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
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
      validate(value){
          if (value.length > 10) {
      throw new Error("Skills cannot be more than 10");
        }
      },
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

module.exports = mongoose.model("User", userSchema);


module.exports = mongoose.model("User", userSchema);
