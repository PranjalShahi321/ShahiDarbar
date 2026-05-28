import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  orderItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    }
  ],

  totalPrice: {
    type: Number,
    required: true,
  },

  paymentMethod: {
    type: String,
    default: "Razorpay",
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true,
})

const Order = mongoose.model("Order", orderSchema)

export default Order