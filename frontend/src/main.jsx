import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Toaster } from "react-hot-toast"
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from "./context/WishlistContext"

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <CartProvider>
      <>
        <Toaster position="top-right" />
        <WishlistProvider>

          <CartProvider>

            <App />

          </CartProvider>

        </WishlistProvider>
      </>
    </CartProvider>

  </React.StrictMode>

)