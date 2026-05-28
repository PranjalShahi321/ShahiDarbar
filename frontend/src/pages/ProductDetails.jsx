import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"

function ProductDetails() {

  const { addToWishlist } = useWishlist()

  const {
    updateCart,
    setIsCartOpen,
  } = useCart()

  const { id } = useParams()

  const [product, setProduct] = useState(null)

  const [quantity, setQuantity] = useState(1)

  /* FETCH PRODUCT */

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        )

        setProduct(data)

      } catch (error) {

        console.log(error)

      }

    }

    fetchProduct()

  }, [id])

  /* ADD TO CART */

  const addToCart = () => {

    const cartItems =
      JSON.parse(localStorage.getItem("cartItems")) || []

    const productExists = cartItems.find(
      (item) => item._id === product._id
    )

    let updatedCart

    if (productExists) {

      updatedCart = cartItems.map((item) =>

        item._id === product._id

          ? {
            ...item,
            quantity:
              item.quantity + quantity,
          }

          : item

      )

    } else {

      updatedCart = [

        ...cartItems,

        {
          ...product,
          quantity,
        },

      ]

    }

    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    )
    updateCart()

    setIsCartOpen(true)

    toast.success("Added To Cart")

  }

  /* LOADING */

  if (!product) {

    return (

      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">

        Loading...

      </div>

    )

  }

  return (

    <div className="bg-gray-50 min-h-screen px-6 py-16">

      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg p-10 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* IMAGE */}

        <div>

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-3xl"
          />

        </div>

        {/* CONTENT */}

        <div className="flex flex-col justify-center">

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full w-fit font-semibold mb-5">

            {product.category}

          </span>

          <div className="flex justify-between items-center mb-6">

            <h1 className="text-5xl font-bold">

              {product.name}

            </h1>

            <button
              onClick={() =>
                addToWishlist(product)
              }
              className="
      text-5xl
      hover:scale-125
      transition
    "
            >

              ❤️

            </button>

          </div>

          <p className="text-gray-600 text-lg leading-8 mb-8">

            {product.description}

          </p>

          <h2 className="text-4xl font-bold text-green-700 mb-8">

            ₹{product.price}

          </h2>

          {/* QUANTITY */}

          <div className="flex items-center gap-5 mb-10">

            <p className="text-xl font-semibold">
              Quantity:
            </p>

            <select
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Number(e.target.value)
                )
              }
              className="border px-4 py-3 rounded-xl"
            >

              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (

                <option key={qty} value={qty}>
                  {qty}
                </option>

              ))}

            </select>

          </div>

          {/* BUTTON */}

          <button
            onClick={addToCart}
            className="bg-green-600 text-white py-5 rounded-2xl text-2xl font-bold hover:bg-green-700"
          >

            Add To Cart

          </button>

        </div>

      </div>

    </div>

  )
}

export default ProductDetails