const emailjs = require("@emailjs/nodejs")
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");
const crypto = require("crypto");

// utilities
generateOTP = (otp_length = 6) => {
    let OTP = "";
    for (let i = 1; i <= otp_length; i++) {
        const randomVal = Math.round(Math.random() * 9);
        OTP += randomVal;
    }

    return OTP;
};

sendError = (res, error, statusCode = 401) =>
  res.status(statusCode).json({ error });

generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);
      const buffString = buff.toString("hex");

      resolve(buffString);
    });
  });
};

handleNotFound = (req, res) => {
  this.sendError(res, "Not found", 404);
};

const login = () => {
    return async (req, res, next) => {
        try {
            return res.status(200).json({
                success: true,
                message: 'success',
                data: "successful login"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
}

// user sign in
const signIn = (models) => {
  return async (req, res, next) => {
    const { email: {data}, password } = req.body;

    const user = await models.user.findOne({ 'email.data': data });
    if (!user) return sendError(res, "Email/Password mismatch!");
  
    const matched = await user.comparePassword(password);
    if (!matched) return sendError(res, "Email/Password mismatch!");
  
    const { _id, name, isVerified } = user;
    const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);
  
    res.json({
      user: { id: _id, name, data, token: jwtToken, isVerified },
    });
  }
}

// create a user on sign up
const create = (models) => {
  return async (req, res, next) => {
    const { name, email: {data}, password } = req.body;

    const oldUser = await models.user.findOne({ 'email.data': data });
    if (oldUser) return sendError(res, "This email is already in use");
  
    const newUser = new models.user({ name, email: {data}, password });
    await newUser.save();
  
    let OTP = generateOTP();
    const newEmailVerificationToken = new models.emailVerificationToken({
      owner: newUser._id,
      token: OTP,
    });
  
    await newEmailVerificationToken.save();

    var templateParams = {
      to_name: newUser.name,
      to_email: newUser.email.data,
      message: "You verification code: " + OTP,
    };
    emailjs
    .send('service_ihvcg7o', 'template_zck1flj', templateParams, {
      publicKey: 'A123nkzSrVLiFfq4B',
      privateKey: '_lEZmCaDezKB8zmpSYvEn',
    })
    .then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function (err) {
        console.log('FAILED...', err);
      },
    );
  
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  }
}

// Verify the email for user
const verifyEmail = (models) => {
  return async (req, res, next) => {
    const { userId, OTP } = req.body;
    if (!isValidObjectId(userId)) return sendError(res, "Invalid user");
    const user = await models.user.findById(userId);
    if (!user) return sendError(res, "user not found!", 404);
    if (user.isVerified) return sendError(res, "user is already verified");
  
    const token = await models.emailVerificationToken.findOne({ owner: userId });
    if (!token) return sendError(res, "token not found!");
  
    const isMatched = await token.compareToken(OTP);
    if (!isMatched) return sendError(res, "Please submit a valid OTP");
  
    user.isVerified = true;
    await user.save();
  
    await models.emailVerificationToken.findByIdAndDelete(token._id);
  
    var templateParams = {
      to_name: user.name,
      to_email: user.email.data,
      message: "You email is verified",
    };
    emailjs
    .send('service_ihvcg7o', 'template_zck1flj', templateParams, {
      publicKey: 'A123nkzSrVLiFfq4B',
      privateKey: '_lEZmCaDezKB8zmpSYvEn',
    })
    .then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function (err) {
        console.log('FAILED...', err);
      },
    );
  
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: jwtToken,
        isVerified: user.isVerified,
      },
      message: "Your email is verified.",
    });
  }
}

// resendEmailVerificationToken for user
const resendEmailVerificationToken = (models) => {
  return async (req, res, next) => {
    const { userId } = req.body;

    const user = await models.user.findById(userId);
    if (!user) return sendError(res, "user not found");
  
    if (user.isVerified)
      return sendError(res, "This email id is already verified");
  
    const alreadyHasToken = await models.emailVerificationToken.findOne({
      owner: userId,
    });
    if (alreadyHasToken)
      return sendError(
        res,
        "Only after one hour you can request for another token"
      );
  
    let OTP = generateOTP();
  
    const newEmailVerificationToken = new models.emailVerificationToken({
      owner: user._id,
      token: OTP,
    });
  
    await newEmailVerificationToken.save();
  
    var templateParams = {
      to_name: user.name,
      to_email: user.email.data,
      message: "You verification code: " + OTP,
    };
    emailjs
    .send('service_ihvcg7o', 'template_zck1flj', templateParams, {
      publicKey: 'A123nkzSrVLiFfq4B',
      privateKey: '_lEZmCaDezKB8zmpSYvEn',
    })
    .then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function (err) {
        console.log('FAILED...', err);
      },
    );
  
    res.json({
      message: "New OTP has been sent to your registered email accout.",
    });
  }
}

