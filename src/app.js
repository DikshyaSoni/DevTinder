
const express = require("express");
const app = express();

const connectdb = require("./config/database");

const User = require("./models/user");


app.use(express.json());
app.post("/signup", async (req, res) => {
  console.log(req.body);
  // creating a new instnce of a user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user signup succesfull");
  }
  catch (err) {
    res.status(401).send("error saving user" + err.message);
  }
});


// connectdb();
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