const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middlware/catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const { isAuthenticated, isSeller } = require("../middlware/auth.js");
const Order = require("../models/order");
const Product = require("../models/product.js");

// create new order
router.post(
  "/create-order",

  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
      // group cart items by shopId
      const shopItemsMap = new Map();
      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }
      // create an order for each shop
      const orders = [];
      for (const [shopId, items] of shopItemsMap) {
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        orders.push(order);
      }

      res.status(201).json({ success: true, orders });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

//get all orders of a user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all order of a seller

router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
//  Update order status by seller for user
// router.put(
//   "/update-order-status/:id",
//   isSeller,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const order = await Order.findById(req.params.id);
//       if (!order) {
//         return next(new ErrorHandler("Order not found", 400));
//       }
//       if (req.body.status === "Transfered to delivery partener") {
//         order.cart.forEach(async (o) => {
//           await UpdateProduct(o._id, o.qty);
//         });
//       }

//       order.status = req.body.status;
//       if (req.body.status === "Delivered") {
//         order.deliveredAt = Date.now();
//         order.paymentInfo.status = "Succeeded";
//       }
//       await order.save({ validateBeforeSave: false });
//       res.status(200).json({
//         success: true,
//         order,
//       });
//       async function UpdateProduct(id, qty) {
//         const product = await Product.findById(id);

//         product.stock -= qty;
//         product.sold_out += qty;
//         await product.save({ validateBeforeSave: false });
//       }
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   })
// );

// chatgpt code

router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new ErrorHandler("Order not found", 400));
      }

      if (req.body.status === "Transfered to delivery partener") {
        for (const o of order.cart) {
          await UpdateProduct(o._id, o.qty);
        }
      }

      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
      }

      await order.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        order,
      });

      async function UpdateProduct(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// refund
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new ErrorHandler("Order not found", 400));
      }

      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        order,
        message: "order refund request successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
// accept the refund ===seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      order.status = req.body.status;

      await order.save();
      res.status(200).json({
        success: true,
        message: "Order refund successful",
      });
      if (req.body.status === "Refund Success") {
        for (const o of order.cart) {
          await UpdateProduct(o._id, o.qty);
        }
      }

      async function UpdateProduct(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
