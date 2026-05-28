import { useEffect, useState } from "react"
import axios from "axios"

function Checkout() {

  const [cartItems, setCartItems] = useState([])

  /* LOAD CART */

  useEffect(() => {

    const items =
      JSON.parse(localStorage.getItem("cartItems")) || []

    setCartItems(items)

  }, [])

  /* TOTAL PRICE */

  const totalPrice = cartItems.reduce(

    (acc, item) =>

      acc + item.price * item.quantity,

    0

  )

  /* PAYMENT */

  const handlePayment = async () => {

    try {

      const { data } = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,

        {
          amount: totalPrice,
        }

      )

      const options = {

        key: "rzp_test_SubpnZ1HTrl2o4",

        amount: data.amount,

        currency: data.currency,

        name: "ShahiDarbar",

        description: "Order Payment",

        order_id: data.id,

        handler: async function () {

          alert("Payment Successful")

          localStorage.removeItem("cartItems")

          window.location.href = "/"

        },

        theme: {

          color: "#16a34a",

        },

      }

      const razor = new window.Razorpay(options)

      razor.open()

    } catch (error) {

      console.log(error)

      alert("Payment Failed")

    }

  }

  return (

    <div className="bg-gray-50 min-h-screen px-6 py-16">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        <h1 className="text-5xl font-bold text-green-700 mb-12 text-center">

          Checkout

        </h1>

        {/* ITEMS */}

        <div className="space-y-6 mb-12">

          {cartItems.map((item) => (

            <div
              key={item._id}
              className="flex flex-col md:flex-row justify-between items-center border-b pb-6 gap-6"
            >

              <div className="flex items-center gap-5">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                <div>

                  <h2 className="text-2xl font-bold">

                    {item.name}

                  </h2>

                  <p className="text-gray-600">

                    Quantity: {item.quantity}

                  </p>

                </div>

              </div>

              <h2 className="text-2xl font-bold text-green-700">

                ₹{item.price * item.quantity}

              </h2>

            </div>

          ))}

        </div>

        {/* TOTAL */}

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-4xl font-bold">

            Total:

          </h2>

          <h2 className="text-4xl font-bold text-green-700">

            ₹{totalPrice}

          </h2>

        </div>

        {/* BUTTON */}

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white py-5 rounded-2xl text-2xl font-bold hover:bg-green-700"
        >

          Pay Now

        </button>

      </div>

    </div>

  )
}

export default Checkout