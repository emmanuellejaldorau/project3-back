const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const request = require('request');


const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.gmail_email,
    pass: process.env.gmail_password,
  },
});


router.post('/send-email', (req, res, next) => {


  let { fullName, email, message } = req.body;

  transport.sendMail({
    from: `${fullName} <${email}>`,
    to: process.env.gmail_email,
    subject: "New customer email from your website 🕶!",
    text: `${message}`,
    html: `
    <h2>Hello Pauline!</h2>
    <h3>You have just received a new message from ${fullName}.</h3>
    <br />
    <h3>Message</h3>
    <p>${message}</p>
    <br />
    <p>You can respond to this mail : ${email}</p>
    `,
  })
    .then(info => res.json(info))
    .catch(error => console.log(error));
});


module.exports = router;
