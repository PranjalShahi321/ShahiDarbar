import { useNavigate }
from "react-router-dom";

function RecentOrders({
  orders,
}) {
  const navigate =
    useNavigate();

  const recent =
    orders.slice(0, 5);

  return (
    <div className="
      bg-white
      rounded-3xl
      shadow
      p-8
    ">
      <div className="
        flex
        justify-between
        mb-8
      ">
        <h2 className="
          text-3xl
          font-bold
        ">
          Recent Orders
        </h2>

        <button
          onClick={() =>
            navigate(
              "/admin/orders"
            )
          }
          className="
            text-green-600
            font-bold
          "
        >
          View All →
        </button>
      </div>

      <div className="
        space-y-5
      ">
        {recent.map(
          (order) => (
            <div
              key={order._id}
              className="
                flex
                justify-between
                border-b
                pb-4
              "
            >
              <div>
                <h3 className="
                  font-bold
                ">
                  {
                    order.customerName
                  }
                </h3>

                <p className="
                  text-gray-500
                ">
                  ₹
                  {
                    order.totalAmount
                  }
                </p>
              </div>

              <div>

                <span
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-yellow-100
                    text-yellow-700
                  "
                >
                  {
                    order.orderStatus
                  }
                </span>

              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default RecentOrders;