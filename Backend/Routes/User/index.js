const express = require("express");
const app = express();
const Authentication = require("./Authentication");
const Data = require('./Data');

app.use("/", Authentication,Data);

module.exports = app;

