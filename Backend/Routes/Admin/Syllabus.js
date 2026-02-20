const express = require("express");
const router = express.Router();
const SyllabusController = require("../../Controllers/SyllabusController");

const AdminAuth = require("../../Middleware/AdminAuth");

router
  .route("/syllabus/:id?", AdminAuth)
  .post(SyllabusController.CreateSyllabus)
  .put(SyllabusController.updateSyllabus)
  .get(SyllabusController.GetSyllabuss)
  .delete(SyllabusController.DeleteSyllabus);


  router
  .route("/block-syllabus/:id")
  .get(AdminAuth, SyllabusController.BlockSyllabus);


module.exports = router;
