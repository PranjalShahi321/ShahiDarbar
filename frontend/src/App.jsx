import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import CartSidebar from "./components/CartSidebar"
import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Admin from "./pages/Admin"
import Checkout from "./pages/Checkout"
import ProductDetails from "./pages/ProductDetails"
import ProtectedRoute from "./components/ProtectedRoute"
import Wishlist from "./pages/Wishlist"
import { Toaster } from "react-hot-toast";

function App() {

  return (

    <BrowserRouter>

      <Navbar />
      <CartSidebar />
      <Toaster position="top-right" />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>

  )

}

export default App