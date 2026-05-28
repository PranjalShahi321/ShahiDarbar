import dotenv from "dotenv"
dotenv.config()


import express from "express"
import cors from "cors"


import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

connectDB()

const app = express()

app.use(
  cors({
    origin: "https://shahi-darbar-six.vercel.app/",
    credentials: true,
  })
)
app.use(express.json())

app.use("/api/products", productRoutes)

app.use("/api/auth", authRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/payment", paymentRoutes)


app.get("/", (req, res) => {
  res.send("ShahiDarbar API Running")
})

const PORT =
  process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})