const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const options = {
      amount: Number(req.body.amount) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    console.log("OPTIONS:", options);

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {
    console.log("========== ERROR ==========");
    console.log(err);
    console.log("MESSAGE:", err.message);

    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;