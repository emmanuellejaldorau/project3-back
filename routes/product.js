const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();


router.get("/phones/:id", (req,res,next) => {
  const {id} = req.params;
  const projectUrl = `"http://dev.paulettepaulette.com/admin/wp-json/wp/V2/products/${id}`;
  fetch(projectUrl)
    .then(response => response.json())
    .then(response => res.json(response))
    .catch(err => console.log(err));
  });

module.exports = router;

