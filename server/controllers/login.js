const emailjs = require("@emailjs/nodejs")
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require("mongoose");
const crypto = require("crypto");

// Thanks to Sakshi for adding the userType parameter to optimize the duplicated structure of landlord. 

// Utilities
// Randomly generate an OTP of length of 6
generateOTP = (otp_length = 6) => {
    let OTP = "";
    for (let i = 1; i <= otp_length; i++) {
        const randomVal = Math.round(Math.random() * 9);
        OTP += randomVal;
    }

    return OTP;
};

// Send error with code 401
sendError = (res, error, statusCode = 401) =>
  res.status(statusCode).json({ error });

// Randomly generate a hex code for verification purpose of length of 30
generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);
      const buffString = buff.toString("hex");

      resolve(buffString);
    });
  });
};

// Send error with code 404
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
    // get user's data
    const { email: {data}, password, userType } = req.body;

    // Check if the email existes in database
    let user;
    if(userType === "landlord") {
      user = await models.landlord.findOne({ 'email': data });
    } else {
      user = await models.user.findOne({ 'email.data': data });
    }
    if (!user) return sendError(res, "Email does not exist!");
    
    // Check if the password matches the credential in database
    const matched = await user.comparePassword(password);
    if (!matched) return sendError(res, "Email/Password mismatch!");

    // Return user's credential and JWT token by concatenating userId and env JWT code
    const { _id, name, isVerified } = user;
    const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);
  
    res.json({
      user: { id: _id, name, data, token: jwtToken, isVerified, userType },
    });
  }
}

// create a user on sign up
const create = (models) => {
  return async (req, res, next) => {
    // get user's data
    const { name, email: {data}, password, userType } = req.body;

    // Check if the email existes in database
    let oldUser;
    if(userType === "landlord") {
      oldUser = await models.landlord.findOne({ 'email': data });
    } else {
      oldUser = await models.user.findOne({ 'email.data': data });
    }
    if (oldUser) return sendError(res, "This email is already in use");
  
    // Create a new user to database when it is a new email
    let newUser;
    if(userType === "landlord") {
      newUser = new models.landlord({ name, email: data, password });
    } else {
      newUser = new models.user({ name, email: {data}, password });
    }
    await newUser.save();

    const jwtToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
  
    // Generate the OTP
    // let OTP = generateOTP();
    // const newEmailVerificationToken = new models.emailVerificationToken({
    //   owner: newUser._id,
    //   token: OTP,
    // });

    // console.log("newEmailVerificationToken--------", newEmailVerificationToken);
  
    // // Save the user's id and OTP token to databse
    // await newEmailVerificationToken.save();

    // // Send actual email with otp to user by emailjs
    // var templateParams = {
    //   to_name: newUser.name,
    //   to_email: userType === "landlord" ? newUser.email : newUser.email.data,
    //   message: "You verification code: " + OTP,
    // };
    // emailjs
    // .send('service_ihvcg7o', 'template_zck1flj', templateParams, {
    //   publicKey: 'A123nkzSrVLiFfq4B',
    //   privateKey: '_lEZmCaDezKB8zmpSYvEn',
    // })
    // .then(
    //   function (response) {
    //     console.log('SUCCESS!', response.status, response.text);
    //   },
    //   function (err) {
    //     console.log('FAILED...', err);
    //   },
    // );

    console.log("----", jwtToken);
  
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: jwtToken,
        userType
      },
    });
  }
}

// Verify the email for user
const verifyEmail = (models) => {
  return async (req, res, next) => {
    // get user's data
    const { userId, OTP, userType } = req.body;

    // Validate the user's credentials
    if (!isValidObjectId(userId)) return sendError(res, "Invalid user");
    let user;
    if(userType === "landlord") {
      user = await models.landlord.findById(userId);
    } else {
      user = await models.user.findById(userId);
    }
    if (!user) return sendError(res, "user not found!", 404);
    if (user.isVerified) return sendError(res, "user is already verified");
  
    // Check is the OTP mathches the token in database
    const token = await models.emailVerificationToken.findOne({ owner: userId });
    if (!token) return sendError(res, "token not found!");
  
    const isMatched = await token.compareToken(OTP);
    if (!isMatched) return sendError(res, "Please submit a valid OTP");
  
    user.isVerified = true;
    await user.save();
  
    await models.emailVerificationToken.findByIdAndDelete(token._id);
  
    // Send actual email by emailjs after verifying email
    var templateParams = {
      to_name: user.name,
      to_email: userType === "landlord" ? user.email : user.email.data,
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

    // Return user's credential and JWT token by concatenating userId and env JWT code
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: jwtToken,
        isVerified: user.isVerified,
        userType
      },
      message: "Your email is verified.",
    });
  }
}

