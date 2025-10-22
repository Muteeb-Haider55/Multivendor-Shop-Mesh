const express = require("express");
const router = express.Router();
const Product = require("../models/product.js");
const catchAsyncErrors = require("../middlware/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const Shop = require("../models/shop.js");
const { upload } = require("../multer.js");
const { isSeller, isAuthenticated } = require("../middlware/auth.js");
const fs = require("fs");
const { uploadBuffer, deleteByPublicId } = require("../utils/cloudinary.js");
const Order = require("../models/order.js");
// Create Product
router.post(
  "/create-product",
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

        // Upload each file buffer to Cloudinary under 'products' folder
        for (const file of files) {
          // multer memoryStorage provides buffer
          const result = await uploadBuffer(file.buffer, "products");
          uploadedImages.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        const productData = req.body;
        productData.images = uploadedImages;
        productData.shop = shop;
        const product = await Product.create(productData);
        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all product of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

        const productData = await Product.findById(productId);

        if (!productData) {
          return next(new ErrorHandler("Product not found", 404));
        }

        // Ensure the authenticated seller owns this product
        if (!req.seller || String(req.seller._id) !== String(productData.shopId)) {
          return next(new ErrorHandler("Not authorized to delete this product", 403));
        }

        // Delete images from Cloudinary if public_id present
        if (Array.isArray(productData.images)) {
          for (const img of productData.images) {
            if (img && img.public_id) {
              try {
                await deleteByPublicId(img.public_id);
              } catch (err) {
                // log and continue; don't block deletion if a cloudinary delete fails
                console.error("Cloudinary delete error:", err);
              }
            }
          }
        }

        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
          return next(new ErrorHandler("Product not found or already deleted", 404));
        }

        res.status(200).json({
          success: true,
          message: "Product deleted Successfully",
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
// review fro a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;
      const product = await Product.findById(productId);
      const review = {
        user,
        rating,
        comment,
        productId,
        orderId,
      };
      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );
      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }
      let avg = 0;
      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });
      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });
      await Order.findByIdAndUpdate(
        orderId,
        {
          $set: { "cart.$[elem].isReviewed": true },
        },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );
      res.status(200).json({
        success: true,
        message: "Reviewed Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;
