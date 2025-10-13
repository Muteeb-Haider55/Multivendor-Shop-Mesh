const express = require("express");
const router = express.Router();
const Product = require("../models/product.js");
const catchAsyncErrors = require("../middlware/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const Shop = require("../models/shop.js");
const { upload } = require("../multer.js");
const { isSeller } = require("../middlware/auth.js");
const Event = require("../models/event.js");
const fs = require("fs");
const { uploadBuffer, deleteByPublicId } = require("../utils/cloudinary.js");
// Create Event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Invaid shop id", 400));
      } else {
        const files = req.files || [];
        const uploadedImages = [];
        for (const file of files) {
          const result = await uploadBuffer(file.buffer, "products");
          uploadedImages.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
        const eventData = req.body;
        eventData.images = uploadedImages;
        eventData.shop = shop;
        const event = await Event.create(eventData);
        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all events of a shop
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete product of a shop
router.delete(
  "/delete-shop-event/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const eventId = req.params.id;
      const eventData = await Event.findById(eventId);

      for (const img of eventData.images) {
        if (img && img.public_id) {
          try {
            await deleteByPublicId(img.public_id);
          } catch (err) {
            console.error("Cloudinary delete error:", err);
          }
        } else if (typeof img === "string") {
          const filename = img;
          const filePath = `uploads/${filename}`;
          fs.unlink(filePath, (err) => {
            if (err) console.log(err);
          });
        }
      }

      const event = await Event.findByIdAndDelete(eventId);
      if (!event) {
        return next(new ErrorHandler("product not fount with this is", 500));
      }
      res.status(201).json({
        success: true,
        message: "Event deleted Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all events
router.get(
  "/get-all-events",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find();
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
