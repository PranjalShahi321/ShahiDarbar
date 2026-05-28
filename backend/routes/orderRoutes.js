import express from "express"

import Order from "../models/Order.js"

const router = express.Router()

/* CREATE ORDER */

router.post("/", async (req, res) => {

  try {

    const order = await Order.create(req.body)

    res.status(201).json(order)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

})

/* GET ORDERS */

router.get("/", async (req, res) => {

  try {

    const orders = await Order.find()

    res.json(orders)

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

})

export default router