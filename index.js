"use strict";
const express = require("express");
const sampleJson = require("./jsonData.json");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
dotenv.config({});
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let emailRoute = require("./routes/mail")
let emailPDF = require("./routes/pdf")
let csvtojson = require("./routes/csvtojson")
app.use("/api/send-mail",emailRoute)
app.use("/api/generateCertificate",emailPDF)
app.use("/api/csvtojson",csvtojson)

// app.get("/", (req, res) => {
//     res.send({"message": "Hello World"});
// })
// app.get("/json", (req, res) => {
//     res.send(sampleJson);
// })
// app.post("/api",emailRoute )
app.post("/test-table-data", (req, res) => {
    console.log(req.body);
    res.send({"message": req.body});
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})