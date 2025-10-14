const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail.js");
const sendToken = require("../utils/jwtToken.js");
const { isAuthenticated, isSeller } = require("../middlware/auth.js");
const { upload } = require("../multer.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const Shop = require("../models/shop.js");
const catchAsyncErrors = require("../middlware/catchAsyncErrors.js");
const sendShopToken = require("../utils/shopToken.js");
const { uploadBuffer, deleteByPublicId } = require("../utils/cloudinary.js");

//for register a new shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler("Shop Already Exist", 400));
    }

    let avatar = null;
    if (req.file) {
      /* CLOUDINARY UPLOAD START - user avatar */
      try {
        const result = await uploadBuffer(req.file.buffer, "shops");
        avatar = { public_id: result.public_id, url: result.secure_url };
      } catch (err) {
        console.error("Cloudinary upload error (create-shop):", err);
        return next(new ErrorHandler("Image upload failed", 500));
      }
      /* CLOUDINARY UPLOAD END - user avatar */
    }

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: avatar,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };
    //send activation token
    const activationToken = createActivationToken(seller);
    const activationUrl = `https://shop-mesh.vercel.app/seller/activation/${activationToken}`;
    try {
      await sendMail({
        email: seller.email,
        subject: "Activate Your shop",
        message: `Hello ${seller.name}, Please click this link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email ${seller.email} to activate your shop`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//create activation token function
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

//activate shop
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newSeller) {
        return next(new ErrorHandler("Invalid Token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;
      let seller = await Shop.findOne({ email });
      if (seller) {
        return next(new ErrorHandler("Shop Already Exist", 400));
      }
      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        phoneNumber,
        zipCode,
        address,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// for shop login

router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields", 400));
      }
      const shop = await Shop.findOne({ email }).select("+password");
      if (!shop) {
        return next(new ErrorHandler("Shop doesn't exists  ", 400));
      }
      const isPasswordValid = await shop.comparePassword(password);
      if (!isPasswordValid) {
        return next(new ErrorHandler("Please prvide correct information", 400));
      }
      sendShopToken(shop, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Load Shop

router.get(
  "/getseller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller.id);

      if (!seller) {
        return next(new ErrorHandler("Shop doesn't exists  ", 400));
      }
      res.status(200).json({ success: true, seller });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Logout  FROM SHOP
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
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

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Update shop profile pic
router.put(
  "/update-shop-avatar",
  isSeller,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existUser = await Shop.findById(req.seller._id);
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
        uploaded = await uploadBuffer(req.file.buffer, "shops");
      } catch (err) {
        console.error("Cloudinary upload error (update-avatar):", err);
        return next(new ErrorHandler("Image upload failed", 500));
      }
      /* CLOUDINARY UPLOAD END - new user avatar */

      const shop = await Shop.findByIdAndUpdate(
        req.seller._id,
        {
          avatar: {
            public_id: uploaded.public_id,
            url: uploaded.secure_url,
          },
        },
        { new: true }
      );

      res.status(200).json({ success: true, shop });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update shop info
router.put(
  "/update-shop-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;
      const shop = await Shop.findById(req.seller._id);
      if (!shop) {
        return next(new ErrorHandler("shop not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
