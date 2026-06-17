import express from "express";

import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* CUSTOMER */

router.post("/", protect, createOrder);

router.get(
  "/my-orders",
  protect,
  getMyOrders
);

/* ADMIN */

router.get(
  "/",
  protect,
  admin,
  getOrders
);

router.put(
  "/:id",
  protect,
  admin,
  updateOrderStatus
);

export default router;