const express = require('express');
const router  = express.Router();


const fetch = require('node-fetch');

/* GET home page */
router.get("/home-page", (req, res, next) => {



  let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/v2/home_page";
  fetch(projectUrl)
  .then(response => response.json())
  .then(response => {
      res.json(response);
      console.log("after fetch result",response)} )
  .catch(err => console.log("internal machin",err));


 
});

module.exports = router;
