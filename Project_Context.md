# Shahi Darbar - Project Context (Version 2.0)

## Project Overview

Shahi Darbar is a MERN-based local grocery + wholesale e-commerce application intended to become a real business application, not just a college project.

---

# Tech Stack

## Frontend

* React + Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Razorpay
* Cloudinary
* JWT Authentication

## Deployment

* Frontend: Vercel
* Backend: Render

## Live Website

https://shahi-darbar-one.vercel.app

---

# Working Features

## Authentication

* Register
* Login
* Admin Login
* JWT Authentication
* Protected Routes

## Shopping

* Products Page
* Product Details Page
* Search
* Keyboard Navigation in Search
* Cart
* Wishlist

## Checkout

* Login Protection
* Empty Cart Protection
* Delivery Details Form
* Auto-filled Customer Name
* Saved Delivery Address
* Phone Validation
* Order Summary
* Delivery Charges Logic
* Free Delivery Threshold Message
* Processing State
* Payment Button Shows Amount
* Razorpay Modal Dismiss Handling

## Admin

* Add Product
* Update Product
* Delete Product
* Search Products
* Filter Products

---

# Current Backend Structure

backend/
├── config/
├── controllers/
│   └── orderController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── orderRoutes.js
│   ├── paymentRoutes.js
│   ├── productRoutes.js
│   └── uploadRoutes.js
└── server.js

---

# User Schema

```js
{
  name,
  email,
  password,
  isAdmin
}
```

---

# Order Schema

```js
{
  user,
  customerName,
  phone,
  address,

  products: [
    {
      product,
      name,
      price,
      quantity,
      image
    }
  ],

  subtotal,
  deliveryCharge,
  totalAmount,

  paymentId,
  razorpayOrderId,
  razorpayPaymentId,

  paymentStatus,
  orderStatus,

  createdAt,
  updatedAt
}
```

---

# Order Status Flow

Pending
↓
Preparing
↓
Out for Delivery
↓
Delivered

OR

Pending
↓
Cancelled

---

# Order APIs Created

POST /api/orders
GET /api/orders/my-orders
GET /api/orders
PUT /api/orders/:id

---

# Authentication Middleware

protect middleware working.
admin middleware added.

```js
export {
  protect,
  admin
}
```

---

# Payment System Status

## Razorpay Status

SUCCESSFULLY WORKING IN LIVE MODE.

A real payment of ₹32 was made.

Transaction Status:
Captured ✅

Settlement:
₹31.24

Settlement Date:
19 June

Reason for deduction:
Razorpay gateway charges + GST.

Money will be transferred to the linked bank account on settlement date.

---

# Razorpay Configuration

Backend:
paymentRoutes.js

```js
router.post("/create-order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
    receipt: "receipt_order",
  };

  const order =
    await razorpay.orders.create(options);

  res.json(order);
});
```

Environment Variables:

Backend:

```env
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

Frontend:

```env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxx
```

---

# Checkout.jsx Status

Current flow:

Customer
↓
Cart
↓
Checkout
↓
Pay Now
↓
Razorpay Popup
↓
Payment Successful
↓
Alert
↓
Home Page

---

# NEXT TASK (Highest Priority)

After payment success:

Payment Success
↓
POST /api/orders
↓
Save Order in MongoDB
↓
Clear Cart
↓
Redirect Home

Need to modify Razorpay handler:

```js
handler: async function (response) {
  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/orders`,
    {
      customerName,
      phone,
      address,
      products,
      subtotal,
      deliveryCharge,
      totalAmount,
      paymentStatus: "Paid",
      razorpayOrderId:
        response.razorpay_order_id,
      razorpayPaymentId:
        response.razorpay_payment_id,
    },
    {
      headers: {
        Authorization:
          `Bearer ${userInfo.token}`,
      },
    }
  );
}
```

This is the immediate next implementation.

---

# Version 2.0 Roadmap

## Phase 1

Payment Success
↓
Save Order in MongoDB
↓
Admin Receives Order

## Phase 2

Admin Orders Dashboard

Columns:

* Customer Name
* Phone
* Address
* Products
* Amount
* Payment Status
* Order Status
* Order Time

## Phase 3

Order Status Tracking

Pending
↓
Preparing
↓
Out for Delivery
↓
Delivered
↓
Cancelled

## Phase 4

Customer Side

My Orders Page
Order Tracking Timeline

---

# Final Desired Flow

Customer Login
↓
Add to Cart
↓
Checkout
↓
Real Payment (LIVE)
↓
Save Order in MongoDB
↓
Admin Dashboard Receives Order
↓
Admin Updates Status
↓
Customer My Orders
↓
Customer Order Tracking

---

# Development Rules

* Give code changes step-by-step.
* Avoid breaking existing features.
* Prefer incremental updates.
* Treat Shahi Darbar as a real local grocery business application.
* Continue directly from "Save Order in MongoDB after successful Razorpay payment".
