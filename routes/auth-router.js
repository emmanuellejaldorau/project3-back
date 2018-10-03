const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user-model.js");

const router = express.Router();

router.post("/signup", (req, res, next) => {

  const { fullName, email, originalPassword } = req.body;
console.log(req.body)
  // encrypt the submitted password
  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({ fullName, email, encryptedPassword })
    .then(userDoc => {
      // save a flash message to display in the HOME page
      req.logIn(userDoc, () => {
        userDoc.encryptedPassword= undefined;
        res.json({userDoc});
    })
    })
    .catch(err => next(err));
});



router.post("/login", (req, res, next) => {
  const { email, originalPassword } = req.body;

  // first check to see if there's a document with that email
  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      // "userDoc" will be empty if the email is wrong (no document in database)
      if (!userDoc) {
        next(new Error("Incorrect email."))
        return; // use "return" instead of a big "else {}"
      }

      // second check the password
      const { encryptedPassword } = userDoc;
      // "compareSync()" will return false if the "originalPassword" is wrong
      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        // save a flash message to display in the LOGIN page
        next(new Error("Incorrect Password."))
        return;
      }

      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userDoc, () => {
        userDoc.encryptedPassword= undefined;
        res.json({userDoc});
    })
    .catch(err => next(err));
});
});


router.delete("/logout", (req, res, next) => {
  // "req.logOut()" is a Passport method that removes the user ID from session
  req.logOut();
  res.json({userDoc: null});
});

router.get("/checklogin", (req,res,next) => {
  if(req.user){
    req.user.encryptedPassword= undefined;
    res.json({userDoc: req.user});
  }
  else{
    res.json({userDoc: null});
  }
  
  });


  router.put("/edit-user", (req, res, next) => {
    const { currentUser, fullName, email } = req.body;
    const  id  = currentUser._id;
    
  
    User.findByIdAndUpdate(
      id,
      { $set: { fullName, email } },
      // "new" gets the updated version of the document
      { runValidators: true, new: true }
    )
      .then(UserDoc => res.json(UserDoc))
      .catch(err => next(err));
  });




module.exports = router;