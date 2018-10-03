const express = require("express");
const router = express.Router();

const fetch = require('node-fetch');


router.get("/women-category", (req,res,next) => {
  let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/v2/women";
  fetch(projectUrl)
    .then(response => response.json())
    .then(response => {
      res.json(response);
      console.log(response);
    })
    .catch(err => console.log(err));
  });


router.get("/men-category", (req,res,next) => {
  let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/v2/men";
  fetch(projectUrl)
    .then(response => response.json())
    .then(response => {
      res.json(response);
      console.log(response);
    })
    .catch(err => console.log(err));
  });

router.get("/products", (req,res,next) => {
  let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/V2/products";
  fetch(projectUrl)
    .then(response => response.json())
    .then(response => {
      res.json(response);
      console.log(response);
    })
    .catch(err => console.log(err));
  });


router.get("/products/:id", (req,res,next) => {
  let {id} = req.params;
  let projectUrl = `http://dev.paulettepaulette.com/admin/wp-json/wp/V2/products/${id}`;
  fetch(projectUrl)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      res.json(response)})
    .catch(err => console.log(err));
  });

module.exports = router;

