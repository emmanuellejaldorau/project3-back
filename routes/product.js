const express = require("express");
const router = express.Router();

const fetch = require('node-fetch');

const User = require("../models/user-model.js");

router.get("/women-category", (req,res,next) => {
  let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/v2/women";
  fetch(projectUrl)
    .then(response => response.json())
    .then(response => {
      res.json(response);
      // console.log(response);
    })
    .catch(err => console.log(err));
  });


router.get("/men-category", (req,res,next) => {
  let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/v2/men";
  fetch(projectUrl)
    .then(response => response.json())
    .then(response => {
      res.json(response);
      // console.log(response);
    })
    .catch(err => console.log(err));
  });

router.get("/products", (req,res,next) => {
  let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/V2/products?per_page=100";
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
  res.json(userDoc);
  })
  .catch(err => next(err))


})

router.post("/remove-from-wish-list", (req,res,next)=> {

  const {userId, productId } = req.body;
  console.log( req.body)
  User.findByIdAndUpdate(
    userId, // which document(s)?
    { $pull: { wishList: productId } }, // what changes?
    { runValidators: true } // additional settings
)
  .then(userDoc => {
  console.log(userDoc);
  res.json(userDoc);
  })
  .catch(err => next(err))


})

router.put("/wish-list-products", (req,res,next) => {

  const {wishListArray} = req.body;

  let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/V2/products";
  fetch(projectUrl)
    .then(response => response.json())
    .then(response => {
      filtredArrayProduct = response.filter(oneProduct => {
        return wishListArray.some(oneId=> oneProduct.id == oneId)
      })
      res.json(filtredArrayProduct);
    })
    .catch(err => console.log(err));
  });



module.exports = router;

