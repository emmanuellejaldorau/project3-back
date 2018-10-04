const express = require("express");
const bcrypt = require("bcrypt");

const request = require('request');

const router = express.Router();

router.get("/account", (req, res, next) => {

  let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/v2/account";
  request.get(projectUrl)
    .on('error', err => next(err))
    .pipe(res);
  });

  router.get("/member-space", (req, res, next) => {

    let projectUrl = "http://dev.paulettepaulette.com/admin/wp-json/wp/v2/member_space";
    request.get(projectUrl)
      .on('error', err => next(err))
      .pipe(res);
    });



module.exports = router;