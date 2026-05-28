import { useNavigate } from "react-router-dom"

import { useCart } from "../context/CartContext"

function Cart() {

  const navigate = useNavigate()

  const {

    cartItems,

    increaseQuantity,

    decreaseQuantity,

  } = useCart()

  /* TOTAL */

  const totalPrice = cartItems.reduce(

    (acc, item) =>

      acc + item.price * item.quantity,

    0

  )

  return (

    <div className="bg-gray-50 min-h-screen px-6 py-16">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-green-700 mb-14">

          Shopping Cart

        </h1>

        {cartItems.length === 0 ? (

          <div
            className="
              bg-white p-16
              rounded-3xl shadow-lg
              text-center
            "
          >

            <h2
              className="
                text-4xl font-bold
                text-gray-500 mb-6
              "
            >

              Cart Is Empty

            </h2>

            <button
              onClick={() =>
                navigate("/products")
              }
              className="
                bg-green-600 text-white
                px-8 py-4 rounded-2xl
                text-xl hover:bg-green-700
              "
            >

              Continue Shopping

            </button>

          </div>

        ) : (

          <div
            className="
              grid grid-cols-1
              lg:grid-cols-3 gap-10
            "
          >

            {/* ITEMS */}

            <div className="lg:col-span-2 space-y-6">

              {cartItems.map((item) => (

                <div
                  key={item._id}
                  className="
                    bg-white p-6
                    rounded-3xl shadow-lg
                    flex flex-col md:flex-row
                    gap-6 items-center
                  "
                >

                  {/* IMAGE */}

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-40 h-40
                      object-cover
                      rounded-2xl
                    "
                  />

                  {/* DETAILS */}

                  <div className="flex-1">

                    <h2
                      className="
                        text-3xl font-bold mb-4
                      "
                    >

                      {item.name}

                    </h2>

                    <p
                      className="
                        text-2xl font-bold
                        text-green-700 mb-4
                      "
                    >

                      ₹{item.price}

                    </p>

                    {/* QUANTITY */}

                    <div
                      className="
                        flex items-center gap-4
                      "
                    >

                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item._id
                          )
                        }
                        className="
                          w-10 h-10
                          rounded-full
                          bg-gray-200
                          hover:bg-gray-300
                          text-xl font-bold
                        "
                      >

                        -

                      </button>

                      <span
                        className="
                          text-2xl font-bold
                        "
                      >

                        {item.quantity}

                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item._id
                          )
                        }
                        className="
                          w-10 h-10
                          rounded-full
                          bg-green-600
                          text-white
                          hover:bg-green-700
                          text-xl font-bold
                        "
                      >

                        +

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* SUMMARY */}

            <div
              className="
                bg-white p-8
                rounded-3xl shadow-lg
                h-fit
              "
            >

              <h2
                className="
                  text-3xl font-bold mb-8
                "
              >

                Order Summary

              </h2>

              <div
                className="
                  flex justify-between
                  items-center
                  text-2xl font-bold
                  mb-10
                "
              >

                <span>Total:</span>

                <span className="text-green-700">

                  ₹{totalPrice}

                </span>

              </div>

              <button
                onClick={() =>
                  navigate("/checkout")
                }
                className="
                  w-full bg-green-600
                  text-white py-5
                  rounded-2xl text-xl
                  font-bold hover:bg-green-700
                "
              >

                Proceed To Checkout

              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  )
}

export default Cart