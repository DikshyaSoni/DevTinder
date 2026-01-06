
const express = require("express");
const app = express();
const connectdb = require("./config/database");
const User = require("./models/user");
// const user = require("./models/user");
const{validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require ("../middleware/auth")


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./Routes/Auth");
const profileRouter = require("./Routes/profile");
const requestRouter = require("./Routes/requests");
const userRouter = require("./Routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/",userRouter);


connectdb()
  .then(() => {
    console.log("database connected succesfully");

    app.listen(4000, () => {
      console.log("succesfuly created a server on port 4000");
    });
  })
  .catch(err => {
    console.error("database cannot be connected");

  });