import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/orders/admin`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      console.log("Orders Response:", data);

      if (Array.isArray(data)) {
        setOrders(data);
      } else if (Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log(error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/admin/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? {
                ...order,
                orderStatus: status,
              }
            : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-green-700">
          Loading Orders...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Orders Management
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl shadow text-center">
          <h2 className="text-2xl text-gray-500">
            No Orders Found
          </h2>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const items =
              order.products ||
              order.orderItems ||
              [];

            const amount =
              order.totalAmount ||
              order.totalPrice ||
              0;

            const customerName =
              order.customerName ||
              order.shippingAddress?.fullName ||
              order.user?.name ||
              "Customer";

            const phone =
              order.phone ||
              order.shippingAddress?.phone ||
              "N/A";

            const address =
              order.address ||
              order.shippingAddress?.address ||
              "N/A";

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
                className="
                  bg-white
                  rounded-3xl
                  shadow-lg
                  p-6
                "
              >
                <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {customerName}
                    </h2>

                    {order.user?.email && (
                      <p className="text-gray-600 mt-1">
                        {order.user.email}
                      </p>
                    )}

                    <p className="mt-2">
                      📞 {phone}
                    </p>

                    <p className="mt-1 text-gray-600">
                      📍 {address}
                    </p>

                    <p className="mt-4 text-2xl font-bold text-green-700">
                      ₹{amount}
                    </p>

                    <div className="flex gap-3 mt-4 flex-wrap">
                      <span
                        className={`
                          px-3 py-1 rounded-full text-sm font-semibold
                          ${
                            payment === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {payment}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                        {status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <select
                      value={status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="
                        border
                        rounded-xl
                        p-3
                        outline-none
                      "
                    >
                      <option value="Processing">
                        Processing
                      </option>
                      <option value="Packed">
                        Packed
                      </option>
                      <option value="Shipped">
                        Shipped
                      </option>
                      <option value="Delivered">
                        Delivered
                      </option>
                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </div>
                </div>

                {items.length > 0 && (
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-xl font-bold mb-5">
                      Ordered Products
                    </h3>

                    <div className="space-y-4">
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-4 items-center"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="
                              w-20
                              h-20
                              rounded-xl
                              object-cover
                              border
                            "
                          />

                          <div>
                            <p className="font-bold">
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
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;