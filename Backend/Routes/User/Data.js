const express = require("express");
const router = express.Router();
const FaqController = require("../../Controllers/FaqController");
const WhatSayClientController = require("../../Controllers/WhatSayClientController");
const AdminController = require("../../Controllers/AdminController");
const BlogController = require("../../Controllers/BlogController");
const MasterController = require("../../Controllers/MasterController");
const TestController = require("../../Controllers/TestController");
const SyllabusController = require("../../Controllers/SyllabusController");
const NotesController = require("../../Controllers/NotesController");
const QuestionModalController = require("../../Controllers/QuestionModalController");
const BookController = require("../../Controllers/BookController");
const PracticalController = require("../../Controllers/PracticalController");
const MissionController = require("../../Controllers/MissionController");
const verifyToken = require("../../Middleware/Auth");

router.get("/get-faq", FaqController.GetFaqs);
router.get("/get-what-say-client", WhatSayClientController.GetWhatSayClients);
router.get("/get-settings", AdminController.GetSettings);
router.get("/get-blog-category", MasterController.GetBlogCategory);
router.get("/get-blogs/:id?", BlogController.GetBlogsByCategory);
router.get("/search-blog/:search?", BlogController.SearchBlog);
router.get("/get-latest-blogs", BlogController.GetLatestBlogs);
router.get("/GetBlogById/:id?", BlogController.GetBlogById);
// notes
router.get("/get-course", MasterController.GetAppCourse);
router.get("/get-course-by-id/:id", MasterController.GetCourseByID);
router.get("/getSem-by-courseId/:id", MasterController.GetSemByCourseId);
router.get(
  "/getSubject-by-courseIdAndSem/:courseId/:sem",
  MasterController.GetSubjectBySemIdAndCourseId
);

// syllabus
router.get(
  "/getSyllabus-by-ids/:courseId/:semId/:subjectId",
  SyllabusController.GetSyllabusByIds
);
// notes

router.get(
  "/getNotes-by-ids/:courseId/:semId/:subjectId",
  NotesController.GetSyllabusByIds
);

// old questions
router.get(
  "/getOldQuestions-by-ids/:courseId/:semId/:subjectId",
  QuestionModalController.GetOldQuestionModalByIds
);

// get Book By ids
router.get(
  "/getBooks-by-ids/:courseId/:semId/:subjectId",
  BookController.GetBookByIds
);

// Get practical by ids
router.get(
  "/getPracticals-by-ids/:courseId/:semId/:subjectId",
  PracticalController.GetPracticalByIds
);

// Get mission
router.get("/getmission", MissionController.GetmissionsWebSite);

router.get("/getSubject-by-id/:id", MasterController.GetSubjectId);

// test
router.get("/get-test-cetegory", MasterController.GetTestActiveCategory);
router.get(
  "/get-test/:category_id?/:course_id?",
  TestController.GetTestByCategoryIdCourseId
);
router.get(
  "/get-single-test/:id?/:category_id?/:course_id?",
  TestController.GetTestByIDs
);
router.get("/get-test-one/:courseId", TestController.GetTestOnlyOne);

router.post("/result", verifyToken, TestController.CreateResult);



router.get("/getnote_by_id/:id", NotesController.GetUnitByIds);

module.exports = router;
