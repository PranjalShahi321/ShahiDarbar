import Order from "../models/Order.js";

/* CREATE ORDER */

export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      products,
      subtotal,
      deliveryCharge,
      totalAmount,
      paymentStatus,
      paymentId,
      razorpayOrderId,
      razorpayPaymentId,
    } = req.body;

    const order = await Order.create({
      user: req.user._id,
      customerName,
      phone,
      address,
      products,
      subtotal,
      deliveryCharge,
      totalAmount,
      paymentStatus,
      paymentId,
      razorpayOrderId,
      razorpayPaymentId,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to create order",
    });
  }
};

/* CUSTOMER ORDERS */

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch orders",
    });
  }
};

/* ADMIN ALL ORDERS */

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch orders",
    });
  }
};

/* UPDATE ORDER STATUS */

export const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus =
      req.body.orderStatus;

    await order.save();

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to update order",
    });
  }
};