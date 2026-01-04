const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const validateSignUpData = (req) => {
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("email not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong");
    }
};

const validateEditData = (req) => {
  const allowedToEdits = ["firstName", "lastName", "bio", "age", "skills"];
  return Object.keys(req.body).every((field) => allowedToEdits.includes(field));
};


const validateUpdatedPassword = async (user, oldPassword) => {
    // user = req.user
    // oldPassword = req.body.oldPassword
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(oldPassword, passwordHash);
    return isPasswordValid; 
};

module.exports = {
    validateSignUpData,
    validateEditData,
    validateUpdatedPassword
}