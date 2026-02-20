const express = require("express");
const router = express.Router();
const AuthController = require("../../Controllers/AuthController");
const verifyToken = require("../../Middleware/Auth");
const upload = require("../../Middleware/upload");

const {
  RegisterValidation,
  LoginValidation,
} = require("../../Middleware/Validate");

router.post("/register", RegisterValidation, AuthController.Register);
router.post("/resendOtp", RegisterValidation, AuthController.ResendOtp);
router.post("/verify", AuthController.VerifyOtp);

router.post("/forgotPassword", AuthController.ForgotPassword);
router.post("/ResendForgotOtp", AuthController.ResendForgotOtp);
router.post("/VerifyAndChangePassword", AuthController.VerifyAndChangePassword);

router.post("/login", LoginValidation, AuthController.Login);
router.get("/user", verifyToken, AuthController.GetUser);
router.put(
  "/updateProfile",
  upload.single("profileUrl"),
  verifyToken,
  AuthController.UpdateProfile
);

module.exports = router;


