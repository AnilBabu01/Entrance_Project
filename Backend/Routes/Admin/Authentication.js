const express = require("express");
const router = express.Router();
const AuthController = require("../../Controllers/AuthController");
const verifyAdminToken = require("../../Middleware/AdminAuth");
const {
  RegisterAdminValidation,
  LoginAdminValidation,
} = require("../../Middleware/Validate");


router.post(
  "/registerAdmin",
  RegisterAdminValidation,
  AuthController.RegisterAdmin
);
router.post("/loginAdmin", LoginAdminValidation, AuthController.LoginAdmin);
router.get("/profileAdmin", verifyAdminToken, AuthController.GetAdminProfile);
router.post(
  "/updateAdminProfile",
  verifyAdminToken,
  AuthController.UpdateAdminProfile
);

module.exports = router;
