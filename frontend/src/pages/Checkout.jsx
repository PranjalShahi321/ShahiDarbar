import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Checkout() {

  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState([])
  const [customerName, setCustomerName] =
    useState("")

  const [phone, setPhone] =
    useState("")

  const [address, setAddress] =
    useState("")

  const [landmark, setLandmark] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  /* LOAD CART */

  /* LOAD CART */

  useEffect(() => {

    const items =
      JSON.parse(
        localStorage.getItem("cartItems")
      ) || []

    setCartItems(items)

    const userInfo =
      JSON.parse(
        localStorage.getItem("userInfo")
      )

    if (userInfo) {
      setCustomerName(
        userInfo.name
      )
    }
    const deliveryInfo =
      JSON.parse(
        localStorage.getItem(
          "deliveryInfo"
        )
      )

    if (deliveryInfo) {

      setPhone(
        deliveryInfo.phone || ""
      )

      setAddress(
        deliveryInfo.address || ""
      )

      setLandmark(
        deliveryInfo.landmark || ""
      )

    }

    if (items.length === 0) {

      alert("Your cart is empty.")

      navigate("/cart")

    }

  }, [navigate])



  /* TOTAL PRICE */

  const totalPrice = cartItems.reduce(

    (acc, item) =>

      acc + item.price * item.quantity,

    0

  )
  const deliveryCharge =
    totalPrice >= 500
      ? 0
      : 30

  const finalAmount =
    totalPrice +
    deliveryCharge

  /* PAYMENT */

  const handlePayment = async () => {

    if (
      !customerName.trim() ||
      !phone.trim() ||
      !address.trim()
    ) {
      alert(
        "Please fill all delivery details."
      )
      return
    }

    if (!/^\d{10}$/.test(phone)) {
      alert(
        "Please enter a valid mobile number."
      )
      return
    }
    localStorage.setItem(
      "deliveryInfo",

      JSON.stringify({

        phone,

        address,

        landmark,

      })
    )
    const userInfo = JSON.parse(
      localStorage.getItem("userInfo")
    );
    
    const token = userInfo?.token;
    setLoading(true)

    try {

      const { data } = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,

        {
          amount: finalAmount,
        }

      )

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,

        currency: data.currency,

        name: "ShahiDarbar",

        description: "Order Payment",

        order_id: data.id,

        handler: async function (response) {
          try {
            await axios.post(
              `${import.meta.env.VITE_API_URL}/api/orders`,
              {
                customerName,
                phone,
                address:
                  address +
                  (landmark
                    ? `, Landmark: ${landmark}`
                    : ""),
        
                products: cartItems.map(
                  (item) => ({
                    product: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                  })
                ),
        
                subtotal: totalPrice,
                deliveryCharge,
                totalAmount: finalAmount,
        
                paymentStatus: "Paid",
        
                razorpayOrderId:
                  response.razorpay_order_id,
        
                razorpayPaymentId:
                  response.razorpay_payment_id,
              },
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );
        
            setLoading(false);
        
            alert(
              "Payment Successful"
            );
        
            localStorage.removeItem(
              "cartItems"
            );
        
            window.location.href = "/";
          } catch (error) {
            console.log(error);
        
            setLoading(false);
        
            alert(
              "Payment successful but order could not be saved."
            );
          }
        },

        modal: {

          ondismiss:
            function () {

              setLoading(false)

            }

        },

        theme: {

          color: "#16a34a",

        },

      }

      const razor = new window.Razorpay(options)

      razor.open()

    } catch (error) {

      setLoading(false)

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
        {
          customerName && (
            <p className="
      text-center
      text-gray-600
      text-lg
      mb-8
    ">
              Hi, {customerName} 👋
            </p>
          )
        }

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

        <div className="bg-gray-50 p-6 rounded-2xl mb-10">

          <h2 className="text-3xl font-bold mb-6">

            Delivery Details

          </h2>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              className="
        w-full
        border
        px-5
        py-4
        rounded-xl
        outline-none
      "
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="
        w-full
        border
        px-5
        py-4
        rounded-xl
        outline-none
      "
            />

            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              rows="3"
              className="
        w-full
        border
        px-5
        py-4
        rounded-xl
        outline-none
      "
            />

            <input
              type="text"
              placeholder="Landmark (Optional)"
              value={landmark}
              onChange={(e) =>
                setLandmark(e.target.value)
              }
              className="
        w-full
        border
        px-5
        py-4
        rounded-xl
        outline-none
      "
            />

          </div>

        </div>
        <div className="bg-gray-50 p-6 rounded-2xl mb-10">

          <h2 className="text-3xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cartItems.map((item) => (

              <div
                key={item._id}
                className="
          flex
          justify-between
          border-b
          pb-3
        "
              >

                <span>
                  {item.name}
                  {" "}
                  ×
                  {" "}
                  {item.quantity}
                </span>

                <span>
                  ₹
                  {item.price *
                    item.quantity}
                </span>

              </div>

            ))}

            <div
              className="
        flex
        justify-between
        font-semibold
      "
            >
              <span>
                Delivery Charges
              </span>

              <span>

                {
                  deliveryCharge === 0
                    ? "FREE"
                    : `₹${deliveryCharge}`
                }

              </span>
            </div>

          </div>

        </div>
        {/* TOTAL */}

        <div className="flex justify-between items-center mb-10">

          <h2 className="text-4xl font-bold">

            Total:

          </h2>

          <h2 className="text-4xl font-bold text-green-700">

            ₹{finalAmount}

          </h2>

        </div>

        {
          deliveryCharge > 0 && (

            <p
              className="
        text-center
        text-gray-600
        mb-5
      "
            >

              Add ₹
              {500 - totalPrice}
              more items to get
              FREE delivery 🚚

            </p>

          )
        }

        {/* BUTTON */}

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-green-600 text-white py-5 rounded-2xl text-2xl font-bold hover:bg-green-700"
        >

          Pay Now

        </button>

      </div>

    </div>

  )
}

export default Checkout