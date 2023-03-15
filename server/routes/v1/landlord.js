const routes = require('express').Router({mergeParams: true})
const landlordController = require("../../controllers/landlord")
const { check, validationResult } = require('express-validator')

// utilities
const errorHandler = (err, req, res, next) => {
    res.status(500).json({ error: err.message || err })
}

// Validate user's credential format on sign-up
const userValidtor = [
  check("name").trim().not().isEmpty().withMessage("Name is missing"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is missing")
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be 8 to 20 characters long"),
];

// Validate user's credential format
const validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
      return res.json({ error: error[0].msg });
  }

  next();
};

// Validate user's credential format on reset password
const validatePassword = [
  check("newPassword")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is missing")
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be 8 to 20 characters long"),
];

// Validate user's credential format on sign-in
const signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password").trim().not().isEmpty().withMessage("Password is missing"),
];

/**
 * Routes to perform CRUD operations on landlord
 */
module.exports = (models) => {
    routes.post('/', landlordController.createLandlord(models));
    routes.put('/:id', landlordController.updateLandlord(models));
    routes.get('/:id', landlordController.getLandlordInfoById(models));
    routes.get('/profilepic/:id', landlordController.getLandlordProfilePicById(models));
    routes.post("/sign-in-landlord", signInValidator, validate, landlordController.signIn(models));
    routes.post("/create-landlord", userValidtor, validate, landlordController.create(models));
    routes.post("/verify-email-landlord", landlordController.verifyEmail(models));
    routes.post("/resend-email-verification-token-landlord", landlordController.resendEmailVerificationToken(models));
    routes.post("/forget-password-landlord", landlordController.forgetPassword(models));
    routes.post("/verify-pass-reset-token-landlord", landlordController.sendResetPasswordTokenStatus, landlordController.isValidPassResetToken(models));
    routes.post("/reset-password-landlord", 
        validatePassword,
        validate,
        landlordController.isValidPassResetToken(models),
        landlordController.resetPassword(models),
    );
    routes.get("/is-auth-landlord", landlordController.isAuth(models), (req, res) => {
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