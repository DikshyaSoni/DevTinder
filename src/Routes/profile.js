const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require ("../../middleware/auth");
const { validateEditData } = require("../utils/validation");
const { validateUpdatedPassword} = require("../utils/validation");
const user = require("../models/user");
const validator = require("validator"); 
const bcrypt = require("bcrypt");



profileRouter.get("/profile/view", userAuth ,async(req,res) => {
  try{
   const user =req.user;
  
  res.send(user);
  }catch(err){
    res.status(401).send("ERROR :  " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditData(req)) {
      throw new Error("edit request invalid"); 
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({ message: `${loggedInUser.firstName},Profile updated successfully `, data : loggedInUser });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
profileRouter.patch("/profile/change-password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    
    const isValid = await validateUpdatedPassword(req.user, oldPassword);
    if (!isValid) {
      throw new Error("Existing password is incorrect");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("New password is not strong enough");
    }

    req.user.password = await bcrypt.hash(newPassword, 10);
    await req.user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


module.exports = profileRouter;