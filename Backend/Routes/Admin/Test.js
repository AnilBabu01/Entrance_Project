const express = require("express");
const router = express.Router();
const TestController = require("../../Controllers/TestController");

const AdminAuth = require("../../Middleware/AdminAuth");

router
  .route("/test/:id?", AdminAuth)
  .post(TestController.CreateTest)
  .put(TestController.updateTest)
  .get(TestController.GetTests)
  .delete(TestController.DeleteTest);

router.route("/block-test/:id").get(AdminAuth, TestController.BlockTest);



module.exports = router;
