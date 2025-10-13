require("dotenv").config();

const express = require("express");
const catchAsyncErrors = require("../middlware/catchAsyncErrors");
const router = express.Router();

let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  try {
    stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  } catch (err) {
    console.error("Stripe initialization error:", err.message || err);
    stripe = null;
  }
} else {
  console.warn(
    "STRIPE_SECRET_KEY not set — payment routes will return an error until configured."
  );
}

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    try {
      if (!stripe) {
        return res
          .status(500)
          .json({ success: false, message: "Stripe not configured on server" });
      }
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
