// const routes = require('express').Router({mergeParams: true});
// const loginController = require('../../controllers/login');

// module.exports = (models) => {
//     routes.get('/', loginController.login(models));
//     return routes;
// }

const express = require("express");
const {
  create,
  verifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  signIn,
} = require("../../controllers/login");
const { isAuth } = require("../../utils/auth");
const { isValidPassResetToken } = require("../../utils/auth");
const {
  userValidtor,
  validate,
  validatePassword,
  signInValidator,
} = require("../../utils/auth");
const router = express.Router();

router.post("/create", userValidtor, validate, create);
router.post("/sign-in", signInValidator, validate, signIn);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-pass-reset-token",
  isValidPassResetToken,
  sendResetPasswordTokenStatus
);
router.post(
  "/reset-password",
  validatePassword,
  validate,
  isValidPassResetToken,
  resetPassword
);
router.get("/is-auth", isAuth, (req, res) => {
  const { user } = req;
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    },
  });
});

module.exports = router;
