const express = require("express");
const catchAsyncErrors = require("../middlware/catchAsyncErrors");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        metadata: {
          company: "Shop Mesh",
        },
      });
      console.log(myPayment);
      res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error,
      });
    }
  })
);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
      stripeApikey: process.env.STRIPE_API_KEY,
    });
  })
);

module.exports = router;
