import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"

function Products() {

  const { addToWishlist } = useWishlist()

  const {
    updateCart,
    setIsCartOpen,
  } = useCart()

  const [products, setProducts] = useState([])

  const [search, setSearch] = useState("")

  const [selectedCategory, setSelectedCategory] =
    useState("All")

  /* FETCH PRODUCTS */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        )
        console.log("API DATA:", data)

        setProducts(
          Array.isArray(data) ? data : []
        )
        console.log("Products Loaded")

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

  /* FILTERS */

  const filteredProducts = products.filter(
    (product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory

      return matchesSearch && matchesCategory

    }
  )

  /* CATEGORIES */

  const categories = [

    "All",

    ...new Set(
      products.map((product) => product.category)
    ),

  ]

  return (

    <div className="bg-gray-50 min-h-screen px-6 py-16">

      {/* HEADER */}

      <div className="text-center mb-14">

        <h1 className="text-5xl font-bold text-green-700 mb-5">
          Explore Products
        </h1>

        <p className="text-xl text-gray-600">
          Find premium grocery and wholesale products.
        </p>

      </div>

      {/* SEARCH */}

      <div className="max-w-2xl mx-auto mb-10">

        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-5 rounded-2xl border outline-none"
        />

      </div>

      {/* CATEGORY FILTER */}

      <div className="flex flex-wrap justify-center gap-4 mb-16">

        {categories.map((category) => (

          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`px-6 py-3 rounded-2xl font-semibold transition ${selectedCategory === category
                ? "bg-green-600 text-white"
                : "bg-white border"
              }`}
          >

            {category}

          </button>

        ))}

      </div>

      {/* PRODUCTS GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {filteredProducts.map((product) => (

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

                <h2 className="text-2xl font-bold">
                  {product.name}
                </h2>

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

    </div>

  )
}

export default Products