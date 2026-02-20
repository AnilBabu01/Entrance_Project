const express = require("express");
const router = express.Router();
const QuestionModalController = require("../../Controllers/QuestionModalController");

const AdminAuth = require("../../Middleware/AdminAuth");

router
  .route("/question-modal/:id?", AdminAuth)
  .post(QuestionModalController.CreatequestionModal)
  .put(QuestionModalController.updatequestionModal)
  .get(QuestionModalController.GetquestionModals)
  .delete(QuestionModalController.DeletequestionModal);


  router
  .route("/block-question-modal/:id")
  .get(AdminAuth, QuestionModalController.BlockquestionModal);


module.exports = router;
