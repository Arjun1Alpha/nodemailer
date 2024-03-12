let pdfGenerator = require("../controllers/pdfGenerator.js")
const express = require("express");
const router = express.Router();
router.route('/').get(pdfGenerator);


module.exports = router;