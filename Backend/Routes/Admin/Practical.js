const express = require("express");
const router = express.Router();
const PracticalController = require("../../Controllers/PracticalController");
const upload = require("../../Middleware/upload");
const AdminAuth = require("../../Middleware/AdminAuth");

router
  .route("/practical/:id?", AdminAuth)
  .post(upload.single("pdf_practical"), PracticalController.Createpractical)
  .put(upload.single("pdf_practical"), PracticalController.updatepractical)
  .get(PracticalController.Getpracticals)
  .delete(PracticalController.Deletepractical);

  router
  .route("/block-practical/:id")
  .get(AdminAuth, PracticalController.Blockpractical);


module.exports = router;
