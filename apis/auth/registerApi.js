const { validationResult } = require("express-validator");

const admin = require("../../configs/firebase");
const formatter = require("../../helpers/formatter");
const User = require("../../models/User");

exports.registerApi = async (req, res) => {
  const { name, email, password } = req.body;
  let errors = validationResult(req).formatWith(formatter);

  if (!errors.isEmpty()) {
    errors = errors.mapped();
    res.status(400).json(errors);
    //console.log(errors);
  } else {
    try {
      const newUser = await admin.auth().createUser({
        displayName: name,
        email: email,
        password: password,
      });

      //set user data
      User.uid = newUser.uid;
      User.name = name;
      User.email = email;
      User.registeredOn = new Date();
      User.plan = "trial";

      const db = admin.firestore();

      await db.collection("userData").doc(newUser.uid).set(User);

      res.send("Registration successful. Please Login form Menu.");
      console.log("Registration successful");
    } catch (err) {
      if(err.code == 'auth/email-already-exists') {
        res.status(409).send(err.message);
      }
      else {
        res.status(500).send("Error 500! Registration failed. Please try again.");
      }
      console.log(err);
    }
  }
};
