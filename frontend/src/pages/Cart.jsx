import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Cart() {

  const { cartItems, removeFromCart } =
    useContext(CartContext)

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  )

  return (

    <div className="min-h-screen bg-green-50 px-10 py-20">

      <h1 className="text-5xl font-bold text-green-700 mb-12">
        Your Cart
      </h1>

      {

        cartItems.length === 0 ? (

          <p className="text-2xl text-gray-600">
            Cart is empty
          </p>

        ) : (

          <div className="space-y-6">

            {cartItems.map((item, index) => (

              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-green-700 text-xl mt-2">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

            {/* Total Section */}

            <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">

              <h2 className="text-3xl font-bold text-gray-800">
                Total: ₹{totalPrice}
              </h2>

              <button className="mt-6 bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700">
                Proceed To Checkout
              </button>

            </div>

          </div>

        )

      }

    </div>

  )
}

export default Cart