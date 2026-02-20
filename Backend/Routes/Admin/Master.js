const express = require("express");
const router = express.Router();
const MasterController = require("../../Controllers/MasterController");

const AdminAuth = require("../../Middleware/AdminAuth");

router
  .route("/test-category/:id?", AdminAuth)
  .post(MasterController.CreateTestcategory)
  .put(MasterController.updateTestcategory)
  .get(MasterController.GetTestcategorys)
  .delete(MasterController.DeleteTestcategory);

router
  .route("/block-note-category/:id")
  .get(AdminAuth, MasterController.BlockTestcategory);

router
  .route("/course/:id?", AdminAuth)
  .post(MasterController.CreateCourse)
  .put(MasterController.updateCourse)
  .get(MasterController.GetCourse)
  .delete(MasterController.DeleteCourse);

router.route("/block-course/:id", AdminAuth).get(MasterController.BlockCourse);

router
  .route("/blog-category/:id?", AdminAuth)
  .post(MasterController.CreateBlogCategory)
  .put(MasterController.updateBlogCategory)
  .get(MasterController.GetBlogCategory)
  .delete(MasterController.DeleteBlogCategory);

router
  .route("/block-blog-category/:id", AdminAuth)
  .get(MasterController.BlockBlogCategory);

router
  .route("/sem/:id?", AdminAuth)
  .post(MasterController.CreateSem)
  .put(MasterController.updateSem)
  .get(MasterController.GetSem)
  .delete(MasterController.DeleteSem);

router
  .route("/subject/:id?", AdminAuth)
  .post(MasterController.CreateSubject)
  .put(MasterController.updateSubject)
  .get(MasterController.GetSubject)
  .delete(MasterController.DeleteSubject);

  router.get("/getSubject-by-courseIdAndSem/:courseId/:sem", MasterController.GetSubjectBySemIdAndCourseId);
  
  router
  .route("/getSem-by-courseId/:id", AdminAuth)
  .get(MasterController.GetSemByCourseId);

  

module.exports = router;