// resendEmailVerificationToken for user
const resendEmailVerificationToken = (models) => {
  return async (req, res, next) => {
    // get user's id
    const { userId } = req.body;

    // Check if the user id in datacase
    const user = await models.user.findById(userId);
    if (!user) return sendError(res, "user not found");
  
    // Check if the user id is verified
    if (user.isVerified)
      return sendError(res, "This email id is already verified");
  
    // Check if the verification email is sent
    const alreadyHasToken = await models.emailVerificationToken.findOne({
      owner: userId,
    });
    if (alreadyHasToken)
      return sendError(
        res,
        "Only after one hour you can request for another token"
      );
  
    let OTP = generateOTP();
  
    // Save user id and otp to database
    const newEmailVerificationToken = new models.emailVerificationToken({
      owner: user._id,
      token: OTP,
    });
  
    await newEmailVerificationToken.save();
  
    // Send actual email with otp to user by emailjs
    var templateParams = {
      to_name: user.name,
      to_email: userType === "landlord" ? user.email : user.email.data,
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
    // Get user data 
    const { email, userType } = req.body;

    // Check if there is email input
    if (!email) return sendError(res, "Email is missing!");

    // CHeck if the user's email in database
    let user;
    if(userType === "landlord") {
      user = await models.landlord.findOne({ 'email': email });
    } else {
      user = await models.user.findOne({ 'email.data': email });
    }
  
    if (!user) return sendError(res, "User not found!", 404);
  
    // Check if a email is already sent
    const alreadyHasToken = await models.passwordResetToken.findOne({ owner: user._id });
    if (alreadyHasToken)
      return sendError(
        res,
        "Only after one hour you can request for another token"
      );
  
    // Generate the token and save it with user id to database
    const token = await generateRandomByte();
    const newPasswordResetToken = await models.passwordResetToken({
      owner: user._id,
      token,
    });
    await newPasswordResetToken.save();
  
    // Generate reset passowrd url and send it to user
    let resetPasswordUrl;
    if(userType === "landlord") {
      resetPasswordUrl = `http://localhost:3000/auth/landlord/reset-password?token=${token}&id=${user._id}`;
    } else {
      resetPasswordUrl = `http://localhost:3000/auth/user/reset-password?token=${token}&id=${user._id}`;
    }
  
    
    var templateParams = {
      to_name: user.name,
      to_email: userType === "landlord" ? user.email : user.email.data,
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
    // Get user's data
    const { newPassword, userId, userType } = req.body;
    
    // Check if the user has a new password and update new password to database
    let user;
    if(userType === "landlord") {
      user = await models.landlord.findById(userId)
    } else {
      user = await models.user.findById(userId);
    }

    const matched = await user.comparePassword(newPassword);
    if (matched)
      return sendError(
        res,
        "The new password must be different from the old one"
      );
  
    user.password = newPassword;
    await user.save();
  
    // Delete the reset password request in database
    await models.passwordResetToken.findByIdAndDelete(req.resetToken._id);
  
    // Send reset password status by emailjs
    var templateParams = {
      to_name: user.name,
      to_email: userType === "landlord" ? user.email : user.email.data,
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

      // Get user's token from header
      const token = req.headers?.authorization;
      const jwtToken = token.split("Bearer ")[1];
    
      // Check if token is valid
      if (!jwtToken) return sendError(res, "Invalid token");
    
      const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
      const { userId } = decode;
    
      // Check if user is found
      let user;
      if(req.headers.usertype === "landlord") {
        user = await models.landlord.findById(userId);
      } else {
        user = await models.user.findById(userId);
      }
      if (!user) return sendError(res, "User not found");
    
      req.user = user;
    
      next();
  }
}

// Get if it is valid reset token
const isValidPassResetToken = (models) => {
  return async (req, res, next) => {
      // Get user's token from header
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