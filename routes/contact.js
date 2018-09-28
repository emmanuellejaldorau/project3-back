const express = require('express');
const router = express.Router();

const request = require('request');
const fetch = require('node-fetch')

/* GET home page */
router.get("/contact", (req, res, next) => {



  let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/v2/contact_us";
  request.get(projectUrl)
    .on('error', err => next(err))
    .pipe(res);
  });

module.exports = router;