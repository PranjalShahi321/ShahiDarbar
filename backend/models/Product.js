import mongoose from "mongoose"

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1542838132-92c53300491e",
  },

  description: {
    type: String,
    default: "",
  },

  category: {
    type: String,
    default: "General",
  },

}, {
  timestamps: true,
})

const Product = mongoose.model("Product", productSchema)

export default Product