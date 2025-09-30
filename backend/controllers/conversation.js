const catchAsyncErrors = require("../middlware/catchAsyncErrors.js");
const Conversation = require("../models/conversation.js");
const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler.js");
const { isAuthenticated, isSeller } = require("../middlware/auth.js");
const router = express.Router();

// create a new conversation
router.post(
  "/create-new-conversation",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;
      const isConcersationExist = await Conversation.findOne({ groupTitle });
      if (isConcersationExist) {
        const conversation = isConcersationExist;
        res.status(201).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await Conversation.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });

        res.status(201).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  })
);
//  get seller converstions

router.get(
  "/get-all-conversation-seller/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });
      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  })
);

module.exports = router;
