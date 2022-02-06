'use strict'
const router = require("express").Router();
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

//Receive user mail and send some text to their mail
router.post("/", async (req, res) => {
    let userMail = req.body.userMail;
    // console.log('user mail: '+userMail);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.MY_MAIL,
        pass: process.env.MY_MAIL_PASSWORD
      }
    }));

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "Figures shop 👻 "+ process.env.MY_MAIL, // sender address
      to: userMail, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    },
    function(error, info){
      if (error) {
        console.dir(error);
        res.status(500).json(error);
      } else {
        // console.log("Message ID: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
        res.status(200).json(info);
      }
    });
});

module.exports = router;
