//add models and migrate that models
const sequelize = require("./Connect");
const user = require("../Models/user.model");
const Admin = require("../Models/admin.modal");
const FAQ = require("../Models/faq.modal");
const Blog = require("../Models/blog.modal");
const TestCategory = require("../Models/testcategory.modal");
const Note = require('../Models/notes.modal');
const Test = require("../Models/test.modal");
const Course = require("../Models/course.modal");
const BlogCategory =require('../Models/blog.modal');
const Sem =require("../Models/sem.modal");
const Subject =require("../Models/subject.modal");
const Mission = require("../Models/mission.modal");
const WhatClientSay = require("../Models/whatsayclient.modal");
const Setting = require("../Models/settings.modal");
const Syllabus = require("../Models/syllabus.modal");
const Notes = require('../Models/notes.modal');
const Book =require("../Models/book.modal");
const Practical = require("../Models/practical.modal");
const QuestionModal = require("../Models/question.modal");
const TopScres = require("../Models/topscres.modal");
const Result = require("../Models/result.modal");
const Units = require("../Models/units.modal");

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
