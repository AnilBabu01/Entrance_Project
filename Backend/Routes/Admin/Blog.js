const express = require("express");
const router = express.Router();
const BlogController = require("../../Controllers/BlogController");
const upload = require("../../Middleware/upload");
const AdminAuth = require("../../Middleware/AdminAuth");

router
  .route("/blog/:id?", AdminAuth)
  .post(upload.single("img_url"), BlogController.CreateBlog)
  .put(upload.single("img_url"), BlogController.updateBlog)
  .get(BlogController.GetBlogs)
  .delete(BlogController.DeleteBlog);

  router
  .route("/block-blog/:id")
  .get(AdminAuth, BlogController.BlockBlog);


module.exports = router;
