const express = require("express");
const app = express();

const Authentication = require("./Authentication");
const Admin = require("./Admin");
const Faq = require("./Faq");
const Master = require("./Master");
const Blog = require("./Blog");
const Mission = require("./Mission");
const WhatSay = require("./WhatSay");
const Notes = require("./Notes");
const Practical = require("./Practical");
const Book = require("./Book");
const Syllabus = require("./Syllabus");
const Question = require('./QuestionModal');
const Test = require('./Test');

app.use(
  "/",
  Authentication,
  Admin,
  Faq,
  Master,
  Blog,
  Mission,
  WhatSay,
  Notes,
  Practical,
  Book,
  Syllabus,
  Question,
  Test
);

module.exports = app;
