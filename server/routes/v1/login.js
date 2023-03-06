const routes = require('express').Router({mergeParams: true});
const loginController = require('../../controllers/login');
const { isAuth } = require("../../controllers/login");
const { check, validationResult } = require('express-validator')

// utilities
errorHandler = (err, req, res, next) => {
    res.status(500).json({ error: err.message || err })
}

userValidtor = [
  check("name").trim().not().isEmpty().withMessage("Name is missing"),
  check("email.data").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is missing")
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be 8 to 20 characters long"),
];

validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
      return res.json({ error: error[0].msg });
  }

  next();
};

validatePassword = [
  check("newPassword")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is missing")
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be 8 to 20 characters long"),
];

signInValidator = [
  check("email.data").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password").trim().not().isEmpty().withMessage("Password is missing"),
];

module.exports = (models) => {
    routes.get('/', loginController.login(models));
    routes.post("/sign-in", signInValidator, validate, loginController.signIn(models));
    routes.post("/create", userValidtor, validate, loginController.create(models));
    routes.post("/verify-email", loginController.verifyEmail(models));
    routes.post("/resend-email-verification-token", loginController.resendEmailVerificationToken(models));
    routes.post("/forget-password", loginController.forgetPassword(models));
    routes.post("/verify-pass-reset-token", loginController.sendResetPasswordTokenStatus, loginController.isValidPassResetToken(models));
    routes.post("/reset-password", 
        validatePassword,
        validate,
        loginController.isValidPassResetToken(models),
        loginController.resetPassword(models),
    );
    routes.get("/is-auth", isAuth, (req, res) => {
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
    return routes;
}