// forget password for user
const forgetPassword = (models) => {
  return async (req, res, next) => {
    const { email } = req.body;

    if (!email) return sendError(res, "Email is missing!");
  
    const user = await models.user.findOne({ 'email.data': email });
    if (!user) return sendError(res, "User not found!", 404);
  
    const alreadyHasToken = await models.passwordResetToken.findOne({ owner: user._id });
    if (alreadyHasToken)
      return sendError(
        res,
        "Only after one hour you can request for another token"
      );
  
    const token = await generateRandomByte();
    const newPasswordResetToken = await models.passwordResetToken({
      owner: user._id,
      token,
    });
    await newPasswordResetToken.save();
  
    // might needed to be updated, just for now
    const resetPasswordUrl = `http://localhost:3000/auth/reset-password?token=${token}&id=${user._id}`;
  
    var templateParams = {
      to_name: user.name,
      to_email: user.email.data,
      message: resetPasswordUrl,
    };
    emailjs
    .send('service_ihvcg7o', 'template_neanzpw', templateParams, {
      publicKey: 'A123nkzSrVLiFfq4B',
      privateKey: '_lEZmCaDezKB8zmpSYvEn',
    })
    .then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function (err) {
        console.log('FAILED...', err);
      },
    );
  
    res.json({ message: "Link sent to your email" });
  }
}

// reset password for user
const resetPassword = (models) => {
  return async (req, res, next) => {
    const { newPassword, userId } = req.body;

    const user = await models.user.findById(userId);
    const matched = await user.comparePassword(newPassword);
    if (matched)
      return sendError(
        res,
        "The new password must be different from the old one"
      );
  
    user.password = newPassword;
    await user.save();
  
    await models.passwordResetToken.findByIdAndDelete(req.resetToken._id);
  
    var templateParams = {
      to_name: user.name,
      to_email: user.email.data,
      message: "Password Reset Successfully",
    };
    emailjs
    .send('service_ihvcg7o', 'template_zck1flj', templateParams, {
      publicKey: 'A123nkzSrVLiFfq4B',
      privateKey: '_lEZmCaDezKB8zmpSYvEn',
    })
    .then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function (err) {
        console.log('FAILED...', err);
      },
    );
  
    res.json({
      message: "Password reset successfully, now you can use new password.",
    });
  }
}

// is-auth path
const isAuth = (models) => {
  return async (req, res, next) => {
      const token = req.headers?.authorization;
      const jwtToken = token.split("Bearer ")[1];
    
      // Check if token is valid
      if (!jwtToken) return sendError(res, "Invalid token");
    
      const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
      const { userId } = decode;
    
      // Check if user is found
      const user = await models.user.findById(userId);
      if (!user) return;
    
      req.user = user;
    
      next();
  }
}

// Get if it is valid reset token
const isValidPassResetToken = (models) => {
  return async (req, res, next) => {
      const { token, userId } = req.body;

      // Request type error
      if (!token.trim() || !isValidObjectId(userId))
          return sendError(res, "Invalid request!");
    
      // userId not matched
      const resetToken = await models.passwordResetToken.findOne({ owner: userId });
      if (!resetToken)
          return sendError(res, "Unauthorized access, invalid request!");
    
      // OTP not matched
      const matched = await resetToken.compareToken(token);
      if (!matched) return sendError(res, "Unauthorized access, invalid request!");
    
      req.resetToken = resetToken;
      next();
  }
}

const sendResetPasswordTokenStatus = (models) => {
  return async (req, res, next) => {
    res.json({ valid: true });
  }
}

module.exports = {
    login, 
    signIn, 
    create, 
    verifyEmail, 
    resendEmailVerificationToken, 
    forgetPassword, 
    resetPassword, 
    isAuth,
    isValidPassResetToken,
    sendResetPasswordTokenStatus
}