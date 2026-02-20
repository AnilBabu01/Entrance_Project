const express = require("express");
const router = express.Router();
const AdminController = require("../../Controllers/AdminController");
const AdminAuth = require("../../Middleware/AdminAuth");
const upload = require("../../Middleware/upload");
router
  .route("/settings/:id?", AdminAuth)
  .put(upload.fields([
    { name: "about_img", maxCount: 1 },
    { name: "home_screen_img", maxCount: 1 },
    { name: "entrance_img", maxCount: 1 },
    { name: "signin_img", maxCount: 1 },
    { name: "signup_img", maxCount: 1 }
  ]),AdminController.UpdateSettings)
  .get(AdminController.GetSettings);

router.route("/Dashboard", AdminAuth).get(AdminController.Dashboard);

module.exports = router;



