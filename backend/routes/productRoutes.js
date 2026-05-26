import express from "express"

import Product from "../models/Product.js"

const router = express.Router()

/* GET PRODUCTS */

router.get("/", async (req, res) => {

  try {

    const products = await Product.find()

    res.json(products)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

})

/* ADD PRODUCT */

router.post("/", async (req, res) => {

  try {

    const newProduct = new Product(req.body)

    const savedProduct = await newProduct.save()

    res.status(201).json(savedProduct)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

})

export default router