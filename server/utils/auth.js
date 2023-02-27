const jwt = require("jsonwebtoken");
const { sendError } = require("./helper");
const User = require("../models/user");
const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/passwordResetToken");
const { check, validationResult } = require('express-validator')

exports.isAuth = async (req, res, next) => {
  const token = req.headers?.authorization;
  const jwtToken = token.split("Bearer ")[1];

  // Check if token is valid
  if (!jwtToken) return sendError(res, "Invalid token");

  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const { userId } = decode;

  // Check if user is found
  const user = await User.findById(userId);
  if (!user) return sendError(res, "User not found");

  req.user = user;

  next();
};

exports.errorHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message || err })
}

exports.isValidPassResetToken = async (req, res, next) => {
  const { token, userId } = req.body;

  // Request type error
  if (!token.trim() || !isValidObjectId(userId))
      return sendError(res, "Invalid request!");

  // userId not matched
  const resetToken = await PasswordResetToken.findOne({ owner: userId });
  if (!resetToken)
      return sendError(res, "Unauthorized access, invalid request!");

  // OTP not matched
  const matched = await resetToken.compareToken(token);
  if (!matched) return sendError(res, "Unauthorized access, invalid request!");

  req.resetToken = resetToken;
  next();
};

exports.userValidtor = [
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

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
      return res.json({ error: error[0].msg });
  }

  next();
};

exports.validatePassword = [
  check("newPassword")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is missing")
      .isLength({ min: 8, max: 20 })
      .withMessage("Password must be 8 to 20 characters long"),
];

exports.signInValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password").trim().not().isEmpty().withMessage("Password is missing"),
];
