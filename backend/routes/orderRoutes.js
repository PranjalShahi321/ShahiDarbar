import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import {
  protect,
  admin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/myorders", protect, getMyOrders);

router.get(
  "/admin",
  protect,
  admin,
  getAllOrders
);

router.put(
  "/admin/:id",
  protect,
  admin,
  updateOrderStatus
);

export default router;