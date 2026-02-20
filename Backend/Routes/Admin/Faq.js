const express = require("express");
const router = express.Router();
const FaqController = require("../../Controllers/FaqController");

const AdminAuth = require("../../Middleware/AdminAuth");

router
  .route("/faq/:id?", AdminAuth)
  .post(FaqController.CreateFaq)
  .put(FaqController.updateFaq)
  .get(FaqController.GetFaqs)
  .delete(FaqController.DeleteFaq);


  router
  .route("/block-faq/:id")
  .get(AdminAuth, FaqController.BlockFaq);


module.exports = router;
