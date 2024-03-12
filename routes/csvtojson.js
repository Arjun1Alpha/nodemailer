const express = require("express");
const router = express.Router();
const csvtojson = require("csvtojson");
const fs = require('fs');
const path = require('path');

router.route("/").get(async (req, res) => {
    const csvFilePath = path.join(__dirname, 'data.csv');
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading CSV file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        csvtojson()
            .fromString(data)
            .then((jsonObj) => {
                res.json(jsonObj);
            })
            .catch((conversionError) => {
                console.error('Error converting CSV to JSON:', conversionError);
                res.status(500).json({ error: 'Error converting CSV to JSON' });
            });
    });
});


module.exports = router;