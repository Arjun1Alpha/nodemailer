const express = require("express");
const router = express.Router();
const sendMail = require("../controllers/mailer.js")


router.route("/").post(sendMail)

module.exports = router;