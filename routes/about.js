const express = require('express');
const router = express.Router();

const request = require('request');

/* GET home page */
router.get("/about", (req, res, next) => {



  let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/v2/about";
  request.get(projectUrl)
    .on('error', err => next(err))
    .pipe(res);


});

module.exports = router;