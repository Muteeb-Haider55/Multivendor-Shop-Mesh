const catchAsyncErrors = require("../middlware/catchAsyncErrors.js");
const Messages = require("../models/messages.js");
const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler.js");
const { isAuthenticated } = require("../middlware/auth.js");
const { upload } = require("../multer.js");
const router = express.Router();

// Create new message
router.post(
  "/create-new-message",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData = req.body;
      if (req.files) {
        const files = req.files;
        const imageUrls = files.map((file) => `${file.fileName}`);

        messageData.images = imageUrls;
      }
      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Messages({
        conversationId: messageData.conversationId,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : [],
        text: messageData.text,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
