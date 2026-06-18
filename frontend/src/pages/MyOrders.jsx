import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/myorders`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-green-700">
          Loading Orders...
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-10">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl shadow text-center">
            <h2 className="text-2xl text-gray-500">
              No Orders Yet
            </h2>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => {
              const items =
                order.products ||
                order.orderItems ||
                [];

              const amount =
                order.totalAmount ||
                order.totalPrice ||
                0;

              const payment =
                order.paymentStatus ||
                (order.isPaid
                  ? "Paid"
                  : "Pending");

              const status =
                order.orderStatus ||
                "Processing";

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-3xl shadow-lg p-8"
                >
                  {/* TOP */}
                  <div className="flex flex-col md:flex-row md:justify-between gap-6">
                    <div>
                      <h2 className="font-bold text-lg">
                        Order ID
                      </h2>

                      <p className="text-gray-600 break-all">
                        {order._id}
                      </p>

                      <p className="mt-3 text-gray-500">
                        {new Date(
                          order.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-3xl font-bold text-green-700">
                        ₹{amount}
                      </p>

                      <div className="flex gap-3 mt-4 flex-wrap">
                        <span
                          className={`
                            px-4 py-2 rounded-full text-sm font-semibold
                            ${
                              payment === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {payment}
                        </span>

                        <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                          {status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PRODUCTS */}
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-xl font-bold mb-5">
                      Ordered Products
                    </h3>

                    <div className="space-y-4">
                      {items.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 rounded-2xl object-cover border"
                            />

                            <div>
                              <p className="font-bold text-lg">
                                {item.name}
                              </p>

                              <p className="text-gray-500">
                                Qty :
                                {" "}
                                {item.quantity}
                              </p>

                              <p className="font-semibold text-green-700">
                                ₹{item.price}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;