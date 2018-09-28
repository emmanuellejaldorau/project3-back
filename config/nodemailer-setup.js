const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.gmail_email,
    pass: process.env.gmail_password,
  },
});


function sendMessage(userDoc) {
  const { fullName, email, message } = userDoc;

  return transport.sendMail({
    from: `${fullName} <${email}>`,
    to: "OWNER MAIL",
    subject: "New message from your website",
    text: `${message}`,
    html: `${message}`,
  });
}


module.exports = { sendSignupMessage };