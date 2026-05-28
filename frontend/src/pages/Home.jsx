import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"

function Home() {

  const { addToWishlist } = useWishlist()

  const {
    updateCart,
    setIsCartOpen,
  } = useCart()

  const [products, setProducts] = useState([])

  /* FETCH PRODUCTS */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        )

        setProducts(
          Array.isArray(data) ? data : []
        )

      } catch (error) {

        console.log(error)

        setProducts([])

      }

    }

    fetchProducts()

  }, [])

  /* ADD TO CART */

  const addToCart = (e, product) => {

    e.stopPropagation()

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
            quantity: item.quantity + 1,
          }

          : item

      )

    } else {

      updatedCart = [

        ...cartItems,

        {
          ...product,
          quantity: 1,
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

  return (

    <div className="bg-gray-50 min-h-screen">

      {/* HERO SECTION */}

      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* LEFT */}

          <div>

            <p className="uppercase tracking-[4px] text-green-200 font-semibold mb-5">
              Grocery & Wholesale Marketplace
            </p>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">

              Fresh Products <br />

              At Best Prices

            </h1>

            <p className="text-lg md:text-xl text-green-100 leading-8 mb-10 max-w-xl">

              Buy grocery items, grains, spices,
              beverages, oils, and wholesale products
              with premium quality and affordable prices.

            </p>

            <div className="flex flex-wrap gap-5">

              <Link
                to="/products"
                className="bg-white text-green-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100"
              >
                Shop Now
              </Link>

              <Link
                to="/cart"
                className="border-2 border-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-green-700"
              >
                View Cart
              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e"
              alt="Groceries"
              className="rounded-3xl shadow-2xl w-full max-w-xl h-[500px] object-cover"
            />

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

            <div className="text-5xl mb-6">
              🚚
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Fast Delivery
            </h2>

            <p className="text-gray-600 leading-7">
              Super fast and reliable delivery
              at your doorstep.
            </p>

          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

            <div className="text-5xl mb-6">
              🥬
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Fresh Products
            </h2>

            <p className="text-gray-600 leading-7">
              Premium quality grocery products
              sourced directly from trusted suppliers.
            </p>

          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

            <div className="text-5xl mb-6">
              💰
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Wholesale Prices
            </h2>

            <p className="text-gray-600 leading-7">
              Best pricing for retail and wholesale
              customers with exciting offers.
            </p>

          </div>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex justify-between items-center mb-14">

          <h2 className="text-5xl font-bold text-green-700">
            Featured Products
          </h2>

          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
          >
            View All
          </Link>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {products.slice(0, 8).map((product) => (

            <div
              key={product._id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >

              {/* IMAGE */}

              <Link to={`/product/${product._id}`}>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />

              </Link>

              {/* CONTENT */}

              <div className="p-6">

                <div className="flex justify-end mb-3">

                  <button
                    onClick={() =>
                      addToWishlist(product)
                    }
                    className="
    text-3xl
    hover:scale-125
    transition
  "
                  >

                    ❤️

                  </button>

                </div>

                <div className="flex justify-between items-center mb-4">

                  <h3 className="text-2xl font-bold">
                    {product.name}
                  </h3>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </span>

                </div>

                <p className="text-gray-600 mb-5 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">

                  <p className="text-2xl font-bold text-green-700">
                    ₹{product.price}
                  </p>

                  <button
                    onClick={(e) =>
                      addToCart(e, product)
                    }
                    className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700"
                  >
                    Add To Cart
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="bg-green-700 text-white mt-24">

        <div className="max-w-6xl mx-auto px-6 py-24 text-center">

          <h2 className="text-5xl font-bold mb-8">

            Ready To Start Shopping?

          </h2>

          <p className="text-xl text-green-100 mb-10">

            Explore thousands of grocery and wholesale products.

          </p>

          <Link
            to="/products"
            className="bg-white text-green-700 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-gray-100"
          >
            Explore Products
          </Link>

        </div>

      </section>

    </div>

  )
}

export default Home