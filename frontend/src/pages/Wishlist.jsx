import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"

function Wishlist() {

  const {

    wishlistItems,

    removeFromWishlist,

  } = useWishlist()

  const {

    updateCart,

    setIsCartOpen,

  } = useCart()

  /* MOVE TO CART */

  const moveToCart = (product) => {

    const cartItems =
      JSON.parse(
        localStorage.getItem("cartItems")
      ) || []

    const exists = cartItems.find(
      (item) => item._id === product._id
    )

    let updatedCart

    if (exists) {

      updatedCart = cartItems.map((item) =>

        item._id === product._id

          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }

          : item

      )

    }

    else {

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

    removeFromWishlist(product._id)

  }

  return (

    <div className="bg-gray-50 min-h-screen px-6 py-16">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-red-500 mb-14">

          Your Wishlist ❤️

        </h1>

        {wishlistItems.length === 0 ? (

          <div
            className="
              bg-white p-16 rounded-3xl
              shadow-lg text-center
            "
          >

            <h2
              className="
                text-4xl font-bold
                text-gray-500
              "
            >

              Wishlist Is Empty

            </h2>

          </div>

        ) : (

          <div
            className="
              grid grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-10
            "
          >

            {wishlistItems.map((product) => (

              <div
                key={product._id}
                className="
                  bg-white rounded-3xl
                  overflow-hidden shadow-lg
                  hover:scale-105
                  transition duration-300
                "
              >

                {/* IMAGE */}

                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    w-full h-64
                    object-cover
                  "
                />

                {/* CONTENT */}

                <div className="p-6">

                  <div
                    className="
                      flex justify-between
                      items-center mb-4
                    "
                  >

                    <h2
                      className="
                        text-2xl font-bold
                      "
                    >

                      {product.name}

                    </h2>

                    <button
                      onClick={() =>
                        removeFromWishlist(
                          product._id
                        )
                      }
                      className="
                        text-3xl
                        hover:scale-125
                        transition
                      "
                    >

                      ❌

                    </button>

                  </div>

                  <p
                    className="
                      text-green-700
                      text-2xl font-bold
                      mb-6
                    "
                  >

                    ₹{product.price}

                  </p>

                  <button
                    onClick={() =>
                      moveToCart(product)
                    }
                    className="
                      w-full bg-green-600
                      text-white py-4
                      rounded-2xl
                      text-xl font-bold
                      hover:bg-green-700
                      transition
                    "
                  >

                    Move To Cart

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  )
}

export default Wishlist