const express = require("express");
const router = express.Router();

const fetch = require('node-fetch');

const User = require("../models/user-model.js");

router.get("/products", (req,res,next) => {
  let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/V2/products";
  fetch(projectUrl)
    .then(response => response.json())
    .then(response => {
      res.json(response);
      // console.log(response);
    })
    .catch(err => console.log(err));
  });


router.get("/products/:id", (req,res,next) => {
  let {id} = req.params;
  let projectUrl = `http://dev.paulettepaulette.com/admin/wp-json/wp/V2/products/${id}`;
  fetch(projectUrl)
    .then(response => response.json())
    .then(response => {
      // console.log(response);
      res.json(response)})
    .catch(err => console.log(err));
  });


router.post("/add-to-wish-list", (req,res,next)=> {

  const {userId, productId } = req.body;
  console.log( req.body)
  User.findByIdAndUpdate(
    userId, // which document(s)?
    { $push: { wishList: productId } }, // what changes?
    { runValidators: true } // additional settings
)
  .then(userDoc => {
  console.log(userDoc);
  })
  .catch(err => next(err))


})



module.exports = router;

