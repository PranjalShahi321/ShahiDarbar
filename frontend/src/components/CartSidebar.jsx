import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"

function CartSidebar() {

  const {

    isCartOpen,

    setIsCartOpen,

    cartItems,

    increaseQuantity,

    decreaseQuantity,

  } = useCart()

  /* TOTAL PRICE */

  const totalPrice = cartItems.reduce(

    (acc, item) =>

      acc + item.price * item.quantity,

    0

  )

  return (

    <>

      {/* OVERLAY */}

      {isCartOpen && (

        <div
          onClick={() =>
            setIsCartOpen(false)
          }
          className="
            fixed inset-0
            bg-black/40
            backdrop-blur-sm
            z-[90]
            transition-all duration-500
          "
        />

      )}

      {/* SIDEBAR */}

      <div
        className={`
          fixed top-0 right-0 h-full w-[380px]
          bg-white shadow-2xl z-[100]
          transition-transform duration-500 ease-in-out
          ${isCartOpen
            ? "translate-x-0"
            : "translate-x-full"}
        `}
      >

        {/* HEADER */}

        <div className="flex justify-between items-center p-6 border-b">

          <h2 className="text-3xl font-bold">

            Your Cart

          </h2>

          <button
            onClick={() =>
              setIsCartOpen(false)
            }
            className="
              text-4xl
              hover:text-red-500
              transition
            "
          >

            ×

          </button>

        </div>

        {/* ITEMS */}

        <div className="p-6 space-y-5 overflow-y-auto h-[70%]">

          {cartItems.length === 0 ? (

            <p className="text-gray-500 text-xl">

              Cart is empty

            </p>

          ) : (

            cartItems.map((item) => (

              <div
                key={item._id}
                className="
                  flex gap-4 border-b pb-4
                  hover:bg-gray-50
                  p-2 rounded-xl
                  transition
                "
              >

                {/* IMAGE */}

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-20 h-20
                    object-cover
                    rounded-xl
                  "
                />

                {/* DETAILS */}

                <div className="flex-1">

                  <h3 className="font-bold text-lg">

                    {item.name}

                  </h3>

                  <p className="text-green-700 font-bold mt-1">

                    ₹{item.price}

                  </p>

                  {/* QUANTITY CONTROLS */}

                  <div className="flex items-center gap-3 mt-3">

                    {/* DECREASE */}

                    <button
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                      className="
                        w-8 h-8
                        rounded-full
                        bg-gray-200
                        hover:bg-gray-300
                        font-bold
                        transition
                      "
                    >

                      -

                    </button>

                    {/* QUANTITY */}

                    <span className="font-bold text-lg">

                      {item.quantity}

                    </span>

                    {/* INCREASE */}

                    <button
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                      className="
                        w-8 h-8
                        rounded-full
                        bg-green-600
                        text-white
                        hover:bg-green-700
                        font-bold
                        transition
                      "
                    >

                      +

                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

        {/* FOOTER */}

        <div
          className="
            absolute bottom-0 left-0
            w-full p-6 border-t bg-white
          "
        >

          <div
            className="
              flex justify-between
              text-2xl font-bold mb-6
            "
          >

            <span>Total:</span>

            <span className="text-green-700">

              ₹{totalPrice}

            </span>

          </div>

          <Link
            to="/checkout"
            onClick={() =>
              setIsCartOpen(false)
            }
            className="
              block text-center
              bg-green-600 text-white
              py-4 rounded-2xl
              text-xl font-bold
              hover:bg-green-700
              transition
            "
          >

            Checkout

          </Link>

        </div>

      </div>

    </>

  )
}

export default CartSidebar