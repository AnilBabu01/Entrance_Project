const express = require("express");
const router = express.Router();
const BookController = require("../../Controllers/BookController");
const upload = require("../../Middleware/upload");
const AdminAuth = require("../../Middleware/AdminAuth");

router
  .route("/book/:id?", AdminAuth)
  .post(upload.single("pdf_book"), BookController.Createbook)
  .put(upload.single("pdf_book"), BookController.updatebook)
  .get(BookController.Getbooks)
  .delete(BookController.Deletebook);

  router
  .route("/block-book/:id")
  .get(AdminAuth, BookController.Blockbook);


module.exports = router;
