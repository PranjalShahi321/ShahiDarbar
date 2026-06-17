import express from "express"
import Razorpay from "razorpay"

const router = express.Router()

console.log(
  process.env.RAZORPAY_KEY_ID
);

console.log(
  process.env.RAZORPAY_KEY_SECRET
);

const razorpay = new Razorpay({

  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_KEY_SECRET,

})

/* CREATE ORDER */

router.post("/create-order", async (req, res) => {

  try {

    const options = {

      amount: req.body.amount * 100,

      currency: "INR",

      receipt: "receipt_order",

    }

    const order = await razorpay.orders.create(
      options
    )

    res.json(order)

  } catch (error) {
    console.log("RAZORPAY ERROR:");
    console.log(error);
  
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
})

export default router