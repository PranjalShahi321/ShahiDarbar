import express from "express"

import Product from "../models/Product.js"

const router = express.Router()

/* GET ALL PRODUCTS */

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

/* GET SINGLE PRODUCT */

router.get("/:id", async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    )

    res.json(product)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

})

/* CREATE PRODUCT */

router.post("/", async (req, res) => {

  try {

    const product = await Product.create(req.body)

    res.status(201).json(product)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

})

/* UPDATE PRODUCT */

router.put("/:id", async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    )

    if (product) {

      product.name =
        req.body.name || product.name

      product.price =
        req.body.price || product.price

      product.description =
        req.body.description ||
        product.description

      product.category =
        req.body.category ||
        product.category

      product.image =
        req.body.image || product.image

      const updatedProduct =
        await product.save()

      res.json(updatedProduct)

    } else {

      res.status(404).json({
        message: "Product not found",
      })

    }

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

})

/* DELETE PRODUCT */

router.delete("/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    )

    res.json({
      message: "Product Deleted",
    })

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

})

export default router