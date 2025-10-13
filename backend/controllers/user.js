const express = require("express");
const path = require("path");
const { upload } = require("../multer.js");
const { uploadBuffer, deleteByPublicId } = require("../utils/cloudinary.js");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler.js");
const fs = require("fs");
const sendMail = require("../utils/sendMail.js");
const catchAsyncErrors = require("../middlware/catchAsyncErrors.js");
const sendToken = require("../utils/jwtToken.js");
const { isAuthenticated } = require("../middlware/auth.js");

const router = express.Router();
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      // If a file was uploaded to memory, nothing was written to disk, so nothing to clean up here.
      return next(new ErrorHandler("User already exist", 400));
    }

    let avatar = null;
    if (req.file) {
      /* CLOUDINARY UPLOAD START - user avatar */
      try {
        const result = await uploadBuffer(req.file.buffer, "users");
        avatar = { public_id: result.public_id, url: result.secure_url };
      } catch (err) {
        console.error("Cloudinary upload error (create-user):", err);
        return next(new ErrorHandler("Image upload failed", 500));
      }
      /* CLOUDINARY UPLOAD END - user avatar */
    }

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: avatar,
    };
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate Your Account",
        message: `Hello ${user.name}, Please click this link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
//create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }
      const { name, email, password, avatar } = newUser;
      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User Already Exist", 400));
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Login User
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields", 400));
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User doesn't exists  ", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Please prvide correct information", 400));
      }
      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// Load User
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists  ", 400));
      }
      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
//Logout user
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Log Out Successful",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("user not found", 500));
      }
      const isPasswordValid = await user.comparePassword(password);
      if (isPasswordValid) {
        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        await user.save();
        res.status(201).json({
          success: true,
          user,
        });
      } else {
        return next(new ErrorHandler("Please provide the correct Info", 400));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// update user avatar
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existUser = await User.findById(req.user.id);

      // Delete previous avatar from Cloudinary if present
      if (existUser && existUser.avatar && existUser.avatar.public_id) {
        /* CLOUDINARY DELETE START - old user avatar */
        try {
          await deleteByPublicId(existUser.avatar.public_id);
        } catch (err) {
          console.error("Cloudinary delete error (update-avatar):", err);
          // proceed even if deletion fails
        }
        /* CLOUDINARY DELETE END - old user avatar */
      }

      if (!req.file) return next(new ErrorHandler("No image provided", 400));

      /* CLOUDINARY UPLOAD START - new user avatar */
      let uploaded;
      try {
        uploaded = await uploadBuffer(req.file.buffer, "users");
      } catch (err) {
        console.error("Cloudinary upload error (update-avatar):", err);
        return next(new ErrorHandler("Image upload failed", 500));
      }
      /* CLOUDINARY UPLOAD END - new user avatar */

      const user = await User.findByIdAndUpdate(
        req.user.id,
        {
          avatar: {
            public_id: uploaded.public_id,
            url: uploaded.secure_url,
          },
        },
        { new: true }
      );

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// update user address
router.put(
  "/update-user-address",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(
            `${req.body.addressType} Address already exists`,
            400
          )
        );
      }
      const existAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );
      if (existAddress) {
        Object.assign(existAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }
      await user.save();
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// delet user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        {
          $pull: { addresses: { _id: addressId } },
        }
      );
      const user = await User.findById(userId);
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");
      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
      }
      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password don't matched with each other", 400)
        );
      }
      user.password = req.body.newPassword;
      await user.save();
      res.status(200).json({
        success: true,
        message: "Password Updated Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
